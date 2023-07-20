import { Component, Renderer2, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  showPassword:boolean = false;
  showMessageError:string;
  statusError:boolean;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService,
    ) {
    // Formulario reactivo
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(5)]]
    });

    this.showMessageError=''
    this.statusError=false;
  }

  ngOnInit() {
    this.setupInputBlur();
  }

  setupInputBlur() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach((input: any) => {
      this.renderer.listen(input, 'blur', () => {
        this.statusError=false;
        if (input.value) {
          this.renderer.addClass(input, 'used');
        } else {
          this.renderer.removeClass(input, 'used');
        }
      });
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  loginAccount() {
    this.authService.login(this.loginForm.value)
      .then((response)=> {
        localStorage.setItem('uid', response.user.uid);
        localStorage.setItem('email', response.user.email as string);
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        this.statusError=true;
        this.showMessageError = 'El usuario o la contraseña son incorrectos'
      });

  }

}
