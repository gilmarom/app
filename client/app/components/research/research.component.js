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
var research_service_1 = require("../../services/research.service");
var ResearchComponent = (function () {
    function ResearchComponent(researchService) {
        var _this = this;
        this.researchService = researchService;
        this.n = ['gil', 'dan'];
        this.researchService.getResearch()
            .subscribe(function (researchs) {
            _this.researchs = researchs;
        });
        this.n = ['gil', 'dan'];
    }
    return ResearchComponent;
}());
ResearchComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'researchs',
        templateUrl: 'research.component.html',
    }),
    __metadata("design:paramtypes", [research_service_1.ResearchService])
], ResearchComponent);
exports.ResearchComponent = ResearchComponent;
//# sourceMappingURL=research.component.js.map