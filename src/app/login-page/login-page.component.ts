import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

//Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

//Services
import { AuthService } from '../../service/auth.service';
import { UserLoginResponse } from '../../models/user';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  //Submit login credentials to api
  //If success, it will navigate to homepage
  submitLogin() {
    try {
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          if (res.success) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('tokenExpiry', res.tokeExpiry);
            this.router.navigate(['/home/product']);
          } else {
            console.error('Login failed: Invalid credentials');
          }
        },
        (error) => {
          console.error('Login failed: ', error);
        }
      );
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}
