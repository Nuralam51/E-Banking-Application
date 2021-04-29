import { Balance } from './balance';
import { CardAccount } from './card-account';

export class Bankaccount {
    id: number;
    name: string;
    accountNo: BigInteger;
    oAccountNo: BigInteger;
    phone: string;
    dateOfBirth: Date;
    status: number;
    nid: number;
    address: string;
    openingDate: Date;
    balanceDetails: Balance;
    cardDetails: CardAccount;
}
