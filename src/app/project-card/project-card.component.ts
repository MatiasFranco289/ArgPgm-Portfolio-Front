import { Component, OnInit, Input} from '@angular/core';
import { faGithub, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'


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
  @Input() tecnologys:Array<String>;

  protected faGithub;
  protected faLink;
  protected faYoutube;

  constructor(){
    this.name = "";
    this.dateInit="";
    this.dateFinish="";
    this.description="";
    this.imgLink="";
    this.videoLink="";
    this.projectLink="";
    this.deployLink="";
    this.tecnologys=[];

    this.faGithub = faGithub;
    this.faLink = faLink;
    this.faYoutube = faYoutube;

    //Importar iconos de tecnologias mas tarde

    //HTML
    //CSS
    //React
    //Angular
    //JavaScript
    //Typescript
    //BootStrap
    //Tailwind
    //Redux
    //Node
    //Java
    //PHP
    //Express
    //Sequelize
    //PostgreSQL
    //MySQL
  }


  ngOnInit(): void {
    
  }

}
