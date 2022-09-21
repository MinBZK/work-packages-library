/* This search page is non-user facing; only for admin testing. Hard code is ok */
import "../css/shared.css";
import "../css/policyOrgNew.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import * as api from "../api";
import { isStringValid, validateQueryParams, objToQry } from "../util";
import { logger } from "../utils/logger";
import logo from "../assets/img/logo.png";
import {
  NewPolicy,
  NewPolicyOrgFromClient,
  IncomeOption,
  NewPolicyOrg,
  QueryParams,
} from "../types/policy";
import { Result, Result200 } from "../types/http";

type NewPolicySearch = {
  /* basically DBNewPolicy. But only require township. A hacky way to make the form work. */
  tempId: string;
  township: string;
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

const toQueryParams = (policy: NewPolicySearch): QueryParams => {
  const x: QueryParams = {
    township: policy.township,
  };

  if (!isStringValid(x.township)) {
    delete x.township;
  }

  const optionalFields = {
    income: "incomeLowerThan",
    equity_lower_than: "equityLowerThan",
    has_redident_children: "hasResidentChildren",
    has_debts: "hasDebts",
    is_entrepreneur: "isEntrepreneur",
    is_cohabiting: "isCohabiting",
    living_student_house: "livingStudentHouse",
    monthly_rent_higher_than: "monthlyRentHigherThan",
  };

  for (const keyInParam in optionalFields) {
    const keyInPolicy: string = optionalFields[keyInParam];

    if (policy.hasOwnProperty(keyInPolicy)) {
      const formValue: string | boolean = policy[keyInPolicy];

      if (typeof formValue === "boolean") {
        x[keyInParam] = formValue ? "yes" : "no";
      } else {
        x[keyInParam] = formValue;
      }
    }
  }

  return x;
};

type OptionalField = {
  name: string;
  text: string;
  inputType: string;
};

const optionalFields: OptionalField[] = [
  { name: "incomeLowerThan", text: "Income", inputType: "number" },
  { name: "equityLowerThan", text: "Equity", inputType: "number" },

  {
    name: "hasResidentChildren",
    text: "Has resident children",
    inputType: "checkbox",
  },
  { name: "hasDebts", text: "Has debts", inputType: "checkbox" },
  {
    name: "isEntrepreneur",
    text: "Is independent entrepreneur",
    inputType: "checkbox",
  },
  { name: "isCohabiting", text: "Is cohabiting", inputType: "checkbox" },
  {
    name: "livingStudentHouse",
    text: "Lives in student house",
    inputType: "checkbox",
  },
  {
    name: "monthlyRentHigherThan",
    text: "Rent per month",
    inputType: "number",
  },
];

const addFieldHint = "addFieldHint";

const optionalFieldsForClicking: OptionalField[] = [
  { name: addFieldHint, text: "+ Add field", inputType: "" },
  ,
  ...optionalFields,
];

const defaultValByFieldName = (
  fieldName: string,
  optionalFields: OptionalField[]
): 0 | "" | boolean => {
  const defaults = {
    number: 0,
    text: "",
    checkbox: true,
  };

  const opt = optionalFields.find((x) => x.name === fieldName);

  return defaults[opt.inputType];
};

export default function PolicySearch() {
  const [policy, setPolicy] = useState<NewPolicySearch>({
    township: "",
    tempId: `${Math.random()}`,
  });
  const [link, setLink] = useState<string>("");

  const handleChangePolicyBooleanField = (id: string) => {
    return (e) => {
      const name: string = e.target.name;

      const clone = { ...policy, [name]: !policy[name] } as NewPolicySearch;

      setPolicy(clone);
    };
  };

  const handleChangePolicyField = (id: string) => {
    return (e) => {
      // updatePolicyInArr(id, e.target.name, e.target.value);

      const clone = { ...policy };
      clone[e.target.name] = e.target.value;

      setPolicy(clone);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toSend: QueryParams = toQueryParams(policy);

    try {
      validateQueryParams(toSend);
    } catch (e) {
      alert("Error. Halt." + e.toString());
      return;
    }

    console.table(toSend);

    const qstr: string = objToQry(toSend);

    const link = `/entitlement?${qstr}`;

    setLink(link);
  };

  const handleRemove = (fieldName: string) => {
    return () => {
      const policyClone = { ...policy };
      delete policyClone[fieldName];
      setPolicy(policyClone);
    };
  };

  const renderRemoveBtn = (field: OptionalField) => {
    return (
      <div className="positionRelative">
        <div
          title={`Remove '${field.text}', if policy does not require a specific value for it.`}
          onClick={handleRemove(field.name)}
          className="cursorPointer positionAbsolute removeBtn"
        >
          Remove
        </div>
      </div>
    );
  };

  const textOrNumberField = (field: OptionalField, policy: NewPolicySearch) => {
    return (
      <div key={`${field.name}-${policy.tempId}`}>
        <Form.Group controlId={`${field.name}-${policy.tempId}`}>
          <Form.Label>{field.text}</Form.Label>

          <Form.Control
            type={field.inputType}
            value={policy[field.name]}
            name={field.name}
            required
            placeholder={field.text}
            onChange={handleChangePolicyField(policy.tempId)}
          />
          {renderRemoveBtn(field)}
        </Form.Group>
      </div>
    );
  };

  const checkboxField = (field: OptionalField, policy: NewPolicySearch) => {
    const itemKey: string = `${field.name}-${policy.tempId}`;

    return (
      <div key={itemKey}>
        <>
          <Form.Group controlId={itemKey}>
            <Form.Check
              type="checkbox"
              checked={policy[field.name]}
              name={field.name}
              onChange={handleChangePolicyBooleanField(policy.tempId)}
              label={field.text}
            />
            {renderRemoveBtn(field)}
          </Form.Group>
        </>
      </div>
    );
  };

  const renderField = (field: OptionalField, policy: NewPolicySearch) => {
    if (field.inputType === "number" || field.inputType === "text") {
      return textOrNumberField(field, policy);
    }

    if (field.inputType === "checkbox") {
      return checkboxField(field, policy);
    }

    return null;
  };

  const renderOptionalFields = (policy: NewPolicySearch) => {
    return optionalFields.map((field) => {
      if (policy.hasOwnProperty(field.name)) {
        return renderField(field, policy);
      }

      return null;
    });
  };

  const handleAddField = (optionalFields: OptionalField[]) => {
    return (e) => {
      const fieldName: string = e.target.value;

      if (fieldName === addFieldHint) {
        logger.info("addFieldHint. halt");
        return;
      }

      const newItem = {
        ...policy,
        [fieldName]: defaultValByFieldName(fieldName, optionalFields),
      } as NewPolicySearch;

      setPolicy(newItem);
    };
  };

  return (
    <>
      <div>
        <Card
          style={{
            maxWidth: "950px",
            margin: "auto",
            padding: "1rem",
          }}
        >
          <h1
            style={{
              textAlign: "center",
            }}
          >
            Search Policies
          </h1>

          <div>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <div className="" style={{}}>
                  <Card.Body>
                    <Form.Group>
                      <Form.Label>Gemeente</Form.Label>

                      <Form.Control
                        type="text"
                        name="township"
                        placeholder="Gemeente"
                        value={policy.township}
                        onChange={handleChangePolicyField(policy.tempId)}
                      />
                    </Form.Group>

                    {renderOptionalFields(policy)}

                    <div className="spacer1"></div>
                    <Form.Group>
                      <Form.Control
                        as="select"
                        name="addField"
                        onChange={handleAddField(optionalFields)}
                      >
                        {optionalFieldsForClicking.map((x) => {
                          if (policy.hasOwnProperty(x.name)) {
                            /* already added */
                            return null;
                          }

                          return (
                            <option key={x.name} value={x.name}>
                              {x.text}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Card.Body>
                  <div style={{ textAlign: "center" }}>
                    <Button
                      style={{ padding: "0.5rem 1.8rem" }}
                      type="submit"
                      variant="primary"
                    >
                      Generate result link
                    </Button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </div>

          {link && (
            <Alert variant="success">
              <Link className="toplink" to={link}>
                {window.location.host + link}
              </Link>
            </Alert>
          )}
        </Card>
      </div>
    </>
  );
}
