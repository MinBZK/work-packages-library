export type QrDetail = {
    caseId: string, //id of QR
    userId: string, //creator email id
    orgnizationId: string
}

export type QrListItem = {
    id: string,
    userName: string,
    orgName: string,
    createdAt: string,
    usedAt: string,
}

export type QrAdminDetail = {
    qrId: string,
    creatorName: string,
    orgId: string;
    orgName: string;
    createdAt: string; //ISO string
    usedAt: string; //ISO string
};


export type Filter  = {
    startTime: number, //UTC timestamp, miliseconds
    endTime: number, //UTC timestamp, miliseconds
    orgId: string
}