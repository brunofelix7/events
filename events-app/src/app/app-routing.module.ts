import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialComponent } from './components/special/special.component';
import { EventsComponent } from './components/events/events.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
	{ path: '', redirectTo: '/events', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
	{ path: 'special', component: SpecialComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
