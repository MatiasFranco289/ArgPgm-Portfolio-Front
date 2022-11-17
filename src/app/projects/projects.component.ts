import { Component } from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent{
  protected faPlus;
  protected createOpen:boolean;
  protected projects:Array<number>;//Feel fre to change this shit

  constructor(){
    this.faPlus = faPlus;
    this.createOpen = false;
    this.projects = [1,2,3];
  }
  
  handleCreate(): void{
    this.createOpen = !this.createOpen;
  }
}
