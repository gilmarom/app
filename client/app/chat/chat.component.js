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
var chat_service_1 = require("./chat.service");
// import $ from '../bower_components/jquery';
var ChatComponent = (function () {
    function ChatComponent(chatService) {
        this.chatService = chatService;
        this.messages = [];
    }
    ChatComponent.prototype.sendMessage = function () {
        this.chatService.sendMessage(this.message);
        this.message = '';
    };
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.connection = this.chatService.getMessages().subscribe(function (message) {
            _this.messages.push(message);
        });
        // $(document).on('click', '.panel-heading span.icon_minim', function (e) {
        //     var $this = $(this);
        //     if (!$this.hasClass('panel-collapsed')) {
        //         $this.parents('.panel').find('.panel-body').slideUp();
        //         $this.addClass('panel-collapsed');
        //         $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
        //     } else {
        //         $this.parents('.panel').find('.panel-body').slideDown();
        //         $this.removeClass('panel-collapsed');
        //         $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        //     }
        // });
        // $(document).on('focus', '.panel-footer input.chat_input', function (e) {
        //     var $this = $(this);
        //     if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        //         $this.parents('.panel').find('.panel-body').slideDown();
        //         $('#minim_chat_window').removeClass('panel-collapsed');
        //         $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
        //     }
        // });
        // $(document).on('click', '#new_chat', function (e) {
        //     var size = $( ".chat-window:last-child" ).css("margin-left");
        //     var size_total = parseInt(size) + 400;
        //     alert(size_total);
        //     var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
        //     clone.css("margin-left", size_total);
        // });
        // $(document).on('click', '.icon_close', function (e) {
        //     //$(this).parent().parent().parent().parent().remove();
        //     $( "#chat_window_1" ).remove();
        // });
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        this.connection.unsubscribe();
    };
    return ChatComponent;
}());
ChatComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'chat-component',
        templateUrl: 'chat.component.html',
        styleUrls: ['chat.component.css'],
        providers: [chat_service_1.ChatService]
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map