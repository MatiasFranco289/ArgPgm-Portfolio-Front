import { Component, Input, Output, EventEmitter} from '@angular/core';
import { faGithub, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { faLink, faCalendar, faFlagCheckered, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

interface Idelete{
  id: number,
  tablename: string
}

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})

export class ProjectCardComponent {
  @Input() name:string;
  @Input() dateInit:string;
  @Input() dateFinish:string;
  @Input() description:string;
  @Input() imgLink:string;
  @Input() videoLink:string;
  @Input() projectLink:string;
  @Input() deployLink:string;
  @Input() tecnologys:Array<string>;
  @Input() projectId:number;
  @Output() delete = new EventEmitter<Idelete>();//Emisor de evento para boton borrar
  @Output() edit: EventEmitter<number>;
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
    this.name = "";
    this.dateInit="";
    this.dateFinish="";
    this.description="";
    this.imgLink="";
    this.videoLink="";
    this.projectLink="";
    this.deployLink="";
    this.faGithub = faGithub;
    this.faLink = faLink;
    this.faYoutube = faYoutube;
    this.defaultImg = 'https://i.ibb.co/yQX0pqk/defaul-Thumbnail.png';
    this.tecnologys=[];
    this.faCalendar = faCalendar;
    this.faFlagCheckered = faFlagCheckered;
    this.faPen = faPen;
    this.faTrash = faTrash;
    this.logged = true;
    this.projectId = 0;
    this.edit = new EventEmitter<number>();
  }


  handleDelete(): void{//Cuando tocan el boton de eliminar
    console.log('Que tocas la reconcha de tu hermana proyectos');
    this.delete.emit({//Emito un evento hacia mi componente padre con los datos de este proyecto
      id: this.projectId,//id del proyecto a borrar
      tablename: 'projects'//tabla donde se encuentra, en este caso projects 
    });
  }

  handleEdit():void{
    this.edit.emit(this.projectId);
  }
}
