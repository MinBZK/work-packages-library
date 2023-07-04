use config::{Config, ConfigError, Environment};
use serde::Deserialize;
use url::Url;

#[derive(Debug, Clone, Deserialize)]
pub struct AppConfig {
    pub hostname: Url,
    pub yivi_server_url: Url,
    pub yivi_token: Option<String>,
    pub vil_api_username: String,
    pub vil_api_password: String,
}

impl AppConfig {
    pub fn new() -> Result<Self, ConfigError> {
        Config::builder()
            .add_source(Environment::default())
            .build()?
            .try_deserialize()
    }
}
