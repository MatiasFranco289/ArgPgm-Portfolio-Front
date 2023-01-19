import { Component, Input, Output, EventEmitter} from '@angular/core';
import { faGithub, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { faLink, faCalendar, faFlagCheckered, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

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
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})

export class ProjectCardComponent {
  @Input() projectInfo: Iproject;
  @Output() delete = new EventEmitter<Idelete>();//Emisor de evento para boton borrar
  @Output() edit: EventEmitter<Iproject>;
  protected faGithub;
  protected faLink;
  protected faYoutube;
  protected faCalendar;
  protected faFlagCheckered;
  protected faPen;
  protected faTrash;
  protected defaultImg:string;
  protected logged:boolean;


  constructor(){
    this.faGithub = faGithub;
    this.faLink = faLink;
    this.faYoutube = faYoutube;
    this.defaultImg = 'https://i.ibb.co/yQX0pqk/defaul-Thumbnail.png';
    this.faCalendar = faCalendar;
    this.faFlagCheckered = faFlagCheckered;
    this.faPen = faPen;
    this.faTrash = faTrash;
    this.logged = !!sessionStorage.getItem('logged');
    this.projectInfo = {
      id_project: -2,
      title: "",
      dateInit: "",
      dateFinish: "",
      description: "",
      urlGit: "",
      skills: []
    };
    this.edit = new EventEmitter<Iproject>();
  }


  handleDelete(): void{//Cuando tocan el boton de eliminar
    this.delete.emit({//Emito un evento hacia mi componente padre con los datos de este proyecto
      id: this.projectInfo.id_project as number,//id del proyecto a borrar
      tablename: 'projects'//tabla donde se encuentra, en este caso projects 
    });
  }

  handleEdit():void{
    this.edit.emit(this.projectInfo);
  }
}
