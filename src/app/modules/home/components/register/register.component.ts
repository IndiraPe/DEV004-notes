import { Component, Renderer2, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;
  showPassword = false;
  showMessageErrorEmail:string;
  showMessageErrorPassword:string;
  statusErrorEmail:boolean;
  statusErrorPassword:boolean;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService,
    ) {
    // Formulario reactivo
    this.registerForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(5)]]
    });

    this.showMessageErrorEmail=''
    this.showMessageErrorPassword= '';
    this.statusErrorEmail=false;
    this.statusErrorPassword=false;
  }

  ngOnInit() {
    this.setupInputBlur();
  }

  setupInputBlur() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach((input: any) => {
      this.renderer.listen(input, 'blur', () => {
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

  createAccount() {
    this.authService.register(this.registerForm.value)
      .then(response => {
        localStorage.setItem('uid', response.user.uid);
        localStorage.setItem('email', response.user.email as string);
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.log(error.code);
        if(error.code === 'auth/invalid-email'){
          this.showMessageErrorEmail = 'Correo inválido';
          this.statusErrorEmail=true;
          this.statusErrorPassword=false;
        }else if(error.code === 'auth/missing-password' || error.code === 'auth/weak-password'){
          this.showMessageErrorPassword = 'Contraseña inválida(min 6 caracteres)';
          this.statusErrorPassword=true;
          this.statusErrorEmail=false;
        }else if(error.code === 'auth/email-already-in-use'){
          this.showMessageErrorEmail = 'Correo ya registrado';
          this.statusErrorEmail=true;
          this.statusErrorPassword=false;
        }else{
          this.showMessageErrorPassword = 'Error en el registro';
          this.statusErrorPassword=true;
          this.statusErrorEmail=false;
        }

      });

  }

}
