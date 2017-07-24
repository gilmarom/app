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
var task_service_1 = require("./services/task.service");
var booking_service_1 = require("./services/booking.service");
var index_1 = require("./services/index");
var research_service_1 = require("./services/research.service");
var finding_service_1 = require("./services/finding.service");
var AppComponent = (function () {
    function AppComponent(authService) {
        var _this = this;
        this.authService = authService;
        this.isAuthenticated = false;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            this.isAuthenticated = true;
        }
        else {
            this.authService.subscribe(function () {
                _this.isAuthenticated = true;
            });
        }
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: 'app.component.html',
        providers: [task_service_1.TaskService, research_service_1.ResearchService, booking_service_1.OrderService, finding_service_1.FindingService]
    }),
    __metadata("design:paramtypes", [index_1.AuthenticationService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map