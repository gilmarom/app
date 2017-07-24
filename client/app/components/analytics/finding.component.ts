import { Component, Inject, Pipe, PipeTransform, OnInit, NgModule } from '@angular/core';
import { FindingService } from '../../services/finding.service';
import { Finding } from '../../../Finding';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concatMap';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'findings',
  templateUrl: 'finding.component.html',
})

export class FindingComponent implements OnInit  {
    games: [{
         game: string,
         platform : string,
         release : string,
         price : number
    }];
   
    findings: Finding[];
    title: string;
     
    constructor(private findingService: FindingService ){ }
         ngOnInit(){
             this.loadResults()
         } 
         
        loadResults(){

        this.findingService.getJSON()
        .subscribe( findings => this.findings = findings,
         err => {   // Log errors if any
         console.log(err);                
                });     
        }        
}
        
      

       
        
       

       


 