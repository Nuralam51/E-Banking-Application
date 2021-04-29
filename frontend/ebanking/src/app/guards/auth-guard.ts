import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Users } from "../common/users";

import { LoginService } from '../services/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    currentUser: Users;

    constructor(private router: Router, private loginService: LoginService) {
        this.loginService.currentUser.subscribe(data => {
            this.currentUser = data;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.currentUser) {
            if (route.data.roles && route.data.roles.indexOf(this.currentUser.role) === -1) {
                this.router.navigate(['/401']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/login']);
    }
}
