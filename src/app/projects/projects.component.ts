import { Component, OnInit } from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent{
  protected faPlus;
  protected createOpen:boolean;

  constructor(){
    this.faPlus = faPlus;
    this.createOpen = false;
  }
  
  handleCreate(): void{
    this.createOpen = !this.createOpen;
    console.log(this.createOpen);
  }
}
