import { Component  } from '@angular/core';
import { ResearchService } from '../../services/research.service';
import { Research } from '../../../Research';

@Component({

     moduleId: module.id,
     selector: 'researchs',
     templateUrl: 'research.component.html',
        
})

export class ResearchComponent {
            
            researchs: Research [];
            n = ['gil' , 'dan'];
            constructor( private researchService: ResearchService ){

                this.researchService.getResearch()
                .subscribe( researchs => {
                this.researchs = researchs;
            });
            
            this.n = ['gil' , 'dan'];

                 
            }

}
