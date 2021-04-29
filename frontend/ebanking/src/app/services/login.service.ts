import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from '../common/users';
import { environment } from 'src/environments/environment';

let URL = "http://localhost:8080/user/";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public currentUser: Observable<Users>;
    private currentUserSubject: BehaviorSubject<Users>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Users {
        return this.currentUserSubject.value;
    }

    login(user: Users): Observable<any> {
        const headers = new HttpHeaders({
            authorization: 'Basic ' + btoa(user.email + ':' + user.password)
        });
        return this.http.get<any>(URL + "login", { headers: headers }).pipe(
            map(response => {
                if (response) {
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    this.currentUserSubject.next(response);
                }
            })
        );
    }

    logOut(): Observable<any> {
        return this.http.post(URL + "logout", {}).pipe(
            map(response => {
                localStorage.removeItem('currentUser');
                this.currentUserSubject.next(null);
            })
        );
    }

}
