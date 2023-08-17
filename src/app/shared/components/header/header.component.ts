import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logOut(){
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/home']);
        localStorage.removeItem('uid')
        localStorage.removeItem('email')
      })
      .catch(error => console.log(error));
  }
}
