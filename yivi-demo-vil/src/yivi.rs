use std::time::Duration;

use askama::Template;
use axum::{
    extract::{Form, Json, Path, State},
    http::status::StatusCode,
    response::{Html, IntoResponse, Response},
};
use irma::{
    AttributeRequest, CredentialBuilder, DisclosureRequestBuilder, ExtendedIrmaRequest,
    IrmaRequest, IssuanceRequestBuilder, NextSessionData, SessionData, SessionResult,
    SessionStatus, SessionToken,
};
use serde::{Deserialize, Serialize};
use serde_json::json;

use crate::{config::AppConfig, error::AppError, model::Person, rule::rule_name, state::AppState};

pub async fn yivi_disclose_start(
    Path(rule_id): Path<String>,
    State(AppState {
        config,
        yivi_client,
    }): State<AppState>,
) -> Result<Json<SessionData>, AppError> {
    let disclosure_request = DisclosureRequestBuilder::new()
        .add_discon(vec![vec![
            AttributeRequest::Simple("irma-demo.discipl.demoVIL.woonplaats".to_owned()), // make this variable for the chosen rule
            AttributeRequest::Simple("irma-demo.discipl.demoVIL.geboortedatum".to_owned()),
            // AttributeRequest::Simple("irma-demo.discipl.demoVIL.aowLeeftijdBehaald".to_owned()), // unused for now
            AttributeRequest::Simple("irma-demo.discipl.demoVIL.ouderDan21".to_owned()),
            AttributeRequest::Simple("irma-demo.discipl.demoVIL.alleenstaande".to_owned()),
            AttributeRequest::Simple("irma-demo.discipl.demoVIL.thuiswonendeKinderen".to_owned()),
            AttributeRequest::Simple("irma-demo.discipl.demoVIL.inkomenPerMaand".to_owned()),
            AttributeRequest::Simple("irma-demo.discipl.demoVIL.vermogen".to_owned()),
        ]])
        .build();

    let chained_request = ExtendedIrmaRequest {
        validity: None,
        timeout: None,
        callback_url: None,
        request: disclosure_request,
        next_session: Some(NextSessionData {
            url: config
                .hostname
                .join(&format!("{rule_id}/issue"))?
                .to_string(),
        }),
    };

    Ok(Json(yivi_client.request_extended(&chained_request).await?))
}

pub enum ChainedResponse {
    AllowanceVoucher(IrmaRequest),
    NoRightToAllowance,
}

impl IntoResponse for ChainedResponse {
    fn into_response(self) -> Response {
        match self {
            Self::AllowanceVoucher(r) => Json(r).into_response(),
            Self::NoRightToAllowance => StatusCode::NO_CONTENT.into_response(),
        }
    }
}

static BASE_URL: &str = "https://vil-regels.nl:8443";

#[derive(Serialize, Deserialize, Clone, Copy)]
pub struct ResidentApplication {
    pub value: usize,
}

#[derive(Serialize, Deserialize, Clone, Copy)]
#[serde(rename_all = "camelCase")]
pub struct RuleEvaluationResponse {
    pub resident_application: ResidentApplication,
}

async fn get_application(
    person: &Person,
    config: &AppConfig,
) -> Result<RuleEvaluationResponse, AppError> {
    Ok(reqwest::Client::new()
            .post(&format!(
                "{BASE_URL}/engine-rest/decision-definition/key/Decision_18qw2e6/evaluate" // tie this to the rule_id
            ))
            .basic_auth(&config.vil_api_username, Some(&config.vil_api_password))
            .json(&json!({ "variables": person }))
            .send()
            .await?
            .json::<Vec<RuleEvaluationResponse>>() // if the Yivi data is not well formatted, this might throw an error
            .await?[0])
}

pub async fn yivi_issue_start(
    Path(rule_id): Path<String>,
    State(AppState { config, .. }): State<AppState>,
    Json(result): Json<SessionResult>,
) -> Result<ChainedResponse, AppError> {
    if result.status == SessionStatus::Connected {
        let person: Person = result.try_into()?;
        let value = get_application(&person, &config)
            .await?
            .resident_application
            .value;
        if value != 0 {
            let yivi_request = IssuanceRequestBuilder::new()
                .add_credential(
                    CredentialBuilder::new("irma-demo.tweedegolf.regelregister".to_owned())
                        .validity_period(Duration::from_secs(60 * 60 * 24 * 365))
                        .attribute("rule".to_owned(), rule_name(&rule_id).await?)
                        .attribute("rule_id".to_owned(), rule_id)
                        .attribute(
                            "location".to_owned(),
                            config.hostname.join("claim")?.to_string(),
                        )
                        .attribute("amount".to_owned(), value.to_string())
                        .build(),
                )
                .build();

            return Ok(ChainedResponse::AllowanceVoucher(yivi_request));
        }

        return Ok(ChainedResponse::NoRightToAllowance);
    }

    Err(AppError::Unknown("first session is not finished yet"))
}

pub async fn yivi_finish(
    Path((_rule_id, token)): Path<(String, SessionToken)>,
    State(AppState { yivi_client, .. }): State<AppState>,
) -> Result<Json<SessionResult>, AppError> {
    let status = yivi_client.status(&token).await?;
    if status == SessionStatus::Done {
        let result = yivi_client.result(&token).await?;
        Ok(Json(result))
    } else {
        Err(AppError::Unknown("something went wrong"))
    }
}

#[derive(Template, Debug)]
#[template(path = "result.html")]
pub struct ResultTemplate {
    rule_name: String,
    allowance: usize,
}

#[derive(Template, Debug)]
#[template(path = "no_allowance.html")]
pub struct NoAllowanceTemplate {
    rule_name: String,
}

#[derive(Deserialize)]
pub struct ResultForm {
    token: SessionToken,
}

pub async fn yivi_result(
    Path(rule_id): Path<String>,
    State(AppState {
        config,
        yivi_client,
        ..
    }): State<AppState>,
    Form(form): Form<ResultForm>,
) -> Result<Response, AppError> {
    let status = yivi_client.status(&form.token).await?;
    if status == SessionStatus::Done {
        let result = yivi_client.result(&form.token).await?;
        let person: Person = result.try_into()?;
        let value = get_application(&person, &config)
            .await?
            .resident_application
            .value;
        if value != 0 {
            return Ok(Html(
                ResultTemplate {
                    rule_name: rule_name(&rule_id).await?,
                    allowance: value,
                }
                .render()?,
            )
            .into_response());
        }

        Ok(Html(
            NoAllowanceTemplate {
                rule_name: rule_name(&rule_id).await?,
            }
            .render()?,
        )
        .into_response())
    } else {
        Err(AppError::Unknown("something went wrong"))
    }
}
