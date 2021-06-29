import { EconItem } from "@automatedtf/catalog";

export interface IItemInstance {
    appid: number;
    assetid: string;
    instanceid: string;
    classid: string;
    icon_url: string;
    sku: string;
}

export interface TradeItem {
    appid: number;
    contextid: string;
    assetid: string;
    classid: string;
    instanceid: string;
    amount: number;
    missing: boolean;
    id: string;
    fraudwarnings: any[],
    descriptions: any[],
    owner_descriptions: any[],
    actions: any[],
    owner_actions: any[],
    market_actions: any[],
    tags: any[],
    tradable: boolean,
    marketable: boolean,
    commodity: boolean,
    market_tradable_restriction: number,
    market_marketable_restriction: number
}

export interface TradeOffer {
    id?: string;
    partner: { accountid: number};
    isOurOffer: boolean;
    state: OfferState;
    itemsToGive: TradeItem[];
    itemsToReceive: TradeItem[];
    created: number;
    message?: string;
    updated: number;
    expires: number;
    escrowEnds?: number;
}

export type OfferArtifact = Pick<
    TradeOffer, 
    "id" | "message" | "state" | "updated" |
    "created" | "expires" | "escrowEnds"
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