export class Mobilewithdraw {
    id: number;
    accountNo: BigInteger;
    type: string = "Mobile Banking";
    withdrawType: string;
    phone: string;
    amount: number;
    dateTime: Date = new Date();
}
