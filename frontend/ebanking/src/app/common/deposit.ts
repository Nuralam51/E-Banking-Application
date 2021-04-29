export class Deposit {
    id: number;
    accountNo: BigInteger;
    sendAccountNo: BigInteger;
    receiveAccountNo: BigInteger;
    amount: number;
    receiveDate: Date = new Date();
    status: number;
}
