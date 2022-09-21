import React, { useEffect, useState } from "react";

import * as api from "../api";
import { validateQueryParams, isStringValid, translate } from "../util";
import logo from "../assets/img/logo.png";
import { OrgPolicyFiltered, QueryParams } from "../types/policy";
import "../css/entitlement.css";
import { qryToObj, arrHasContent } from "../util";
import { logger } from "../utils/logger";
import { config } from "../config";

const getQueryParams = (): QueryParams => {
  // '?dob=2020-10-10&postal_code=33'
  const params = qryToObj(window.location.search) as QueryParams;

  // const requireFields = ["postal_code", "income"];

  validateQueryParams(params);

  // const requireFields = [];

  // requireFields.forEach((x) => {
  //   if (!isStringValid(params[x])) {
  //     throw Error(`Bad param: ${x}`);
  //   }
  // });

  // return params;

  return params;
};

const findEntitlements = async () => {
  try {
    const params = getQueryParams();

    const items: OrgPolicyFiltered[] = await api.getOrgPoliciesReq(params);

    return items;
  } catch (e) {
    logger.error("findEntitlements", e);
  }

  return [];
};

export default function Entitlement() {
  const [entitlements, setEntitlements] = useState<OrgPolicyFiltered[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const displayList = async () => {
      const items = await findEntitlements();

      logger.info("items", items);

      setEntitlements(items);

      setLoading(false);
    };

    displayList();
  }, []);

  const getTitle = () => {
    if (loading) {
      return "Loading...";
    }

    if (arrHasContent(entitlements)) {
      return translate(
        "You might be entitled to the following regulations:",
        config.lang
      );
    }

    return "Sorry, we did not find any regulations for you.";
  };

  return (
    <>
      <div className="textAlignCenter topLogoWrap">
        <img src={logo} alt="" width="300" />
      </div>

      <div className="whiteArea">
        <div className="fontWeightBold entitleTitle">{getTitle()}</div>

        {entitlements.map((x) => (
          <div key={x.policyId} className="entitleItem">
            <div>
              {translate("Policy", config.lang)}: {x.name}
            </div>
            <div>
              {translate("Organization", config.lang)}: {x.orgName}
            </div>
            {x.website && (
              <div>
                Website:&nbsp;
                <a target="_blank" href={x.website}>
                  {x.website}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
