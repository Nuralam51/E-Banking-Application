import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bankaccount } from 'src/app/common/bankaccount';
import { Users } from 'src/app/common/users';

let UserURL = "http://localhost:8080/admin/bankUser/save";

@Injectable({
    providedIn: 'root'
})
export class AdminAddBankService {

    currentUser: Users;
    headers: HttpHeaders;
    bankAccount: Bankaccount = new Bankaccount();

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });
    }

    saveAccount(bankAccount: Bankaccount): Observable<Bankaccount> {
        return this.http.post<Bankaccount>(UserURL, bankAccount);
    }
}
