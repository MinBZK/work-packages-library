use irma::IrmaClient;

use crate::config::AppConfig;

#[derive(Clone)]
pub struct AppState {
    pub config: AppConfig,
    pub yivi_client: IrmaClient,
}
