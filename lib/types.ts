import { EconItem } from "@automatedtf/catalog";

export interface IItemInstance {
    appid: number;
    assetid: string;
    instanceid: string;
    classid: string;
    icon_url: string;
    sku: string;
}

export interface EconOffer {
    id?: string;
    partner: string;
    manager: { steamID: string }
    isOurOffer: boolean;
    state: OfferState;
    itemsToGive: EconItem[];
    itemsToReceive: EconItem[];
    created: number;
    message?: string;
    updated: number;
    expires: number;
    escrowEnds?: number;
}

export type OfferArtifact = Pick<
    EconOffer,
    "id" | "message" | "state" | "created" | "updated" |
    "expires" | "escrowEnds"
> & {
    sender: string;
    recipient: string;
    itemsSending: IItemInstance[]; // Items being sent away from sender
    itemsReceiving: IItemInstance[]; // Items being received to the sender
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