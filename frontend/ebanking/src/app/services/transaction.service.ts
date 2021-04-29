import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../common/users';

let transaction = "http://localhost:8080/user/transaction/";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    currentUser: Users;
    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });
    }

    getAllTransactions(): Observable<any> {
        return this.http.get(transaction + this.currentUser.userDetails.accountNo, {headers: this.headers});
    }
}
