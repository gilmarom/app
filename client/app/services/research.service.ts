import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ResearchService {
      constructor(private http: Http){
        console.log('Research Service Initialized...');
        
    }

        getResearch(){
            return this.http.get('/api/researchs',this.jwt())
            .map(res => res.json());
        }

  
        private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

}

