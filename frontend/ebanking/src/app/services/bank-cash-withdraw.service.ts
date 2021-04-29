import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Balance } from '../common/balance';
import { BankWithdraw } from '../common/bank-withdraw';
import { Users } from '../common/users';

let bankCash = "http://localhost:8080/user/withdraw/cash/";
let balance = "http://localhost:8080/user/balance/";

@Injectable({
    providedIn: 'root'
})
export class BankCashWithdrawService {

    currentUser: Users;
    headers: HttpHeaders;
    bankWithdraw: BankWithdraw = new BankWithdraw();
    currentUserBalance: Balance;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });

        this.getBalanceStatus().subscribe(data => {
            this.currentUserBalance = data;
        });
    }

    getBalanceStatus(): Observable<any> {
        return this.http.get(balance + this.currentUser.userDetails.accountNo, { headers: this.headers });
    }

    sendBankCash(bankWithdraw: BankWithdraw): Observable<BankWithdraw> {
        return this.http.put<BankWithdraw>(bankCash + this.currentUserBalance[0].balance + "/" +
            + this.currentUserBalance[0].id + "/" + this.currentUser.email, bankWithdraw);
    }
}
