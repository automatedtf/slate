import { OfferArtifact, TradeOffer } from './types';
import { Backpack, getTF2Backpack } from '@automatedtf/sherpa';
const SteamID = require("steamid");

export async function parseToOfferArtifact(steamid: string, offer: TradeOffer): Promise<OfferArtifact> {
    let ourBackpack: Backpack, theirBackpack: Backpack;
    let partner: string = SteamID.fromIndividualAccountID(offer.partner.accountid).getSteamID64();

    try {
        if (offer.itemsToGive.length != 0) ourBackpack = await getTF2Backpack(partner);
        if (offer.itemsToReceive.length != 0) theirBackpack = await getTF2Backpack(offer.partner.accountid);
    } catch (error) {
        // TODO: error catch on private backpack
    }
    
    return {
        id: offer.id,
        sender: offer.isOurOffer ? steamid : partner,
        recipient: offer.isOurOffer ? partner : steamid,
        state: offer.state,
        itemsSending: offer.itemsToGive.map(item => ourBackpack.getItemByAssetId(item.assetid)),
        itemsReceiving: offer.itemsToReceive.map(item => theirBackpack.getItemByAssetId(item.assetid)),
        created: offer.created,
        updated: offer.updated,
        expires: offer.expires
    };
}