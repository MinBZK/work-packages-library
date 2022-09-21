export type QueryParams = {
  township: string;
  income?: string;
  equity_lower_than?: string;
  has_redident_children?: string;
  has_debts?: string;
  is_entrepreneur?: string;
  is_cohabiting?: string;
  living_student_house?: string;
  monthly_rent_higher_than?: string;
};

export type DBNewPolicy = {
  name: string;
  // township: string;
  /* optional fields */
  incomeLowerThan?: string;
  equityLowerThan?: string;
  hasResidentChildren?: boolean;
  hasDebts?: boolean;
  isEntrepreneur?: boolean;
  isCohabiting?: boolean;
  livingStudentHouse?: boolean;
  monthlyRentHigherThan?: string;
};

// export type DBNewPolicy = DBNewPolicy & {
//   id: string;
// }

export type OptionalField = {
  name: string;
  text: string;
  inputType: string;
};

export type NewPolicy = DBNewPolicy & {
  tempId: string;
};

export type OrgPolicyFiltered = DBNewPolicy & {
  policyId: string;
  orgName: string;
  orgId: string;
  website?: string;
};

export type IncomeOption = {
  value: string;
  label: string;
};

// export type Policy = {
//   id: string;
//   name: string;
//   postalCode: string;
//   address: string;
// };

export type NewPolicyOrg = {
  name: string;
  /* If for updating an existing record, id would be string */
  id?: string;
  openingTimes?: string;
  intermediair?: string;
  description?: string;
  address?: string;
  township?: string;
  phone?: string;
  website?: string;
};

export type ExistingPolicyOrg = NewPolicyOrg & {
  id: string;
};

export enum Lang {
  NL = "NL",
  EN = "EN",
}

export type NewPolicyOrgFromClient = {
  org: NewPolicyOrg;
  policies: NewPolicy[];
};

// export type DBOrgTable = {
//   [key: string]: {
//     org: NewPolicyOrg;
//     policies: {
//       [key: string]: DBNewPolicy;
//     };
//   };
// };

export type DbPolicies = {
  [key: string]: DBNewPolicy;
};

export type PolicyOrg = NewPolicyOrg & {
  policies: DbPolicies;
};

export type DBOrgTable = {
  [key: string]: PolicyOrg;
};
