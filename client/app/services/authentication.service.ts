import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  private subscribes = [];
    constructor(private http: Http,
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
                    if(this.subscribes){
                      let length = this.subscribes.length;
                      for(var i = 0 ; i< length;i++){
                        this.subscribes[i]();
                      }
                    }
                }
            });
    }

    subscribe(cb){
      console.log("one subscribe");
      if (!this.subscribes){
        this.subscribes = [];
      }
      this.subscribes.push(cb);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
