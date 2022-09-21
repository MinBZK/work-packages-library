import "../css/policyOrgNew.css";
import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import * as api from "../api";
import { isStringValid } from "../util";
import { logger } from "../utils/logger";
import logo from "../assets/img/logo.png";
import {
  NewPolicy,
  NewPolicyOrgFromClient,
  IncomeOption,
  NewPolicyOrg,
} from "../types/policy";
import { Result, Result200 } from "../types/http";
import PolicyOrgForm from "./PolicyOrgForm";

const makeNewOrg = (): NewPolicyOrg => {
  const newOrg: NewPolicyOrg = {
    name: "",
    openingTimes: "",
    intermediair: "",
    description: "",
    address: "",
    township: "",
    phone: "",
    website: "",
  };

  return newOrg;
};

const newPolicyForm = (): NewPolicy => {
  const newForm: NewPolicy = {
    tempId: `${Math.random()}${Math.random()}`,
    name: "",
  };

  return newForm;
};

export default function PolicyOrgNew() {
  const newPolicyArr = [newPolicyForm()];

  return (
    <div>
      <PolicyOrgForm {...makeNewOrg()} policyArr={newPolicyArr} />
    </div>
  );
}
