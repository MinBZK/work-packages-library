use std::collections::HashMap;

use chrono::{Local, NaiveDate, NaiveTime, TimeZone};
use irma::SessionResult;
use serde::{Serialize, Serializer};
use serde_json::json;

use crate::error::AppError;

#[derive(Debug, Serialize)]
pub struct Person {
    #[serde(rename = "Woonplaats", serialize_with = "wrap")]
    pub residence: String,
    #[serde(rename = "leeftijd", serialize_with = "wrap")]
    pub age: u8,
    #[serde(rename = "ouderDan21", serialize_with = "wrap")]
    pub older_than_21: bool,
    #[serde(rename = "inkomenPerMaand", serialize_with = "wrap")]
    pub income_per_month: i64,
    #[serde(rename = "alleenstaande", serialize_with = "wrap")]
    pub single: bool,
    #[serde(rename = "thuiswonendeKinderen", serialize_with = "wrap")]
    pub children_living_at_home: bool,
    #[serde(rename = "vermogen", serialize_with = "wrap")]
    pub capital: i64,
}

fn wrap<S, T>(value: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
    T: Serialize,
{
    json!({ "value": value }).serialize(serializer)
}

fn parse_yivi_bool(value: &str) -> Result<bool, AppError> {
    match value.to_lowercase().as_bytes()[0] {
        b't' => Ok(true),
        b'f' => Ok(false),
        b'y' => Ok(true),
        b'n' => Ok(false),
        _ => Err(AppError::ParseError("cannot parse boolean")),
    }
}

fn age_from_yivi_birthdate(value: &str) -> Result<u32, AppError> {
    let birthdate = NaiveDate::parse_from_str(value, "%d-%m-%Y")
        .map_err(|_| AppError::MissingAttribute("'geboortedatum' is wrongly formatted"))?
        .and_time(NaiveTime::MIN);
    Local::now()
        .years_since(Local.from_local_datetime(&birthdate).unwrap())
        .ok_or(AppError::Unknown("could not compute age"))
}

fn get_vil_attribute<'a>(
    map: &'a HashMap<String, String>,
    key: &'static str,
) -> Result<&'a String, AppError> {
    map.get(&format!("irma-demo.discipl.demoVIL.{key}"))
        .ok_or(AppError::MissingAttribute(key))
}

impl TryFrom<SessionResult> for Person {
    type Error = AppError;

    fn try_from(value: SessionResult) -> Result<Self, Self::Error> {
        let attr_map: HashMap<String, String> = value.disclosed[0]
            .clone()
            .into_iter()
            .filter_map(|attr| Some((attr.identifier, attr.raw_value?)))
            .collect();

        let residence = get_vil_attribute(&attr_map, "woonplaats")?;
        let older_than_21 = get_vil_attribute(&attr_map, "ouderDan21")?;
        let income_per_month = get_vil_attribute(&attr_map, "inkomenPerMaand")?;
        let single = get_vil_attribute(&attr_map, "alleenstaande")?;
        let children_living_at_home = get_vil_attribute(&attr_map, "thuiswonendeKinderen")?;
        let capital = get_vil_attribute(&attr_map, "vermogen")?;
        let birthdate = get_vil_attribute(&attr_map, "geboortedatum")?;

        Ok(Person {
            residence: residence.to_string(),
            age: age_from_yivi_birthdate(birthdate)
                .unwrap()
                .try_into()
                .unwrap(),
            older_than_21: parse_yivi_bool(older_than_21).unwrap(),
            income_per_month: income_per_month.parse().unwrap(),
            single: parse_yivi_bool(single).unwrap(),
            children_living_at_home: parse_yivi_bool(children_living_at_home).unwrap(),
            capital: capital.parse().unwrap(),
        })
    }
}
