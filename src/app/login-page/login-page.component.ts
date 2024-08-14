import { Component } from '@angular/core';

//Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatInput
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
onAction1: any;

}
