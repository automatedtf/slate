import { OfferArtifact, EconOffer } from './types';
import { ItemInstance } from '@automatedtf/sherpa';

export function parseToOfferArtifact(offer: EconOffer): OfferArtifact {
    return {
        id: offer.id,
        sender: `${(offer.isOurOffer ? offer.steamid : offer.partner).accountid}`,
        recipient: `${(offer.isOurOffer ? offer.partner : offer.steamid).accountid}`,
        state: offer.state,
        itemsSending: offer.itemsToGive.map(item => new ItemInstance(item)),
        itemsReceiving: offer.itemsToReceive.map(item => new ItemInstance(item)),
        created: offer.created,
        updated: offer.updated,
        expires: offer.expires
    };
}