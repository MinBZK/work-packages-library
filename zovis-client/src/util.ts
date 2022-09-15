import { QueryParams, Lang } from "./types/policy";

export function isValidEmailStr(mail: string): boolean {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
}

export const isStringValid = (x: any): boolean => {
  try {
    const trimmed: string = x.replace(/\s/g, "");
    return Boolean(trimmed);
  } catch (e) {}
  return false;
};

export const qryToObj = (qrystr) => {
  /* arg str "?foo=bar&fiz=buzz" 
    returns {foo: 'bar', fiz: 'buzz'}
    */

  const qryObj = {};

  if (typeof qrystr === "string" && qrystr) {
    var query = qrystr[0] === "?" ? qrystr.substring(1) : qrystr;

    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      if (pair[0] && pair[1]) {
        qryObj[pair[0]] = pair[1];
      }
    }
  }

  return qryObj;
};

export const arrHasContent = (x: any): boolean => {
  return Array.isArray(x) && x.length > 0;
};

export const objHasContent = (x: any): boolean => {
  try {
    return Object.keys(x).length > 0;
  } catch (e) {}
  return false;
};

export const validateQueryParams = (x: QueryParams) => {
  /* May throw. must have something */

  for (const k in x) {
    const v = x[k];

    if (isStringValid(v)) {
      return true;
    }
  }

  throw new Error("Must have at least 1 parameter to search");

  // if (Object.keys(x).length > 1) {
  //   return true;
  // }

  // if (!isStringValid(x.postal_code)) {
  //   throw new Error("Must have at least 1 parameter to search");
  // }
};

export const objToQry = (qryObj) => {
  /* 
  arg obj {foo: 'bar', fiz: 'buzz'}
  returns str foo=bar&fiz=buzz
  */
  var queryStringParts = [];
  for (var key in qryObj) {
    queryStringParts.push(key + "=" + qryObj[key]);
  }

  return queryStringParts.join("&");
};

export const translate = (english: string, targetLang: Lang): string => {
  const dictionary = {
    "New Organization with Policies": "Nieuwe organisatie met voorzieningen",
    "Organization Name": "Naam organisatie",
    Description: "Beschrijving",
    Address: "Adres",
    "Phone number": "Telefoonnummer",
    "Opening times": "Openingstijden",
    Township: "Gemeente",
    "Policy name": "Voorziening",
    Edit: "Wijzig",
    "You might be entitled to the following regulations:":
      "Je komt mogelijk in aanmerking voor de volgende voorzieningen:",
    Policy: "Voorziening",
    Policies: "Voorzieningen",
    Organization: "Organisatie",
    "Save All": "Alles opslaan",
    "New policy": "Voorziening toevoegen",
    Remove: "verwijder",
    "Add field": "Toevoegen",
    Back: "Terug",
    "Editing Mode": "Bewerkingsmodus",
  };

  if (targetLang === Lang.EN) {
    return english;
  }

  return dictionary[english] || english;
};
