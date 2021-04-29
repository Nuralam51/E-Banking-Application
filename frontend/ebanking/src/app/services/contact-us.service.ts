import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mail } from '../common/mail';
import { Users } from '../common/users';

let URl = "http://localhost:8080/user/";

@Injectable({
    providedIn: 'root'
})
export class ContactUsService {

    mail: Mail = new Mail();
    currentUser: Users;
    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: "Bearer " + this.currentUser.token,
            "Content-Type": "application/json; charset-UTF-8"
        });
    }

    sendMail(mail: Mail): Observable<Mail> {
        return this.http.post<Mail>(URl + "mail", mail);
    }

}
