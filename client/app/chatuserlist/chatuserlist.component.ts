import { Component, OnInit,OnDestroy,ComponentFactoryResolver } from '@angular/core';
//import {Component, NgModule, ViewChild, ElementRef, Input, Output, EventEmitter, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ReflectiveInjector} from '@angular/core'
import { ChatService }       from '../chat/chat.service';

@Component({
  moduleId: module.id,
  selector: 'chatuserlist-component',
  templateUrl: 'chatuserlist.component.html',
  styleUrls: ['chatuserlist.component.css'],
  providers: [ChatService]
})

export class ChatUserlistComponent implements OnInit, OnDestroy {
  ownerName:string;
  isUserSelected: boolean = false;
  selectedUsername: string;
  message;
  messages = [];
  users = [];
  users_messages_map = {};
  connection;

  constructor(
    private chatService:ChatService,
    private _cmpFctryRslvr: ComponentFactoryResolver
  ) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      console.log("currentUser " + currentUser.user.username);
      this.ownerName = currentUser.user.username;
    }
  }

  selectUser(username){
    console.log("selected user " + username);
    this.isUserSelected = true;
    this.selectedUsername = username;
    this.messages = this.users_messages_map[username];
  }

  sendMessage(){
    let now = new Date().getTime();
    this.chatService.sendMessage(
      {resivername:this.selectedUsername,
      sendername:this.ownerName,
      text:this.message,
      time:now}
    );
      if (!this.users_messages_map[this.selectedUsername]){
        this.users_messages_map[this.selectedUsername] = [];
      }

     this.users_messages_map[this.selectedUsername].push(
       {
         text:this.message,
         time:now,
         send:true
       }
     );

    console.log("users_messages_map: "+ JSON.stringify(this.users_messages_map));
    this.messages = this.users_messages_map[this.selectedUsername];
    // this.messages.push(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      console.log("new message : " + JSON.stringify(message));
      if (!this.users_messages_map[message.sendername]){
        this.users_messages_map[message.sendername] = [];
      }
      this.users_messages_map[message.sendername].push(
        {
          text: message.text,
          time: message.time,
          send:false
        }
      );

      console.log("users_messages_map: "+ JSON.stringify(this.users_messages_map));
      // this.messages = this.users_messages_map[this.selectedUsername];
      console.log (message.sendername,this.selectedUsername);
      if (message.sendername == this.selectedUsername){
          this.messages = this.users_messages_map[this.selectedUsername];
      }
    });

    this.connection = this.chatService.getUsers().subscribe(message => {
      switch(message.type){
        case 'conn':
          console.log(JSON.stringify(message),'conn');
          //todo prevent self add
          this.users_messages_map[message.data.name] = [];
          console.log("users_messages_map: "+ JSON.stringify(this.users_messages_map));
          this.users = Object.keys(this.users_messages_map);
        break;
        case 'dis':
          console.log(JSON.stringify(message),'dis');
          delete this.users_messages_map[message.data.name];
          console.log("users_messages_map: "+ JSON.stringify(this.users_messages_map));
          this.users = Object.keys(this.users_messages_map);
        break;
        case 'list':
          console.log(JSON.stringify(message),'list');
          var arrayLength = message.data.length;
          for (var i = 0; i < arrayLength; i++) {
            let username =message.data[i].name;
            if(username != this.ownerName){
                this.users_messages_map[message.data[i].name] = [];
            }
          }
          this.users = Object.keys(this.users_messages_map);
          console.log("users_messages_map: "+ JSON.stringify(this.users_messages_map));
        break;
      }
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  createChat(){
    // let factory = this._cmpFctryRslvr.resolveComponentFactory(ChatComponent);
    // let cmp = this.viewContainer.createComponent(factory);
    // cmp.instance.name = 'peter';
  }
}
