use askama_axum::{IntoResponse, Response, Template};
use axum::{
    response::Html,
    routing::{get, post},
    Router,
};
use irma::IrmaClientBuilder;

use crate::{
    config::AppConfig,
    error::AppError,
    state::AppState,
    yivi::{yivi_result, yivi_start},
};

mod config;
mod error;
mod state;
mod yivi;

#[derive(Template, Debug)]
#[template(path = "claim.html")]
pub struct ClaimTemplate {}

pub async fn claim() -> Result<Response, AppError> {
    Ok(Html(ClaimTemplate {}.render()?).into_response())
}

#[tokio::main]
async fn main() -> Result<(), AppError> {
    let config = AppConfig::new()?;
    let mut yivi_client = IrmaClientBuilder::new(config.yivi_server_url.as_str())?;
    if let Some(yivi_token) = config.yivi_token.clone() {
        yivi_client = yivi_client.token_authentication(yivi_token)
    }
    let yivi_client = yivi_client.build();

    let state = AppState {
        config,
        yivi_client,
    };

    let app = Router::new()
        .route("/claim", get(claim))
        .route("/claim/session", get(yivi_start))
        .route("/claim/session/:token/result", post(yivi_result))
        .with_state(state);

    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();

    Ok(())
}
