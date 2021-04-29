import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './common/role';
import { Users } from './common/users';
import { BalanceService } from './services/balance.service';
import { LoginService } from './services/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'E Banking Application';

    currentUser: Users;

    constructor(private loginService: LoginService, private router: Router) {
        this.loginService.currentUser.subscribe(data => {
            this.currentUser = data;
        });
    }

    logout() {
        this.loginService.logOut().subscribe(data => {
            this.router.navigate(['/login']);
        });
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.ADMIN;
    }

    get isUser() {
        return this.currentUser && this.currentUser.role === Role.USER;
    }

}
