import { OfferArtifact, TradeOffer } from './types';
import { Backpack, getTF2Backpack } from '@automatedtf/sherpa';
const SteamID = require("steamid");

export async function parseToOfferArtifact(steamid: string, offer: TradeOffer): Promise<OfferArtifact> {
    let ourBackpack: Backpack, theirBackpack: Backpack;
    let partner: string = SteamID.fromIndividualAccountID(offer.partner.accountid).getSteamID64();

    try {
        if (offer.itemsToGive.length != 0) ourBackpack = await getTF2Backpack(steamid);
        if (offer.itemsToReceive.length != 0) theirBackpack = await getTF2Backpack(partner);
    } catch (error) {
        // throw error on private backpack
        throw new Error("This user most likely has their inventory to set as private. Unable to populate item details.");
    }
    
    return {
        id: offer.id,
        sender: offer.isOurOffer ? steamid : partner,
        recipient: offer.isOurOffer ? partner : steamid,
        state: offer.state,
        isOurOffer: offer.isOurOffer,
        itemsSending: offer.itemsToGive
            .map(item => ourBackpack.getItemByAssetId(item.assetid)),
        itemsReceiving: offer.itemsToReceive
            .map(item => theirBackpack.getItemByAssetId(item.assetid)),
        created: new Date(offer.created).getTime() / 1000,
        updated: new Date(offer.updated).getTime() / 1000,
        expires: new Date(offer.expires).getTime() / 1000,
        escrowEnds: offer.escrowEnds ? (new Date(offer.escrowEnds).getTime() / 1000) : null
    };
}