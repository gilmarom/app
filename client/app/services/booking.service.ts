import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService{
    constructor(private http:Http){
        console.log('orders Service Initialized...');
    }
        getOrders(){
        return this.http.get('/api/orders')
            .map(res => res.json());
    } 

}


