export class Send {
    id: number;
    name: string;
    accountNo: BigInteger;
    sendAccountNo: BigInteger;
    receiveAccountNo: BigInteger;
    amount: number;
    sendingDate: Date = new Date();
    status: number;
}
