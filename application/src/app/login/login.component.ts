import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service'

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
	form : FormGroup;

	constructor(private fb : FormBuilder, private authService : AuthService, private router : Router) 
	{
		this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
	}

  	ngOnInit(): void { }

  	login()
  	{
		const val = this.form.value;

		if (val.username && val.password) 
		{
            this.authService.login(val.username, val.password)
				.subscribe(() => 
				{ 
					this.router.navigate([''])
				}
			);
        }
  	}

}
