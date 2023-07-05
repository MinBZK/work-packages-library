use askama_axum::Template;
use serde::Deserialize;

use crate::error::AppError;

static BASE_URL: &str = "https://regels.dexcat.nl/";

#[derive(Template)]
#[template(path = "index.html")]
pub struct IndexTemplate {
    rule_groups: Vec<RuleGroup>,
}

#[derive(Deserialize)]
struct ApiResponse {
    data: Vec<RuleGroup>,
}

#[derive(Deserialize)]
pub struct RuleGroup {
    pub id: String,
    pub attributes: Attributes,
}

#[derive(Deserialize)]
pub struct Attributes {
    #[serde(rename = "dct:title")]
    pub title: String,
}

pub async fn index() -> Result<IndexTemplate, AppError> {
    let response: ApiResponse = reqwest::get(format!("{}/api/datasets", BASE_URL))
        .await?
        .json()
        .await?;

    Ok(IndexTemplate {
        rule_groups: response.data,
    })
}
