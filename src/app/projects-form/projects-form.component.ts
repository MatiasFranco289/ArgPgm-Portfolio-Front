import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Iskill{
  id_skill: number,
  skill_name: string,
  percentaje: number,
  inProject?: boolean
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
  selector: 'projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.css']
})

export class ProjectsFormComponent implements OnInit, OnChanges{
  @Input() popUpState:Iproject;
  @Output() close: EventEmitter<number>;//Esto es un emisor de evento
  protected faXmark;
  protected projectForm:FormGroup;
  protected sendState:string;
  protected allSkills: Array<Iskill>;

  constructor(private http: HttpClient){ 
    this.popUpState = {
      id_project: -2,
      title: "",
      dateInit: "",
      dateFinish: "",
      description: "",
      urlGit: "",
      skills: []
    };
    this.faXmark = faXmark;
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dateInit: new FormControl('', [Validators.required]),
      dateFinish: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      gitUrl: new FormControl('', [Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/), Validators.required]),
      deployUrl: new FormControl('', [Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)]),
      videoUrl: new FormControl('', [Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)]),
      imgUrl: new FormControl('', [Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]),
    })
    this.sendState = '';
    this.close = new EventEmitter<number>();
    this.allSkills = [];
  }

  ngOnInit(): void {
    this.http.get(`${environment.domain}/skills`)
    .subscribe({
      next: (res) => {
        this.allSkills = res as Array<Iskill>
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.popUpState.id_project  && this.popUpState.id_project < 0) return;

    this.projectForm.setValue({
      name: this.popUpState.title,
      dateInit: this.popUpState.dateInit,
      dateFinish: this.popUpState.dateFinish,
      description: this.popUpState.description,
      gitUrl: this.popUpState.urlGit,
      deployUrl: this.popUpState.urlDeploy,
      videoUrl: this.popUpState.urlVideo,
      imgUrl: this.popUpState.urlImage
    })
    //Guardo el id de todas las habilidades en el proyecto
    let ids: Array<number> = this.popUpState.skills.map((skill: Iskill) => {return skill.id_skill});
    //Recorro todas las habilidades y dependiendo de si su id esta contenida en el array ids o no, le asigno un true or false
    this.allSkills = this.allSkills.map((skill: Iskill) => {
      return {...skill, inProject: ids.includes(skill.id_skill)}
    })

  }

  closeForm(event:Event):void{//Cuando tocan el boton de cerrar
    event.preventDefault();
    this.projectForm.setValue({
      name: '',
      dateInit: '',
      dateFinish: '',
      description: '',
      gitUrl: '',
      deployUrl: '',
      videoUrl: '',
      imgUrl: ''
    })
    this.close.emit(-2);
  }

  handleTecnology(e: Event):void{
    /* let target: HTMLButtonElement = e.target as HTMLButtonElement;
    this.tecnologys[target.id] = !this.tecnologys[target.id]; */
    let target: HTMLButtonElement = e.target as HTMLButtonElement;
    let id: number = parseInt(target.id);
    this.allSkills[id].inProject = !this.allSkills[id].inProject;
  }

  closeError():void{//Esto cierra el popUp de errors
    this.sendState = '';
  }

  reload():void{//Este el el boton que da fin a todo y reloadea la pagina para que veas los cambios
    window.location.reload();
  }

  sendForm():string{
    if(this.projectForm.status === 'INVALID') return this.sendState = 'error';//Si hay un error muestro un popUp
    //Si no hay un error por aca deberias hacer el POST o PUT
    this.sendState = 'loading';

    let newProject: Iproject = {
      id_project: this.popUpState.id_project!==-1?this.popUpState.id_project:9999,
      title: this.projectForm.value.name,
      dateInit: this.projectForm.value.dateInit,
      dateFinish: this.projectForm.value.dateFinish,
      description: this.projectForm.value.description,
      urlGit: this.projectForm.value.gitUrl,
      skills: this.allSkills.filter((skill: Iskill) => skill.inProject)
    }

    if(this.projectForm.value.deployUrl) newProject.urlDeploy = this.projectForm.value.deployUrl;
    if(this.projectForm.value.videoUrl) newProject.urlVideo = this.projectForm.value.videoUrl;
    if(this.projectForm.value.imgUrl)  newProject.urlImage = this.projectForm.value.imgUrl;

    this.http.post(`${environment.domain}/projects`, newProject)
    .subscribe({
      next: () => this.sendState = "done",
      error: (err) => console.error("An unexpected error has ocurred while trying to create or update the resource.")
    })

    return '';
  }

}
