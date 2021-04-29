import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../common/users';

let URL = "http://localhost:8080/admin/";
let acceptURL = "http://localhost:8080/admin/withdraw/save/"
let deleteURL = "http://localhost:8080/admin/withdraw/delete/"

@Injectable({
    providedIn: 'root'
})
export class AdminWithdrawService {

    currentUser: Users;
    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });
    }

    getWithdrawRequest(): Observable<any> {
        return this.http.get(URL + "withdraw/request", { headers: this.headers });
    }

    acceptBankWithdrawRequest(id: number, accountNo: BigInteger, amount: number): Observable<any> {
        return this.http.post(acceptURL + id + "/" + accountNo + "/" + amount, null);
    }

    denyBankWithdrawRequest(id: number, accountNo: BigInteger, amount: number): Observable<any> {
        return this.http.post(deleteURL + id + "/" + accountNo + "/" + amount, null);
    }
}
