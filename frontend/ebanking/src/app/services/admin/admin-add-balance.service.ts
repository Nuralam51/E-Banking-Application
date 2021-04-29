import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Balance } from 'src/app/common/balance';
import { Users } from 'src/app/common/users';
import { environment } from 'src/environments/environment';

let balanceURL = "http://localhost:8080/admin/balance/save/";

@Injectable({
    providedIn: 'root'
})
export class AdminAddBalanceService {

    currentUser: Users;
    headers: HttpHeaders;
    balance: Balance = new Balance();

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });
    }

    saveBalance(balance: Balance): Observable<Balance>{
        return this.http.post<Balance>(balanceURL, balance);
    }
}
