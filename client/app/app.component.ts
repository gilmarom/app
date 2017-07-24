import { Component,  } from '@angular/core';
import { TaskService } from './services/task.service';
import { HeaderComponent } from './header.component';
import { OrderService } from './services/booking.service';
import { AuthenticationService } from './services/index';
import { ResearchService  } from './services/research.service';
import { FindingService } from './services/finding.service';
import { MyFilterPipe}  from './data-filter.pipe';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[TaskService, ResearchService, OrderService, FindingService ],
  
})

export class AppComponent {
  public isAuthenticated: boolean = false;
  constructor(
    private authService:AuthenticationService
  ){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      this.isAuthenticated = true;
    }else{
      this.authService.subscribe(
        ()=>{
          this.isAuthenticated = true;
        }
      );
    }
  }
}
