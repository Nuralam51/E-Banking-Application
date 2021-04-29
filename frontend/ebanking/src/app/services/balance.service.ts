import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Balance } from '../common/balance';
import { Users } from '../common/users';

let balance = "http://localhost:8080/user/balance/";

@Injectable({
    providedIn: 'root'
})
export class BalanceService {

    headers: HttpHeaders;
    currentUser: Users;
    balance: Balance = new Balance();

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });
    }

    getBalanceStatus(): Observable<any>{
        return this.http.get(balance + this.currentUser.userDetails.accountNo, {headers: this.headers});
    }
}
