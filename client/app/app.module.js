"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var tasks_component_1 = require("./components/tasks/tasks.component");
var app_routing_1 = require("./app.routing");
var about_component_1 = require("./components/about.component");
var header_component_1 = require("./header.component");
var booking_component_1 = require("./components/booking/booking.component");
var register_component_1 = require("./components/register/register.component");
var index_1 = require("./services/index");
var login_component_1 = require("./components/login/login.component");
var index_2 = require("./directives/index");
var chat_component_1 = require("./chat/chat.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, app_routing_1.routing, forms_1.FormsModule],
        declarations: [
            app_component_1.AppComponent,
            tasks_component_1.TasksComponent,
            about_component_1.AboutComponent,
            booking_component_1.BookingComponent,
            header_component_1.HeaderComponent,
            register_component_1.RegisterComponent,
            login_component_1.LoginComponent,
            index_2.AlertComponent,
            chat_component_1.ChatComponent
        ],
        providers: [
            // AuthGuard,
            index_1.AlertService,
            index_1.AuthenticationService,
            index_1.UserService
            // providers used to create fake backend
            // fakeBackendProvider,
            // MockBackend,
            // BaseRequestOptions
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map