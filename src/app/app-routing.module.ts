import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from 'guard/auth.guard';
import { ForgetComponent } from './reset/forget/forget.component';
import { UpdatepasswordComponent } from './reset/updatepassword/updatepassword.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
{ path: 'login', component: LoginComponent },
 { path: 'register', component: RegisterComponent },
 { path: 'home', component: HomeComponent,canActivate: [authGuard] },
 { path: 'forgot', component: ForgetComponent },
 { path: 'reset/:Token', component: UpdatepasswordComponent },



  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
