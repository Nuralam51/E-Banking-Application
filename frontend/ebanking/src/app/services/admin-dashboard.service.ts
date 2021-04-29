import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../common/users';

let User_URL = "http://localhost:8080/admin/";

@Injectable({
    providedIn: 'root'
})
export class AdminDashboardService {

    currentUser: Users;
    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });
    }

    findAllUser(): Observable<any> {
        return this.http.get(User_URL + "user", {headers: this.headers});
    }

    findAllBankUser(): Observable<any> {
        return this.http.get(User_URL + "bankUser", {headers: this.headers});
    }
}
