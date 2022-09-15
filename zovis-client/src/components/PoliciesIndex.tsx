import React, { useEffect, useState } from "react";
import * as api from "../api";
import PolicyOrgForm from "./PolicyOrgForm";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { validateQueryParams, isStringValid } from "../util";
import { config, optionalFields } from "../config";
import logo from "../assets/img/logo.png";
import {
  OrgPolicyFiltered,
  DBOrgTable,
  PolicyOrg,
  DbPolicies,
  NewPolicy,
  QueryParams,
  DBNewPolicy,
  ExistingPolicyOrg,
  OptionalField,
} from "../types/policy";
import "../css/policiesIndex.css";
import { qryToObj, arrHasContent, objHasContent, translate } from "../util";
import { logger } from "../utils/logger";

const humanize = (val: string | boolean) => {
  if (typeof val === "boolean") {
    return val ? "yes" : "no";
  }

  return val;
};

const toPolicyArr = (policies: DbPolicies): NewPolicy[] => {
  const arr: NewPolicy[] = [];

  for (const k in policies) {
    const asNewPolicy: NewPolicy = {
      ...policies[k],
      tempId: k,
    };
    arr.push(asNewPolicy);
  }

  return arr;
};

const toExistingOrg = (org: PolicyOrg, orgId: string): ExistingPolicyOrg => {
  const clone = { ...org, policies: null };
  delete clone.policies;

  const asExisting: ExistingPolicyOrg = { ...clone, id: orgId };
  return asExisting;
};

const showText = (english: string): string => {
  /* impure func */
  return translate(english, config.lang);
};

const renderOptionalFieldsForPolicy = (
  policy: DBNewPolicy,
  fields: OptionalField[]
) => {
  return fields.map((field) => {
    if (!policy.hasOwnProperty(field.name)) {
      return null;
    }

    return (
      <div key={field.name}>
        {field.text}: {humanize(policy[field.name])}
      </div>
    );
  });
};

const renderPolicies = (policies) => {
  /* impure. depends on react */
  if (!objHasContent(policies)) {
    return null;
  }

  const keys: string[] = Object.keys(policies);

  return keys.map((k) => {
    const policy: DBNewPolicy = policies[k];

    return (
      <div key={k} className="policyItem">
        <div>
          {showText("Policy name")}: {policy.name}
        </div>

        {renderOptionalFieldsForPolicy(policy, optionalFields)}
      </div>
    );
  });
};

const getAllOrgs = async (): Promise<DBOrgTable> => {
  try {
    const items: DBOrgTable = await api.getAllOrgPoliciesReq();

    return items;
  } catch (e) {
    logger.error("getAllOrgs", e);
  }

  return {};
};

export default function PoliciesIndex() {
  const [orgs, setOrgs] = useState<DBOrgTable>({});
  const [orgKeyInEditing, setOrgKeyInEditing] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  const displayList = async () => {
    setLoading(true);

    const items = await getAllOrgs();

    setOrgKeyInEditing("");

    setOrgs(items);

    setLoading(false);
  };

  useEffect(() => {
    displayList();
  }, []);

  const getTitle = () => {
    if (loading) {
      return "Loading...";
    }

    if (!objHasContent(orgs)) {
      return "No organization yet.";
    }

    return "";
  };

  const handleEdit = (orgKey: string) => {
    return () => {
      setOrgKeyInEditing(orgKey);
    };
  };

  const handleCancelEdit = () => {
    if (window.confirm(`Discard your edits?`)) {
      setOrgKeyInEditing("");
    }
  };

  if (orgKeyInEditing) {
    const orgClone = { ...orgs[orgKeyInEditing] };

    return (
      <div>
        <PolicyOrgForm
          {...toExistingOrg(orgClone, orgKeyInEditing)}
          policyArr={toPolicyArr(orgClone.policies)}
          handleCancelEdit={handleCancelEdit}
          editSavedCallback={displayList}
        />
      </div>
    );
  }

  const orgsKeys: string[] = Object.keys(orgs);

  return (
    <>
      <div className="textAlignCenter topLogoWrap">
        <img src={logo} alt="" width="300" />
      </div>

      <div className="whiteArea">
        <div className="fontWeightBold entitleTitle">{getTitle()}</div>

        {orgsKeys.map((k: string, index: number) => {
          const org = orgs[k];

          return (
            <div key={k} className="entitleItem">
              <h2>
                {index + 1}. {showText("Organization Name")}: {org.name}
              </h2>

              <Button variant="primary" onClick={handleEdit(k)}>
                {translate("Edit", config.lang)}
              </Button>

              <div>
                {showText("Opening times")}: {org.openingTimes}
              </div>

              <div>
                {showText("Intermediair")}: {org.intermediair}
              </div>

              <div>
                {showText("Description")}: {org.description}
              </div>

              <div>
                {showText("Address")}: {org.address}
              </div>

              <div>
                {showText("Township")}: {org.township}
              </div>

              <div>
                {showText("Phone number")}: {org.phone}
              </div>

              <div>
                {showText("Website")}: &nbsp;
                <a target="_blank" href={org.website}>
                  {org.website}
                </a>
              </div>

              <div className="policiesWrap">
                <h3 className="policySectionHeading">
                  {org.name} - {translate("Policies", config.lang)}
                </h3>

                {renderPolicies(org.policies)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
