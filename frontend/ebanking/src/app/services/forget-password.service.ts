import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../common/users';

let URL = "http://localhost:8080/user/forget-password"
let URLReset = "http://localhost:8080/user/reset-password"

@Injectable({
    providedIn: 'root'
})
export class ForgetPasswordService {

    currentUser: Users;
    headers: HttpHeaders;

    constructor(private http: HttpClient) { }

    sendResetPasswordLink(users: Users): Observable<Users> {
        return this.http.post<Users>(URL, users);
    }

    sendForgetPassword(users: Users, token: string): Observable<Users> {
        return this.http.post<Users>(URLReset + "/" + token, users);
    }
}
