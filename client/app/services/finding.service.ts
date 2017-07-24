import {Injectable, Component, Input} from '@angular/core';
import {Http, Headers, RequestOptions,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Finding } from '../../Finding';

@Injectable()
export class FindingService{
    constructor(private http:Http){
        
        console.log('finding Service Initialized...');       
 }
    getFindings(){
        return this.http.get('/api/findings',this.jwt())
            .map(res => res.json());
    } 
    
    getJSON() : Observable<Finding[]> {
         let requestOpt = this.jwt();
         requestOpt.headers.append('Content-Type', 'application/json');
         return this.http.get("/api/findings", requestOpt)
                         .map((response: Response) => response.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }
    
    private handleError(error: Response) {
            console.log(error);
            return Observable.throw(error.json().error || 'Internal Server error');
    }
    
    searchFinding(newSearch){
        let requestOpt = this.jwt();
        requestOpt.headers.append('Content-Type', 'application/json');
        return this.http.post('/api/findings', JSON.stringify(newSearch), requestOpt)
            .map(res => res.json());
    }
    
    // private helper methods
    
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}