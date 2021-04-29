import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Balance } from '../common/balance';
import { Mobilewithdraw } from '../common/mobilewithdraw';
import { Users } from '../common/users';

let Bkash = "http://localhost:8080/user/checkout/payment/b2cPayment/";
let balance = "http://localhost:8080/user/balance/";

@Injectable({
    providedIn: 'root'
})
export class MobileWithdrawService {

    mobileWithdraw: Mobilewithdraw = new Mobilewithdraw();
    currentUser: Users;
    headers: HttpHeaders;
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

    sendMoneyBkash(mobileWithdraw: Mobilewithdraw): Observable<Mobilewithdraw>{
        return this.http.put<Mobilewithdraw>(Bkash + this.currentUserBalance[0].balance + "/"+
                                            + this.currentUserBalance[0].id + "/"+ this.currentUser.email, mobileWithdraw);
    }

    getBalanceStatus(): Observable<any>{
        return this.http.get(balance + this.currentUser.userDetails.accountNo, {headers: this.headers});
    }
    
}
