import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { SendComponent } from './components/send/send.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { CardComponent } from './components/card/card.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { CardRequestComponent } from './components/admin/card-request/card-request.component';
import { TotalUsersComponent } from './components/admin/total-users/total-users.component';
import { WithdrawRequestComponent } from './components/admin/withdraw-request/withdraw-request.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizesComponent } from './components/unauthorizes/unauthorizes.component';

import { AuthGuard } from './guards/auth-guard'
import { Role } from './common/role';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { RegisterInfoComponent } from './components/register-info/register-info.component';
import { RegisterOtpComponent } from './components/register-otp/register-otp.component';
import { BankcashWithdrawComponent } from './components/bankcash-withdraw/bankcash-withdraw.component';
import { InternationalCardComponent } from './components/international-card/international-card.component';
import { AdminAddBankComponent } from './components/admin/admin-add-bank/admin-add-bank.component';
import { AdminAddBalanceComponent } from './components/admin/admin-add-balance/admin-add-balance.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'register/verify', component: RegisterComponent },
    { path: 'register/info', component: RegisterInfoComponent },
    { path: 'register/otp', component: RegisterOtpComponent },
    { path: 'forget-password', component: ForgetPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'login', component: LoginComponent },

    // for admin
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN] } },
    { path: 'admin/card/request', component: CardRequestComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN] } },
    { path: 'admin/users', component: TotalUsersComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN] } },
    { path: 'admin/withdraw/request', component: WithdrawRequestComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN] } },
    { path: 'admin/bank/add', component: AdminAddBankComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN] } },
    { path: 'admin/balance/add', component: AdminAddBalanceComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN] } },
    // for user
    { path: 'contact', component: ContactusComponent, canActivate: [AuthGuard], data: { roles: [Role.USER] } },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { roles: [Role.USER] } },
    { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard], data: { roles: [Role.USER] } },
    { path: 'card', component: CardComponent, canActivate: [AuthGuard], data: { roles: [Role.USER] } },
    { path: 'send', component: SendComponent, canActivate: [AuthGuard], data: { roles: [Role.USER] } },
    { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard], data: { roles: [Role.USER] } },
    { path: 'deposit', component: DepositComponent, canActivate: [AuthGuard], data: { roles: [Role.USER] } },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.USER] } },
    // for all
    { path: '404', component: NotFoundComponent },
    { path: '401', component: UnauthorizesComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        DepositComponent,
        SendComponent,
        WithdrawComponent,
        CardComponent,
        TransactionsComponent,
        SettingsComponent,
        ContactusComponent,
        AdminDashboardComponent,
        CardRequestComponent,
        TotalUsersComponent,
        WithdrawRequestComponent,
        NotFoundComponent,
        UnauthorizesComponent,
        RegisterInfoComponent,
        RegisterOtpComponent,
        BankcashWithdrawComponent,
        InternationalCardComponent,
        AdminAddBankComponent,
        AdminAddBalanceComponent,
        ForgetPasswordComponent,
        ResetPasswordComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
