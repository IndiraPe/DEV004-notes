import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  statusLogin:boolean
  statusRegister:boolean

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.statusLogin = true
    this.statusRegister = false
  }

  onChangeClassLogin(){
    this.statusLogin = true
    this.statusRegister = false

  }

  onChangeClassRegister(){
    this.statusLogin = false
    this.statusRegister = true

  }

  loginGoogle(){
    this.authService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      })
      .catch(error => console.log(error))
  }

}
