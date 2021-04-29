export class BankWithdraw {
    id: number;
    accountNo: BigInteger;
    receiverName: string;
    receiverNID: string;
    receiverPhone: string;
    amount: BigInteger;
    type: string = "Bank Cash";
    withdrawDate: Date = new Date;
    status: number = 0;
}
