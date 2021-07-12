# Slate

### 📖 Table of Contents
- [👋 Introduction](#-introduction)
- [🔌 Getting Started](#-getting-started)
    - [Parsing to an OfferArtifact](#parsing-to-an-offerartifact)
    - [The OfferArtifact Type](#the-offerartifact-type)
    - [IItemInstance](#iiteminstance)
    - [Information Population with Sherpa](#information-population-with-sherpa)
- [📚 Helpful Resources](#-helpful-resources)
## Introduction

Slate is a simple modular library to represent Steam trade offers using [`@automatedtf/sherpa`](https://github.com/automatedtf/sherpa) in a standardised compact data object called an `OfferArtifact`; this format is optimised for archiving trade offers within a database.

## 🔌 Getting Started
You can install this module with npm within your project by running the command:

```bash
npm install @automatedtf/slate
```

### Parsing to an OfferArtifact 
This module exposes one function: `parseToOfferArtifact`.

```typescript
const steamid: string = "76561198081082634"; // account of perspective offer object is seen from
const offer: TradeOffer = { ... }; // get from steam-tradeoffer-manager

const artifact: OfferArtifact = await parseToOfferArtifact(steamid, offer);
```

### The OfferArtifact Type

The `OfferArtifact` type is the primary datatype you will be working with when interacting with this module.

```typescript
type OfferArtifact = {

    // Carried over from TradeOffer type
    id?: string; // trade offer id
    message?: string; // trade message
    state: OfferState; // see OfferState enum in lib/types.ts

    // Own introduced fields
    created: number; // created at (unix timestamp)
    updated: number;  // last-updated (unix timestamp)
    expires: number; // expires at (unix timestamp)
    escrowEnds?: number; // time escrow complete (unix timestamp)
    sender: string; // steamid of sender
    recipient: string; // steamid of recipient
    itemsSending: IItemInstance[]; // Items being sent away from sender
    itemsReceiving: IItemInstance[]; // Items being received to the sender
} 
```
### IItemInstance
The `itemsSending` and `itemsReceiving` field of `OfferArtifact` are both arrays of objects of the interface `IItemInstance`. This is an interface that mimics the fields of `ItemInstance` from [`@automatedtf/sherpa`](https://github.com/automatedtf/sherpa) through the internal function `extractIItemInterface`.

```typescript
interface IItemInstance {
    appid: number;
    assetid: string;
    instanceid: string;
    classid: string;
    icon_url: string;
    sku: string;
}
```

🔗 [See `@automatedtf/sherpa` ItemInstance](https://github.com/automatedtf/sherpa#iteminstance)

### Information Population with Sherpa
To provide sufficient item details, `@automatedtf/sherpa` is used to populate every item under `itemsSending` and `itemsReceiving`. Originally, the input `TradeOffer` object from [`steam-tradeoffer-manager`](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager) will represent each item within `itemsToGive` and `itemsToReceive` as a `TradeItem`.

```typescript
interface TradeItem {
    appid: number;
    contextid: string;
    assetid: string;
    classid: string;
    instanceid: string;
    ...
    descriptions: any[],
    ...
    tags: any[],
    tradable: boolean,
    ...
}
```

This may be insufficient to developers who may like e.g the `icon_url` of an item to quickly display the item visually on their website without making further API calls on-the-fly.

This is resolved by taking the `TradeOffer` object from and extracting the 
least but necessary fields of a `TradeItem` into an `ItemInstance`, where Sherpa will represent item types and customisations as a single-string `SKU`. Slate then turns this into the data object `IItemInstance` when parsing to an `OfferArtifact`.

## 📚 Helpful Resources
- [@automatedtf/sherpa](https://github.com/automatedtf/sherpa)
- [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager)
