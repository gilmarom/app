import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppComponent} from '../app.component';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http,
      // private appComponent:AppComponent
    ) { }

    login(username: string, password: string) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('/api/users/authenticate',
        JSON.stringify({ username: username, password: password }),{headers:headers})
            .map((response: Response) => {
              console.log(response.json());
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    // this.appComponent.isAuthenticated = true;
                }
            });
    }

    getObservable(){
        let observable = new Observable(
          observer => {
            
          }
        );
        return observable;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
