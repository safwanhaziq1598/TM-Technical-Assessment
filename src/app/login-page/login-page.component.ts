import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

//Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatInput } from '@angular/material/input';

//Services
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  submitLogin() {
    try {
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          if (res.success) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('tokenExpiry', res.tokeExpiry);
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
