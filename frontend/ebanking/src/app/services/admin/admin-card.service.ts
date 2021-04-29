import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { CardAccount } from 'src/app/common/card-account';
import { Users } from 'src/app/common/users';
import { environment } from 'src/environments/environment';

let User_URL = "http://localhost:8080/admin/card/request/";
let saveCard = "http://localhost:8080/admin/card/save/"
let deleteCard = "http://localhost:8080/admin/card/delete/"

@Injectable({
    providedIn: 'root'
})
export class AdminCardService {

    cardAccount: CardAccount = new CardAccount();
    currentUser: Users;
    headers: HttpHeaders;
    responseType: ResponseType;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });
    }

    getCardRequest(): Observable<any> {
        return this.http.get(User_URL, { headers: this.headers });
    }

    saveCardRequest(id: number, cardUserAcc: BigInteger): Observable<any> {
        return this.http.post(saveCard + id + "/" + cardUserAcc, null);
    }

    deleteCardRequest(id: number, cardUserAcc: BigInteger): Observable<any> {
        console.log(id, cardUserAcc);
        return this.http.delete<any>(deleteCard + id + "/" + cardUserAcc, {headers: this.headers});
    }
}
