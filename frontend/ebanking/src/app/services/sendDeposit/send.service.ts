import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Balance } from 'src/app/common/balance';
import { Send } from 'src/app/common/send';
import { Users } from 'src/app/common/users';
import { environment } from 'src/environments/environment';

let sendURL = "http://localhost:8080/user/send/";
let balance = "http://localhost:8080/user/balance/";

@Injectable({
    providedIn: 'root'
})
export class SendService {

    currentUser: Users;
    headers: HttpHeaders;
    send: Send = new Send();
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

    // balance status   
    getBalanceStatus(): Observable<any> {
        return this.http.get(balance + this.currentUser.userDetails.accountNo, { headers: this.headers });
    }

    sendMoney(send: Send): Observable<Send>{
        return this.http.post<Send>(sendURL + this.currentUserBalance[0].balance + "/" +
        + this.currentUserBalance[0].id + "/" + this.currentUser.email, send);
    }
}
