import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  condition: boolean = false;
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  submitLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['main-window']),
      error: (err) => alert(err.message),
    });
  }

  openSignIn() {
    this.condition = false;
  }

  openLogin() {
    this.condition = true;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        ),
      ]),
    });

    if (this.authService.isLoggedIn()) {  //если пользователь авторизован, его перекидыват на главную
      this.router.navigate(['main-window']);
    }
  }
}
