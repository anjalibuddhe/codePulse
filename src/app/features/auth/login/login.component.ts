import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
model:LoginRequest;

constructor(private authService:AuthService,private router:Router,private cookieService:CookieService){
  this.model = {
    email: '',
    password: ''
  };
}

onFormSubmit(): void {
  this.authService.login(this.model)
  .subscribe({
    next: (response) => {
     // console.log(response)
      // Set Auth Cookie
      this.cookieService.set('Authorization', `Bearer ${response.token}`,
      undefined, '/', undefined, true, 'Strict');

      // Set User
      this.authService.setUser({
        email: response.email,
        roles: response.roles
      });

      // Redirect back to Home
      this.router.navigateByUrl('/');

    }
  });
}
}