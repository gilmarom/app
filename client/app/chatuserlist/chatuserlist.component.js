"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import {Component, NgModule, ViewChild, ElementRef, Input, Output, EventEmitter, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ReflectiveInjector} from '@angular/core'
var chat_service_1 = require("../chat/chat.service");
var ChatUserlistComponent = (function () {
    function ChatUserlistComponent(chatService, _cmpFctryRslvr) {
        this.chatService = chatService;
        this._cmpFctryRslvr = _cmpFctryRslvr;
        this.isUserSelected = false;
        this.messages = [];
        this.users = [];
        this.users_messages_map = {};
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            console.log("currentUser " + currentUser.user.username);
            this.ownerName = currentUser.user.username;
        }
    }
    ChatUserlistComponent.prototype.selectUser = function (username) {
        console.log("selected user " + username);
        this.isUserSelected = true;
        this.selectedUsername = username;
        this.messages = this.users_messages_map[username];
    };
    ChatUserlistComponent.prototype.sendMessage = function () {
        var now = new Date().getTime();
        this.chatService.sendMessage({ resivername: this.selectedUsername,
            sendername: this.ownerName,
            text: this.message,
            time: now });
        if (!this.users_messages_map[this.selectedUsername]) {
            this.users_messages_map[this.selectedUsername] = [];
        }
        this.users_messages_map[this.selectedUsername].push({
            text: this.message,
            time: now,
            send: true
        });
        console.log("users_messages_map: " + JSON.stringify(this.users_messages_map));
        this.messages = this.users_messages_map[this.selectedUsername];
        // this.messages.push(this.message);
        this.message = '';
    };
    ChatUserlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.connection = this.chatService.getMessages().subscribe(function (message) {
            console.log("new message : " + JSON.stringify(message));
            if (!_this.users_messages_map[message.sendername]) {
                _this.users_messages_map[message.sendername] = [];
            }
            _this.users_messages_map[message.sendername].push({
                text: message.text,
                time: message.time,
                send: false
            });
            console.log("users_messages_map: " + JSON.stringify(_this.users_messages_map));
            // this.messages = this.users_messages_map[this.selectedUsername];
            console.log(message.sendername, _this.selectedUsername);
            if (message.sendername == _this.selectedUsername) {
                _this.messages = _this.users_messages_map[_this.selectedUsername];
            }
        });
        this.connection = this.chatService.getUsers().subscribe(function (message) {
            switch (message.type) {
                case 'conn':
                    console.log(JSON.stringify(message), 'conn');
                    //todo prevent self add
                    _this.users_messages_map[message.data.name] = [];
                    console.log("users_messages_map: " + JSON.stringify(_this.users_messages_map));
                    _this.users = Object.keys(_this.users_messages_map);
                    break;
                case 'dis':
                    console.log(JSON.stringify(message), 'dis');
                    delete _this.users_messages_map[message.data.name];
                    console.log("users_messages_map: " + JSON.stringify(_this.users_messages_map));
                    _this.users = Object.keys(_this.users_messages_map);
                    break;
                case 'list':
                    console.log(JSON.stringify(message), 'list');
                    var arrayLength = message.data.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var username = message.data[i].name;
                        if (username != _this.ownerName) {
                            _this.users_messages_map[message.data[i].name] = [];
                        }
                    }
                    _this.users = Object.keys(_this.users_messages_map);
                    console.log("users_messages_map: " + JSON.stringify(_this.users_messages_map));
                    break;
            }
        });
    };
    ChatUserlistComponent.prototype.ngOnDestroy = function () {
        this.connection.unsubscribe();
    };
    ChatUserlistComponent.prototype.createChat = function () {
        // let factory = this._cmpFctryRslvr.resolveComponentFactory(ChatComponent);
        // let cmp = this.viewContainer.createComponent(factory);
        // cmp.instance.name = 'peter';
    };
    return ChatUserlistComponent;
}());
ChatUserlistComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'chatuserlist-component',
        templateUrl: 'chatuserlist.component.html',
        styleUrls: ['chatuserlist.component.css'],
        providers: [chat_service_1.ChatService]
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        core_1.ComponentFactoryResolver])
], ChatUserlistComponent);
exports.ChatUserlistComponent = ChatUserlistComponent;
//# sourceMappingURL=chatuserlist.component.js.map