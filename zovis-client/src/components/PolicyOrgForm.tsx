import "../css/policyOrgNew.css";
import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

import * as api from "../api";
import { config, optionalFields } from "../config";
import { isStringValid, translate } from "../util";
import { logger } from "../utils/logger";
import logo from "../assets/img/logo.png";
import {
  NewPolicy,
  NewPolicyOrgFromClient,
  IncomeOption,
  NewPolicyOrg,
  Lang,
  OptionalField,
} from "../types/policy";
import { Result, Result200 } from "../types/http";

const addFieldHint = "addFieldHint";

const optionalFieldsForClicking: OptionalField[] = [
  {
    name: addFieldHint,
    text: "+ " + translate("Add field", config.lang),
    inputType: "",
  },
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

const toLabel = (optionValue: string): string => {
  return `< ${optionValue}% social assistance standard`;
};

const newOrgError = (
  requireFieldsForOrg: string[],
  newOrg: NewPolicyOrg
): string => {
  /* func doesn't seem needed. HTML input require already works. */

  const errors = requireFieldsForOrg.map((x) => {
    if (isStringValid(newOrg[x])) {
      return "";
    }

    return `Invalid ${x}. `;
  });

  return errors.join("");
};

const toIncomeOption = (optionValue: string): IncomeOption => {
  const option: IncomeOption = {
    value: optionValue,
    label: toLabel(optionValue),
  };
  return option;
};

const defaultIncomeOption: string = "110";

// todo: maybe fetch from server-side. For demo ok
const incomeOptions: IncomeOption[] = [
  toIncomeOption(defaultIncomeOption),
  toIncomeOption("120"),
  toIncomeOption("130"),
];

const newPolicyForm = (): NewPolicy => {
  const newForm: NewPolicy = {
    tempId: `${Math.random()}${Math.random()}`,
    name: "",
  };

  return newForm;
};

type PolicyOrgFormProps = NewPolicyOrg & {
  policyArr: NewPolicy[];
  handleCancelEdit?: () => void;
  editSavedCallback?: () => Promise<void>;
};

export default function PolicyOrgForm(props: PolicyOrgFormProps) {
  const [name, setName] = useState<string>(props.name);
  const [intermediair, setIntermediair] = useState<string>(props.intermediair);
  const [description, setDescription] = useState<string>(props.description);
  const [address, setAddress] = useState<string>(props.address);
  const [openingTimes, setOpeningTimes] = useState<string>(props.openingTimes);
  const [township, setTownship] = useState<string>(props.township);
  const [phone, setPhone] = useState<string>(props.phone);
  const [website, setWebsite] = useState<string>(props.website);
  const [policyArr, setPolicyArr] = useState<NewPolicy[]>(props.policyArr);
  const [message, setMessage] = useState<string>("");
  const [submitting, setsubmitting] = useState(false);

  const updatePolicyInArr = (
    id: string,
    field: string,
    newVal: number | string | boolean
  ) => {
    const arr = policyArr.map((x) => {
      if (x.tempId === id) {
        return { ...x, [field]: newVal } as NewPolicy;
      }

      return x;
    });

    setPolicyArr(arr);
  };

  const handleChangePolicyBooleanField = (id: string) => {
    return (e) => {
      const name: string = e.target.name;

      const arr = policyArr.map((x) => {
        if (x.tempId === id) {
          return { ...x, [name]: !x[name] } as NewPolicy;
        }

        return x;
      });

      setPolicyArr(arr);
    };
  };

  const handleChangePolicyField = (id: string) => {
    return (e) => {
      updatePolicyInArr(id, e.target.name, e.target.value);
    };
  };

  const handleAddPolicy = () => {
    setPolicyArr(policyArr.concat(newPolicyForm()));
  };

  const clearMessageInSeconds = (seconds: number) => {
    setTimeout(() => {
      setMessage("");
    }, seconds * 1000);
  };

  const clearForm = () => {
    setName("");
    setIntermediair("");
    setDescription("");
    setAddress("");
    setTownship("");
    setPhone("");
    setWebsite("");
    setPolicyArr([newPolicyForm()]);
  };

  const isEditingMode = (): boolean => {
    return !!props.id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requireFieldsForOrg = ["name"];

    const newOrg: NewPolicyOrg = {
      name,
      openingTimes,
      intermediair,
      description,
      address,
      township,
      phone,
      website,
    };

    if (isEditingMode()) {
      newOrg.id = props.id;
    }

    const validationError: string = newOrgError(requireFieldsForOrg, newOrg);

    if (validationError) {
      alert(validationError);
      return;
    }

    const toSend: NewPolicyOrgFromClient = {
      org: newOrg,
      policies: policyArr,
    };

    for (const po of toSend.policies) {
      logger.info("po", po.tempId);
      console.table(po);
    }

    logger.info("toSend", toSend, " fake halt");

    setsubmitting(true);

    try {
      const result: Result200 = await api.addPolicyOrg(toSend);

      if (result.code === 201) {
        if (isEditingMode()) {
          console.log("updated", props.id);

          if (typeof props.editSavedCallback === "function") {
            props.editSavedCallback();
          }
          return;
        }

        setMessage("Saved!");
        clearMessageInSeconds(8);
        resetForm();
      } else {
        alert("Error " + result.message);
      }

      console.log("result of ajax", result);
    } catch (err) {
      alert("Failed to add policy. " + err.toString());
    }

    setsubmitting(false);
  };

  const resetForm = () => {
    setsubmitting(false);
    clearForm();
  };

  const renderRemoveFieldBtn = (field: OptionalField, tempId: string) => {
    return (
      <div className="positionRelative">
        <div
          title={`Remove '${field.text}', if policy does not require a specific value for it.`}
          onClick={handleRemove(field.name, tempId)}
          className="cursorPointer positionAbsolute removeBtn"
        >
          {translate("Remove", config.lang)}
        </div>
      </div>
    );
  };

  const handleRemovePolicy = (tempId: string) => {
    return () => {
      if (window.confirm("Remove this policy?")) {
        const arr = policyArr.filter((policy) => policy.tempId !== tempId);
        setPolicyArr(arr);
      }
    };
  };

  const renderRemovePolicyBtn = (tempId: string) => {
    return (
      <div className="positionRelative">
        <div
          title={`Remove this policy.`}
          onClick={handleRemovePolicy(tempId)}
          className="cursorPointer positionAbsolute removeBtn removePolicyBtn"
        >
          {translate("Remove", config.lang)}
        </div>
      </div>
    );
  };

  const textOrNumberField = (field: OptionalField, policy: NewPolicy) => {
    return (
      <Form.Group key={`${field.name}-${policy.tempId}`}>
        <Form.Label>{field.text}</Form.Label>

        <Form.Control
          type={field.inputType}
          value={policy[field.name]}
          name={field.name}
          required
          placeholder={field.text}
          onChange={handleChangePolicyField(policy.tempId)}
        />

        {renderRemoveFieldBtn(field, policy.tempId)}
      </Form.Group>
    );
  };

  const checkboxField = (field: OptionalField, policy: NewPolicy) => {
    const itemKey: string = `${field.name}-${policy.tempId}`;

    return (
      <Form.Group key={itemKey} controlId={itemKey}>
        <Form.Check
          type="checkbox"
          checked={policy[field.name]}
          name={field.name}
          onChange={handleChangePolicyBooleanField(policy.tempId)}
          label={field.text}
        />

        {renderRemoveFieldBtn(field, policy.tempId)}
      </Form.Group>
    );
  };

  const renderField = (field: OptionalField, policy: NewPolicy) => {
    if (field.inputType === "number" || field.inputType === "text") {
      return textOrNumberField(field, policy);
    }

    if (field.inputType === "checkbox") {
      return checkboxField(field, policy);
    }

    return null;
  };

  const renderOptionalFields = (policy: NewPolicy) => {
    return optionalFields.map((field) => {
      if (policy.hasOwnProperty(field.name)) {
        return renderField(field, policy);
      }

      return null;
    });
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeOpeningTimes = (e) => {
    setOpeningTimes(e.target.value);
  };

  const handleChangeTownship = (e) => {
    setTownship(e.target.value);
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleChangeWebsite = (e) => {
    setWebsite(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeIntermediair = (e) => {
    setIntermediair(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleAddField = (tempId: string, optionalFields: OptionalField[]) => {
    return (e) => {
      const fieldName: string = e.target.value;

      if (fieldName === addFieldHint) {
        logger.info("addFieldHint. halt");
        return;
      }

      const arr = policyArr.map((x) => {
        if (x.tempId === tempId) {
          return {
            ...x,
            [fieldName]: defaultValByFieldName(fieldName, optionalFields),
          } as NewPolicy;
        }

        return x;
      });

      setPolicyArr(arr);
    };
  };

  const handleRemove = (fieldName: string, tempId: string) => {
    return () => {
      const arr = policyArr.map((x) => {
        if (x.tempId === tempId) {
          const policyClone: NewPolicy = { ...x };

          delete policyClone[fieldName];
          return policyClone;
        }

        return x;
      });

      setPolicyArr(arr);
    };
  };

  const getFormTitle = () => {
    /* impure. Depends on this component */
    if (isEditingMode()) {
      return translate("Editing Mode", config.lang);
    }

    return translate("New Organization with Policies", config.lang);
  };

  const renderCancelEditBtn = () => {
    if (isEditingMode() && typeof props.handleCancelEdit === "function") {
      return (
        <Button variant="secondary" onClick={props.handleCancelEdit}>
          {translate("Back", config.lang)}
        </Button>
      );
    }
    return null;
  };

  const openTimesText: string = translate("Opening times", config.lang);
  const orgNameText = translate("Organization Name", config.lang);
  const describeText = translate("Description", config.lang);
  const addrText = translate("Address", config.lang);
  const townshipText = translate("Township", config.lang);
  const phoneText = translate("Phone number", config.lang);
  const policyNameText = translate("Policy name", config.lang);

  return (
    <>
      <div
        style={{
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        <img src={logo} alt="" width="300" />
      </div>

      <div>
        <Card
          style={{
            maxWidth: "1200px",
            margin: "auto",
            padding: "1rem",
          }}
        >
          {message && <Alert variant="success">{message}</Alert>}

          <h1
            style={{
              textAlign: "center",
            }}
          >
            {getFormTitle()}
          </h1>

          <div>
            {renderCancelEditBtn()}
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <div className="bothSides" style={{}}>
                  <div
                    className="leftSide"
                    style={{
                      width: "50%",
                      float: "left",
                    }}
                  >
                    <Form.Group>
                      <Form.Label>{orgNameText}</Form.Label>

                      <Form.Control
                        type="text"
                        value={name}
                        required
                        placeholder={orgNameText}
                        onChange={handleChangeName}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Intermediair</Form.Label>

                      <Form.Control
                        type="text"
                        value={intermediair}
                        placeholder="Intermediair"
                        onChange={handleChangeIntermediair}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{openTimesText}</Form.Label>

                      <Form.Control
                        type="text"
                        value={openingTimes}
                        name="openingTimes"
                        placeholder={openTimesText}
                        onChange={handleChangeOpeningTimes}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{describeText}</Form.Label>

                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        placeholder={describeText}
                        onChange={handleChangeDescription}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{addrText}</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder={addrText}
                        value={address}
                        onChange={handleChangeAddress}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{townshipText}</Form.Label>

                      <Form.Control
                        required
                        type="text"
                        placeholder={townshipText}
                        value={township}
                        onChange={handleChangeTownship}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{phoneText}</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder={phoneText}
                        value={phone}
                        onChange={handleChangePhone}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Website</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Website"
                        value={website}
                        onChange={handleChangeWebsite}
                      />
                    </Form.Group>
                  </div>

                  <div
                    className="rightSide"
                    style={{
                      width: "50%",
                      float: "right",
                      paddingLeft: "50px",
                    }}
                  >
                    {policyArr.map((policy, index) => {
                      return (
                        <Card.Body key={policy.tempId}>
                          <h4>
                            {translate("Policy", config.lang)} &nbsp;
                            {index + 1}
                          </h4>
                          {renderRemovePolicyBtn(policy.tempId)}

                          <Form.Group>
                            <Form.Label>{policyNameText}</Form.Label>

                            <Form.Control
                              type="text"
                              value={policy.name}
                              name="name"
                              required
                              placeholder={policyNameText}
                              onChange={handleChangePolicyField(policy.tempId)}
                            />
                          </Form.Group>

                          {renderOptionalFields(policy)}

                          <div className="spacer1"></div>
                          <Form.Group>
                            <Form.Control
                              as="select"
                              name="addField"
                              onChange={handleAddField(
                                policy.tempId,
                                optionalFields
                              )}
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
                      );
                    })}

                    <div style={{ textAlign: "center" }}>
                      <Button variant="primary" onClick={handleAddPolicy}>
                        {translate("New policy", config.lang)}
                      </Button>
                    </div>
                  </div>
                </div>

                <div style={{ clear: "left" }}>
                  <Button
                    style={{ padding: "0.5rem 1.8rem" }}
                    type="submit"
                    disabled={submitting}
                    variant="primary"
                  >
                    {submitting
                      ? "Saving All..."
                      : translate("Save All", config.lang)}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </div>
        </Card>
      </div>
    </>
  );
}
