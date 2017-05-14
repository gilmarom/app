import { Component } from '@angular/core';
import {TaskService} from './services/task.service';
import { HeaderComponent } from './header.component';
import { OrderService } from './services/booking.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[TaskService, OrderService]
})

export class AppComponent {
  public isAuthenticated: boolean = false;
}
