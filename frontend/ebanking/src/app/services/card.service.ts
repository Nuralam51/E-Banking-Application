import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardAccount } from '../common/card-account';
import { Users } from '../common/users';

let shoppingCard = "http://localhost:8080/user/card/";
let cardStatus = "http://localhost:8080/user/card/status/";

@Injectable({
    providedIn: 'root'
})
export class CardService {

    cardAccount: CardAccount = new CardAccount();
    currentUser: Users;
    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });
    }

    sendCardRequest(cardAccount: CardAccount): Observable<CardAccount>{
        return this.http.post<CardAccount>(shoppingCard + this.currentUser.email, cardAccount);
    }

    getCardStatus(){
        return this.http.get(cardStatus + this.currentUser.userDetails.accountNo);
    }

}
