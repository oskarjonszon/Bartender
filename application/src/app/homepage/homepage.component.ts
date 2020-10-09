import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit 
{

	constructor(private auth : AuthService) { }

  	ngOnInit(): void {}

  	isLoggedIn()
  	{
    	return this.auth.isLoggedIn();
  	}
}
