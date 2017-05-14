import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService {
  private url = 'http://localhost:3000';
  private socket;

  sendMessage(message){
    console.log(message);
    this.socket.emit('add-message', message);
  }

  getUsers(){
    console.log("get Users");
    let observable = new Observable(observer => {
      if(!this.socket){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
          this.socket = io(this.url,{query: 'token=' + currentUser.token});
        }
      }
      this.socket.on('user_connect', function(data){
        console.log("Connection " + data);
        observer.next({type:'conn',data:data});
      });
      this.socket.on('user_disconnect', function(data){
        console.log("Disconnect "+ data);
        observer.next({type:'dis',data:data});
      });
      this.socket.on('userlist',function(data){
        observer.next({type:'list',data:data});
        observer.next(data);
      });
      this.socket.on("unauthorized", function(error) {
        if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
          // redirect user to login page perhaps?
          console.log("User's token has expired");
        }
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getMessages() {
    console.log("get Messages");
    let observable = new Observable(observer => {
      if(!this.socket){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
          this.socket = io(this.url,{query: 'token=' + currentUser.token});
        }
      }
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
