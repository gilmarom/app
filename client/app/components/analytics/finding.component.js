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
var finding_service_1 = require("../../services/finding.service");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/concatMap");
var FindingComponent = (function () {
    function FindingComponent(findingService) {
        this.findingService = findingService;
    }
    FindingComponent.prototype.ngOnInit = function () {
        this.loadResults();
    };
    FindingComponent.prototype.loadResults = function () {
        var _this = this;
        this.findingService.getJSON()
            .subscribe(function (findings) { return _this.findings = findings; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    return FindingComponent;
}());
FindingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'findings',
        templateUrl: 'finding.component.html',
    }),
    __metadata("design:paramtypes", [finding_service_1.FindingService])
], FindingComponent);
exports.FindingComponent = FindingComponent;
//# sourceMappingURL=finding.component.js.map