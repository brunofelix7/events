import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user: User;

	constructor(private authService: AuthService, private router: Router) {
		this.user = new User();
	}

	ngOnInit() {

	}

	login() {
		this.authService.login(this.user).subscribe(
			res => {
				console.log(res);
				localStorage.setItem('token', res.token);
				this.router.navigate(['/events']);
			},
			error => console.log(error)
		)
	}

}
