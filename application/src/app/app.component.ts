import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bartender';

  constructor(private auth : AuthService) {}

  isLoggedIn() 
  {
    return this.auth.isLoggedIn();
  }

  logout()
  {
    this.auth.logout();
  }

  getUsername()
  {
    return this.auth.getUsername();
  }
}
