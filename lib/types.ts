export interface IItemInstance {
    appid: number;
    assetid: string;
    instanceid: string;
    classid: string;
    icon_url: string;
    sku: string;
}

export interface OfferArtifact {
    id?: string;
    sender: string;
    receipient: string;
    message?: string;
    state: OfferState;
    itemsSending: IItemInstance[]; // Items being sent away from sender
    itemsReceiving: IItemInstance[]; // Items being received to the sender
    created: number;
    updated: number;
    expires: number;
    escrowEnds?: number;
}

// Copied from https://github.com/DoctorMcKay/node-steam-tradeoffer-manager/blob/master/resources/ETradeOfferState.js
export enum OfferState {
    Invalid = 1,
    Active = 2,
    Accepted = 3,
    Countered = 4,
    Expired = 5,
    Canceled = 6,
    Declined = 7,
    InvalidItems = 8,
    CreatedNeedsConfirmation = 9,
    CanceledBySecondFactor = 10,
    InEscrow = 11
}