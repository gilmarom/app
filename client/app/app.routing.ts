import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent} from './app.component';
import {AboutComponent} from './components/about.component';
import {TasksComponent} from './components/tasks/tasks.component';
import { BookingComponent }  from './components/booking/booking.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResearchComponent } from './components/research/research.component';
import { AuthGuard } from './guards/auth.guard';
import { FindingComponent } from './components/analytics/finding.component';

const appRoutes: Routes = [
   { path: '' , component: TasksComponent },
   { path: 'home' , component: TasksComponent },
   { path: 'about', component: AboutComponent },
   { path: 'booking', component: BookingComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'login', component: LoginComponent },
   { path: 'researchs', component: ResearchComponent },
   { path: 'findings', component: FindingComponent }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
