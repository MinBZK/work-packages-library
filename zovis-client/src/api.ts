import { NewOrg, OrgDetail } from "./types/org";
import { Filter, QrDetail, QrAdminDetail } from "./types/qr";
import { NewPerson, UserDetail } from "./types/user";
import { fireFuncs } from "./firebase";
import { Result201, Result, Result200 } from "./types/http";
import {
  NewPolicy,
  QueryParams,
  NewPolicyOrgFromClient,
  OrgPolicyFiltered,
  DBOrgTable,
} from "./types/policy";
import { logger } from "./utils/logger";

export const getOrgsReq = async (): Promise<OrgDetail[]> => {
  const result = await fireFuncs.httpsCallable("getOrgsReq")();

  const obj: Result200 = result.data;

  if (obj.code === 200) {
    return obj.data as OrgDetail[];
  }

  throw Error(obj.message || "Failed to get orgs");
};

export const getUsersReq = async (orgId?: string): Promise<UserDetail[]> => {
  //admin will req without orgId arg. Manager must submit orgId arg

  const result = await fireFuncs.httpsCallable("getPersons")({ orgId });

  const payload: Result200 = result.data;

  if (payload.code === 200) {
    return payload.data as UserDetail[];
  }

  throw Error(payload.message || "Failed to list users");
};

export const addPerson = async (person: NewPerson): Promise<UserDetail> => {
  const result = await fireFuncs.httpsCallable("addPersonReqClone")(person);

  const obj: Result201 = result.data;

  if (obj.code === 201) {
    return obj.data as UserDetail;
  }

  throw Error(obj.message || "Failed to create account");
};

export const addOrg = async (org: NewOrg): Promise<OrgDetail> => {
  const result = await fireFuncs.httpsCallable("addOrgReq")(org);

  const obj: Result = result.data;

  if (obj.code === 201) {
    const orgCreated: OrgDetail = {
      id: obj.message,
      name: org.name,
    };

    return orgCreated;
  }

  throw Error(obj.message || "Failed to create org");
};

export const createQrReq = async (orgId: string): Promise<QrDetail> => {
  const result = await fireFuncs.httpsCallable("addQrReq")({ orgId });

  const obj: Result201 = result.data;

  if (obj.code === 201) {
    return obj.data as QrDetail;
  }

  throw Error(obj.message || "Failed to create QR");
};

export const searchQrList = async (
  filter: Filter
): Promise<QrAdminDetail[]> => {
  const res = await fireFuncs.httpsCallable("filterQrsReq")({ filter });

  const result: Result200 = res.data;

  if (result.code === 200) return result.data as QrAdminDetail[];

  throw Error(result.message || "Error");
};

export const getUserNowDetail = async (): Promise<UserDetail> => {
  const result = await fireFuncs.httpsCallable("getCurrentUser")();

  const res: Result200 = result.data;
  if (res.code === 200) return res.data as UserDetail;

  throw Error(res.message || "Login error");
};

export const delOrg = async (orgId: string): Promise<Result> => {
  const result = await fireFuncs.httpsCallable("delOrgReq")({ orgId });

  return result.data as Result;
};

export const delPerson = async (emailId: string): Promise<Result> => {
  const result = await fireFuncs.httpsCallable("delPersonReq")({ emailId });

  return result.data as Result;
};

export const addPolicy = async (item: NewPolicy) => {
  const result = await fireFuncs.httpsCallable("addPolicy")(item);

  const obj: Result = result.data;

  return obj;
};

export const getOrgPoliciesReq = async (
  params: QueryParams
): Promise<OrgPolicyFiltered[]> => {
  const result = await fireFuncs.httpsCallable("getOrgPoliciesReq")(params);

  const obj: Result200 = result.data;

  return obj.data as OrgPolicyFiltered[];
};

export const addPolicyOrg = async (
  data: NewPolicyOrgFromClient
): Promise<Result200> => {
  const result = await fireFuncs.httpsCallable("addPolicyOrgReq")(data);

  const obj: Result200 = result.data;

  return obj;
};

export const getAllOrgPoliciesReq = async (): Promise<DBOrgTable> => {

  const result = await fireFuncs.httpsCallable("getAllOrgPoliciesReq")();

  const obj: Result200 = result.data;

  return obj.data as DBOrgTable;
};
