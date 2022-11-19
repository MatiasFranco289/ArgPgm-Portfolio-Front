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
  protected projects:Array<number>;//Feel free to change this shit
  protected deleteModal:Idelete;
  protected editPopUp:number;

  constructor(){
    this.faPlus = faPlus;
    this.projects = [1,2,3];
    this.deleteModal = {id:-1,tablename:''}
    this.editPopUp = -2;
  }
  

  handleDelete(deleteInfo:Idelete):void{
    this.deleteModal = deleteInfo;
    console.log('Borrar proyecto llamado')
  }

  handleEdit(id: number){
    this.editPopUp = id;
  }
}
