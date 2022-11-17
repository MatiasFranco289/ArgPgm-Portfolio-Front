import { Component } from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons'

interface Idelete{
  id: number,
  tablename: string
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent{
  protected faPlus;
  protected createOpen:boolean;
  protected projects:Array<number>;//Feel fre to change this shit
  protected deleteModal:Idelete;

  constructor(){
    this.faPlus = faPlus;
    this.createOpen = false;
    this.projects = [1,2,3];
    this.deleteModal = {id:-1,tablename:''}
  }
  
  handleCreate(): void{
    this.createOpen = !this.createOpen;
  }

  handleDelete(deleteInfo:Idelete):void{
    this.deleteModal = deleteInfo;
    console.log('Borrar proyecto llamado')
  }
}
