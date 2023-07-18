import { Component, Renderer2, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2
    ) {
    // Formulario reactivo
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(5)]]
    });
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

  //Mostrar y ocultar contraseña
  showPassword = false;
  toggleShow() {
    this.showPassword = !this.showPassword;
  }

}
