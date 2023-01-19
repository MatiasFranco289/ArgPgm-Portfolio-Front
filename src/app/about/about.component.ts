import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

interface Idelete{
  id: number,
  tablename: string
}

interface Iskill{
  id_skill: number,
  skill_name: string,
  percentaje: number
}

interface Istudy{
  id_study: number,
  description: string,
  dateInit: string,
  dateFinish: string,
  title: string,
  typeName: string,
  typeId: number
}

interface Iexperience{
  id_experience: number,
  id_place: number,
  title: string,
  description: string,
  location: string,
  dateInit: string,
  dateFinish: string,
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

//IMPORTANTE: 
//CUANDO CONECTES ESTO CON LA DB, ESTE ES EL COMPONENTE DE HACER LOS LLAMADOS GET Y ENVIAR LA INFORMACION A SUS HIJOS

export class AboutComponent implements OnInit{
  //Feel free to change this shit, solo lo pongo asi para sacar el length y renderizar por ahora
  protected skills: Array<number>;//Esto va a venir de la DB y van a ser todas mis skills
  protected studies: Array<number>;
  protected experiences: Array<number>;
  protected deleteModal: Idelete;
  protected popUpSkill:Iskill;
  protected popUpAbout:boolean;
  protected popUpStudies:Istudy;
  protected aboutDescription:string;
  protected aboutImgUrl:string;
  protected popUpExperiences:Iexperience;
  
  constructor(private http: HttpClient){
    this.skills = [0,1,2,3,4,5];
    this.studies = [0,1,2];
    this.experiences = [0,1,2];
    this.deleteModal = {id:-1,tablename:''};
    this.popUpSkill = {id_skill:-2,skill_name:'',percentaje:0};
    this.popUpAbout = false;
    this.aboutDescription = "Loading.."
    this.aboutImgUrl = 'https://i.ibb.co/yQX0pqk/defaul-Thumbnail.png';
    this.popUpStudies = {
      id_study: -2,
      description: "",
      dateInit: "",
      dateFinish: "",
      title: "",
      typeName: "",
      typeId: -2
    };
    this.popUpExperiences = {
      id_experience: -2,
      id_place: -2,
      title: "",
      description: "",
      location: "",
      dateInit: "",
      dateFinish: "",
    }
  }

  ngOnInit(): void {
    //La informacion de la carta de about esta contenida es un simple post, igual que los demas de blogs.
    //Es importante para que funcione que ese post nunca sea eliminado y su id siempre sea "1"
    this.http.get(`${environment.domain}/posts/1`)
    .subscribe({
      next: (res: any) => {
        this.aboutDescription = res.description;
        if(res.images[0]) this.aboutImgUrl = res.images[0].imgUrl;
      },
      error: (err) => console.log("An unexpected error has ocurred while trying to get data for About.")
    });
  }

  handleDelete(deleteInfo:Idelete){
    this.deleteModal = deleteInfo;
  }

  handleEditSkill(skill: Iskill){
    this.popUpSkill = skill;
  }

  handleEditAbout():void{
    this.popUpAbout = !this.popUpAbout;
  }

  handleEditStudy(studyInfo: Istudy):void{
    this.popUpStudies = studyInfo;
  }

  handleEditExperience(experienceInfo:Iexperience):void{
    this.popUpExperiences = experienceInfo;
  }
}
