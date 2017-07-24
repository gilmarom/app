"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var about_component_1 = require("./components/about.component");
var tasks_component_1 = require("./components/tasks/tasks.component");
var booking_component_1 = require("./components/booking/booking.component");
var register_component_1 = require("./components/register/register.component");
var login_component_1 = require("./components/login/login.component");
var research_component_1 = require("./components/research/research.component");
var finding_component_1 = require("./components/analytics/finding.component");
var appRoutes = [
    { path: '', component: tasks_component_1.TasksComponent },
    { path: 'home', component: tasks_component_1.TasksComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'booking', component: booking_component_1.BookingComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'researchs', component: research_component_1.ResearchComponent },
    { path: 'findings', component: finding_component_1.FindingComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map