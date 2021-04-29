import { Bankaccount } from "./bankaccount";

export class CardAccount {
    id: number;
    name: string;
    accountNo: BigInteger;
    nid: number;
    cardNo: number;
    cardDate: Date;
    cardPin: number;
    type: string;
    status: number;
    createDate: Date;
}
