import { Lang, OptionalField } from "./types/policy";

export const optionalFields: OptionalField[] = [
  { name: "incomeLowerThan", text: "Income lower than X", inputType: "number" },
  { name: "equityLowerThan", text: "Equity lower than X", inputType: "number" },
  {
    name: "hasResidentChildren",
    text: "Has resident children X",
    inputType: "checkbox",
  },
  { name: "hasDebts", text: "Has debts X", inputType: "checkbox" },
  {
    name: "isEntrepreneur",
    text: "Is independent entrepreneur X",
    inputType: "checkbox",
  },
  { name: "isCohabiting", text: "Is cohabiting X", inputType: "checkbox" },
  {
    name: "livingStudentHouse",
    text: "Lives in student house X",
    inputType: "checkbox",
  },
  {
    name: "monthlyRentHigherThan",
    text: "Rent per month higher than X",
    inputType: "number",
  },
];

export const config = {
  lang: Lang.NL,
};
