import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../common/users';

let URL = "http://localhost:8080/user/forget-password"

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {

    currentUser: Users;
    headers: HttpHeaders;
    
    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });
    }

    sendResetPasswordLink(users: Users): Observable<Users>{
        return this.http.post<Users>(URL, users);
    }
}
