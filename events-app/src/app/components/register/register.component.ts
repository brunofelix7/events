import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	user: User;

	constructor(private authService: AuthService, private router: Router) {
		this.user = new User();
	}

	ngOnInit() { 

	}

	register() {
		this.authService.register(this.user).subscribe(
			res => {
				console.log(res);
				localStorage.setItem('token', res.token);
				this.router.navigate(['/events']);
			},
			error => console.error(error)
		)
	}

}
