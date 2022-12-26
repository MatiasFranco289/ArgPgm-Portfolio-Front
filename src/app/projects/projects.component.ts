import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons'

interface Idelete{
  id: number,
  tablename: string
}

interface Iskill{
  id_skill: number,
  skill_name: string,
  percentaje: number
}

interface Iproject{
  id_project?: number,
  title: string,
  dateInit: string,
  dateFinish: string,
  description: string,
  urlGit: string,
  urlDeploy?: string,
  urlVideo?: string,
  urlImage?: string,
  skills: Array<Iskill>
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit{
  protected faPlus;
  protected projects:Array<Iproject>;
  protected deleteModal:Idelete;
  protected editPopUp:Iproject;

  constructor(private http: HttpClient){
    this.faPlus = faPlus;
    this.projects = [];
    this.deleteModal = {id:-1,tablename:''}
    this.editPopUp = {
      id_project: -2,
      title: "",
      dateInit: "",
      dateFinish: "",
      description: "",
      urlGit: "",
      urlDeploy: "",
      urlVideo: "",
      urlImage: "",
      skills: []
    };
  }
  
  ngOnInit(): void {
      this.http.get("http://localhost:8080/projects")
      .subscribe((res) => {
        this.projects = res as Array<Iproject>;
      })
  }

  handleDelete(deleteInfo:Idelete):void{
    this.deleteModal = deleteInfo;
  }

  handleCreate(projectInfo: Iproject){
    this.editPopUp = projectInfo;
  }
}
