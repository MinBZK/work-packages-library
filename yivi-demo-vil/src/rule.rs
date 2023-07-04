use askama_axum::{Response, Template};
use axum::{
    extract::Path,
    response::{Html, IntoResponse},
};
use serde::Deserialize;

use crate::{error::AppError, index::RuleGroup};

static BASE_URL: &str = "https://regels.dexcat.nl";

#[derive(Template, Debug)]
#[template(path = "rule.html")]
pub struct RuleTemplate {
    rule_name: String,
    rule_id: String,
}

#[derive(Template, Debug)]
#[template(path = "not_implemented.html")]
pub struct NotImplemented {
    rule_name: String,
}

#[derive(Deserialize)]
struct ListRulesResponse {
    data: RuleGroup,
}

pub async fn rule_name(rule_id: &str) -> Result<String, AppError> {
    let response: ListRulesResponse = reqwest::get(format!("{BASE_URL}/api/datasets/{rule_id}"))
        .await?
        .json()
        .await?;

    Ok(response.data.attributes.title)
}

pub async fn rule(Path(rule_id): Path<String>) -> Result<Response, AppError> {
    let template = match rule_id.as_str() {
        "regelgroep-uit-te-keren-individuele-inkomenstoeslag" => RuleTemplate {
            rule_name: rule_name(&rule_id).await?,
            rule_id,
        }
        .render()?,
        _ => NotImplemented {
            rule_name: rule_name(&rule_id).await?,
        }
        .render()?,
    };

    Ok(Html(template).into_response())
}
