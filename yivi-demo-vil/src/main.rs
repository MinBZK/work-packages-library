use axum::{
    routing::{get, post},
    Router,
};
use irma::IrmaClientBuilder;

use crate::{
    config::AppConfig,
    error::AppError,
    index::index,
    rule::rule,
    state::AppState,
    yivi::{yivi_disclose_start, yivi_finish, yivi_issue_start, yivi_result},
};

mod config;
mod error;
mod index;
mod model;
mod rule;
mod state;
mod yivi;

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
        .route("/", get(index))
        .route("/:rule", get(rule))
        .route("/:rule", post(yivi_result))
        .route("/:rule/session", get(yivi_disclose_start))
        .route("/:rule/issue", post(yivi_issue_start))
        .route("/:rule/:token/finish", post(yivi_finish))
        .nest_service("/public", ServeDir::new("public"))
        .with_state(state);

    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();

    Ok(())
}
