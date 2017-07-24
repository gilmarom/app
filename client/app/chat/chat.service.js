"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var io = require("socket.io-client");
var ChatService = (function () {
    function ChatService() {
        this.url = 'http://localhost:3000';
    }
    ChatService.prototype.sendMessage = function (message) {
        console.log(message);
        this.socket.emit('add-message', message);
    };
    ChatService.prototype.getUsers = function () {
        var _this = this;
        console.log("get Users");
        var observable = new Observable_1.Observable(function (observer) {
            if (!_this.socket) {
                var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser && currentUser.token) {
                    _this.socket = io(_this.url, { query: 'token=' + currentUser.token });
                }
            }
            _this.socket.on('user_connect', function (data) {
                console.log("Connection " + data);
                observer.next({ type: 'conn', data: data });
            });
            _this.socket.on('user_disconnect', function (data) {
                console.log("Disconnect " + data);
                observer.next({ type: 'dis', data: data });
            });
            _this.socket.on('userlist', function (data) {
                observer.next({ type: 'list', data: data });
                observer.next(data);
            });
            _this.socket.on("unauthorized", function (error) {
                if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
                    // redirect user to login page perhaps?
                    console.log("User's token has expired");
                }
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    ChatService.prototype.getMessages = function () {
        var _this = this;
        console.log("get Messages");
        var observable = new Observable_1.Observable(function (observer) {
            if (!_this.socket) {
                var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser && currentUser.token) {
                    _this.socket = io(_this.url, { query: 'token=' + currentUser.token });
                }
            }
            _this.socket.on('message', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map