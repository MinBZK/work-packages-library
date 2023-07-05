use askama_axum::{IntoResponse, Response};
use reqwest::StatusCode;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("config error {0}")]
    ConfigError(#[from] config::ConfigError),

    #[error("request error {0}")]
    Request(#[from] reqwest::Error),

    #[error("URL parse error {0}")]
    UrlError(#[from] url::ParseError),

    #[error("yivi error {0}")]
    YiviError(#[from] irma::Error),

    #[error("missing attribute {0}")]
    MissingAttribute(&'static str),

    #[error("parse error {0}")]
    ParseError(&'static str),

    #[error("unknown error {0}")]
    Unknown(&'static str),

    #[error("error rendering the template {0}")]
    Template(#[from] askama::Error),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        eprintln!("{}", self);
        StatusCode::INTERNAL_SERVER_ERROR.into_response()
    }
}
