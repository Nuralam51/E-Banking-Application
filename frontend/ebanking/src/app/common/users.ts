import { Bankaccount } from './bankaccount';
import { Role } from './role';

export class Users {
    id: number;
    username: string;
    accountNo: BigInteger;
    email: string;
    password: string;
    role: Role;
    status: number;
    createdDate: Date = new Date();
    resetPasswordToken: string;
    token: any;
    otp: string;
    userDetails: Bankaccount;
}
