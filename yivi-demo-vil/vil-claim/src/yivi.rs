use axum::{
    extract::{Path, State},
    Json,
};
use irma::{
    AttributeRequest, DisclosureRequestBuilder, SessionData, SessionResult, SessionStatus,
    SessionToken,
};

use crate::{error::AppError, state::AppState};

pub async fn yivi_start(
    State(AppState { yivi_client, .. }): State<AppState>,
) -> Result<Json<SessionData>, AppError> {
    let request = DisclosureRequestBuilder::new()
        .add_discon(vec![vec![
            AttributeRequest::Simple(
                "irma-demo.tweedegolf.regelregister.allowancenumber".to_owned(),
            ),
            AttributeRequest::Simple("irma-demo.tweedegolf.regelregister.amount".to_owned()),
            AttributeRequest::Simple("irma-demo.tweedegolf.regelregister.rule_id".to_owned()),
        ]])
        .add_discon(vec![vec![AttributeRequest::Simple(
            "irma-demo.ideal.ideal.iban".to_owned(),
        )]])
        .build();

    Ok(Json(yivi_client.request(&request).await?))
}

pub async fn yivi_result(
    Path(token): Path<SessionToken>,
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
