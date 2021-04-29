import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bankaccount } from '../common/bankaccount';
import { Users } from '../common/users';
import { RegisterComponent } from '../components/register/register.component';

let URL = "http://localhost:8080/user/";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    currentBankAccount: Bankaccount;
    headers: HttpHeaders;

    constructor(private http: HttpClient) { }

    verify(bankAccount: Bankaccount): Observable<any>{
        return this.http.post(URL + "verify", bankAccount);
    }

    register(user: Users): Observable<any>{
        return this.http.post(URL + "register", user);
    }

    checkOTP(user: Users): Observable<any>{
        return this.http.post(URL + "otp", user);
    }
}
