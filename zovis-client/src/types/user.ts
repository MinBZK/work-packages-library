export enum Role {
    User = 1,
    Manager = 2,
    Admin = 3,
}

export type UserDetail = {
    emailId: string,
    name: string,
    email: string,
    orgName: string,
    orgId: string,
    role: Role,
};

export type NewPerson = {
    name: string,
    email: string,
    orgId: string,
    isManager: boolean;
};

export type CurrentUser = {
    emailVerified: boolean,
    detail: UserDetail,
};