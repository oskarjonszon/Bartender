import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap, shareReplay } from 'rxjs/internal/operators';
import * as moment from 'moment';

interface Token 
{
    id : string
    expires : string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService 
{
    constructor(private http: HttpClient) { }
    
    login(username : string, password : string) 
	{
        return this.http.post<Token>("http://127.0.0.1:5000/token", {username, password})
        .pipe(
            tap(res => this.setSession(res)), 
            shareReplay());
	}

	private setSession(authResult : Token) 
	{
        const expiresAt = moment().add(authResult.expires,'second');
        localStorage.setItem('id_token', authResult.id);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
	}     
	
	logout() 
	{
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
	}
	
	public isLoggedIn() 
	{
        return moment().isBefore(this.getExpiration());
    }

	isLoggedOut() 
	{
        return !this.isLoggedIn();
    }

    getUsername() 
    {
        let token = localStorage.getItem("id_token");
        let decoded = atob(token.split('.')[1])
        let json = JSON.parse(decoded);
        return json['username'];
    }

	getExpiration() 
	{
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    } 
}
