import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../common/users';

let URL = "http://localhost:8080/user/";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    headers: HttpHeaders;
    currentUser: Users;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });
    }

    accountDelete(): Observable<any>{
        return this.http.delete(URL + "account/delete/" + this.currentUser.email, {headers: this.headers});
    }

    sendOtp(user: Users): Observable<any>{
        return this.http.post(URL + "account/otp", user);
    }

    checkOTP(user: Users): Observable<any>{
        return this.http.post(URL + "otp", user);
    }
}
