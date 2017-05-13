import { Component } from '@angular/core';
import { OrderService } from '../../services/booking.service';
import { Order } from '../../../Order';

@Component({
  moduleId: module.id,
  selector: 'booking',
  templateUrl: 'booking.component.html',
})
export class BookingComponent  {
    orders: Order[];
    title: string;
     
     constructor(private orderService: OrderService){
        this.orderService.getOrders()
            .subscribe(orders => {
                this.orders = orders;
            });
    
 }}