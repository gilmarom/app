import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { FormsModule} from '@angular/forms';
import { AppComponent} from './app.component';
import { TasksComponent} from './components/tasks/tasks.component';
import { routing } from './app.routing';
import { AboutComponent }  from './components/about.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { BookingComponent } from './components/booking/booking.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertService, AuthenticationService, UserService } from './services/index';
import { LoginComponent} from './components/login/login.component';
import { AlertComponent } from './directives/index';
import { ChatComponent } from './chat/chat.component'
import { ChatUserlistComponent } from './chatuserlist/chatuserlist.component';

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, routing , FormsModule ],
  declarations: [
  AppComponent,
  TasksComponent,
  AboutComponent,
  BookingComponent,
  HeaderComponent,
  RegisterComponent,
  LoginComponent,
  AlertComponent,
  ChatComponent,
  ChatUserlistComponent
  ],
  providers: [
        // AuthGuard,
        AlertService,
        AuthenticationService,
        UserService

        // providers used to create fake backend
        // fakeBackendProvider,
        // MockBackend,
        // BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
