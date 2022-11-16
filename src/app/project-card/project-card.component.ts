import { Component, OnInit, Input} from '@angular/core';
import { faGithub, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { faLink, faCalendar, faFlagCheckered, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})

export class ProjectCardComponent implements OnInit {
  @Input() name:string;
  @Input() dateInit:string;
  @Input() dateFinish:string;
  @Input() description:string;
  @Input() imgLink:string;
  @Input() videoLink:string;
  @Input() projectLink:string;
  @Input() deployLink:string;
  @Input() tecnologys:Array<string>;
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
  }


  ngOnInit(): void {
  }
}
