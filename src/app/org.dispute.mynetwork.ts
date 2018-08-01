import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.dispute.mynetwork{
   export enum Status {
      Pendingtransaction,
      Disputeinitiated,
      AcquirerApproved,
      ReceivedmerchantCredit,
   }
   export enum Currency {
      EURO,
      STERLING,
      USD,
      YEN,
      CHF,
      CAD,
      Bitcoin,
      Ethereum,
   }
   export class Rule {
      ruleId: string;
      ruleText: string;
   }
   export class Address {
      city: string;
      country: string;
      street: string;
   }
   export class onlineshippingAddress {
      ShiptoAddress: string;
      ShipDate: Date;
      StoreID: string;
      IPAddress: string;
      EmailAddress: string;
   }
   export class Trans {
      TransactionDate: Date;
      TransactionPostedDate: Date;
      TransactionDescription: string;
      TransactionAmount: number;
      TransactionMethod: string;
   }
   export class Card {
      CardType: string;
      AuthorizationCode: string;
      CardNumber: number;
      CreditCardMethod: string;
   }
   export class InquiryStatus {
      InquiryStatus: string;
      InquiryReason: string;
      Outcome: string;
      IsoCode: string;
   }
   export class Transfer extends Asset {
      assetId: string;
      owner: CardMember;
      value: number;
      merchant: Merchant;
      cardmember: CardMember;
      transactionDetails: Trans;
      status: Status;
      cardDetails: Card;
      inquirystatus: InquiryStatus;
      issuerbank: IssuerBank;
      acquirerbank: AcquirerBank;
   }
   export abstract class Bank extends Participant {
      bankID: string;
      RoutingNumber: number;
      CheckingAccountNumber: number;
      Bankname: string;
      address: Address;
   }
   export abstract class SampleParticipant extends Participant {
      participantId: string;
      firstName: string;
      lastName: string;
      valueBal: number;
      address: Address;
      bank: Bank;
   }
   export class Merchant extends SampleParticipant {
      currency: Currency;
   }
   export class CardMember extends SampleParticipant {
      cardDetails: Card[];
   }
   export class IssuerBank extends Bank {
   }
   export class AcquirerBank extends Bank {
   }
   export class BankEmployee extends SampleParticipant {
   }
   export class SampleTransaction extends Transaction {
      assetId: string;
      asset: Transfer;
      owner: CardMember;
      value: number;
      merchant: Merchant;
      cardmember: CardMember;
      transactionDetails: Trans;
      status: Status;
      cardDetails: Card;
      inquirystatus: InquiryStatus;
      issuerbank: IssuerBank;
      acquirerbank: AcquirerBank;
      newValue: number;
   }
   export class EventTransaction extends Event {
      asset: Transfer;
      oldValue: number;
      newValue: number;
   }
   export class IssuerDisputes extends Transaction {
      asset: Transfer;
      newValue: number;
      inquirystatus: InquiryStatus;
      status: Status;
   }
   export class EventIssuerDisputes extends Event {
      asset: Transfer;
      oldValue: number;
      newValue: number;
      status: Status;
   }
   export class AquirerDisputes extends Transaction {
      asset: Transfer;
      status: Status;
   }
   export class EventAquirerDisputes extends Event {
      asset: Transfer;
      status: Status;
   }
   export class MerchantCredit extends Transaction {
      asset: Transfer;
      newValue: number;
      status: Status;
   }
   export class EventMerchantCredit extends Event {
      asset: Transfer;
      oldValue: number;
      newValue: number;
   }
// }
