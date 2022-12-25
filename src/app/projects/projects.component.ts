import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

export class ProjectsComponent implements OnInit{
  protected faPlus;
  protected projects:Array<any>;
  protected deleteModal:Idelete;
  protected editPopUp:number;

  constructor(private http: HttpClient){
    this.faPlus = faPlus;
    this.projects = [];
    this.deleteModal = {id:-1,tablename:''}
    this.editPopUp = -2;
  }
  
  ngOnInit(): void {
      this.http.get("http://localhost:8080/projects")
      .subscribe((res) => {
        this.projects = res as Array<any>;
        console.log(this.projects);

      })
  }

  handleDelete(deleteInfo:Idelete):void{
    this.deleteModal = deleteInfo;
    console.log('Borrar proyecto llamado')
  }

  handleEdit(id: number){
    this.editPopUp = id;
  }
}
