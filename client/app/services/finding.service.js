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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/catch");
var Rx_1 = require("rxjs/Rx");
var FindingService = (function () {
    function FindingService(http) {
        this.http = http;
        console.log('finding Service Initialized...');
    }
    FindingService.prototype.getFindings = function () {
        return this.http.get('/api/findings', this.jwt())
            .map(function (res) { return res.json(); });
    };
    FindingService.prototype.getJSON = function () {
        var requestOpt = this.jwt();
        requestOpt.headers.append('Content-Type', 'application/json');
        return this.http.get("/api/findings", requestOpt)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    FindingService.prototype.handleError = function (error) {
        console.log(error);
        return Rx_1.Observable.throw(error.json().error || 'Internal Server error');
    };
    FindingService.prototype.searchFinding = function (newSearch) {
        var requestOpt = this.jwt();
        requestOpt.headers.append('Content-Type', 'application/json');
        return this.http.post('/api/findings', JSON.stringify(newSearch), requestOpt)
            .map(function (res) { return res.json(); });
    };
    // private helper methods
    FindingService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return FindingService;
}());
FindingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FindingService);
exports.FindingService = FindingService;
//# sourceMappingURL=finding.service.js.map