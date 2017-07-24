import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
    constructor(private http:Http){
        console.log('Task Service Initialized...');
    }

    getTasks(){
        return this.http.get('/api/tasks',this.jwt())
            .map(res => res.json());
    }
    
    addTask(newTask){
        let requestOpt = this.jwt();
        requestOpt.headers.append('Content-Type', 'application/json');
        return this.http.post('/api/task', JSON.stringify(newTask), requestOpt)
            .map(res => res.json());
    }

    deleteTask(id){
        return this.http.delete('/api/task/'+id,this.jwt())
            .map(res => res.json());
    }

    updateStatus(task){
      let requestOpt = this.jwt();
      requestOpt.headers.append('Content-Type', 'application/json');
        return this.http.put('/api/task/'+task._id, JSON.stringify(task), requestOpt)
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
