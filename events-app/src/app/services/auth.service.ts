import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _url = 'http://localhost:3000/api';

	constructor(private http: HttpClient, private router: Router) {

	}

	register(user: User) {
		return this.http.post<any>(`${this._url}/register`, user);
	}

	login(user: User) {
		return this.http.post<any>(`${this._url}/login`, user);
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}

	loggedIn() {
		return !!localStorage.getItem('token');
	}

	getToken() {
		return localStorage.getItem('token');
	}

}
