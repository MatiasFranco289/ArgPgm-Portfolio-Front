import { Component } from '@angular/core';

interface Idelete{
  id: number,
  tablename: string
}

interface Iskill{
  id_skill: number,
  skill_name: string,
  percentaje: number
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

//IMPORTANTE: 
//CUANDO CONECTES ESTO CON LA DB, ESTE ES EL COMPONENTE DE HACER LOS LLAMADOS GET Y ENVIAR LA INFORMACION A SUS HIJOS

export class AboutComponent {
  //Feel free to change this shit, solo lo pongo asi para sacar el length y renderizar por ahora
  protected skills: Array<number>;//Esto va a venir de la DB y van a ser todas mis skills
  protected studies: Array<number>;
  protected experiences: Array<number>;
  protected deleteModal: Idelete;
  protected popUpSkill:Iskill;
  protected popUpAbout:boolean;
  protected popUpStudies:number;
  protected aboutDescription:string;
  protected aboutImgUrl:string;
  protected popUpExperiences:number;
  
  constructor(){
    this.skills = [0,1,2,3,4,5];
    this.studies = [0,1,2];
    this.experiences = [0,1,2];
    this.deleteModal = {id:-1,tablename:''};
    this.popUpSkill = {id_skill:-2,skill_name:'',percentaje:0};
    this.popUpAbout = false;
    this.aboutDescription =
    `Hola soy matias un desarrollador web nacido en Argentina.Desde siempre he disfrutado los temas relacionados con la tecnología.

    Mi pasión nació desde muy pequeño cuando descubrí como hacer paginas usando html y un bloc de notas y desde entonces nunca he parado.He creado infinidad de páginas, modelado en 3D, trabajado en algunos juegos y hasta he creado pequeños robots usando arduino.
  
    Todo esto lo he hecho siempre como hobby y aprendiendo por mi cuenta, es por eso que me considero un autodidacta.No fue hasta el 2022 que decidí dedicarme a esto de manera profesional y entre un Bootcamp donde aprendí muchas cosas nuevas e interesantes.

    Mi foco principal en estos días es desarrollar sitios webs únicos y sorprendentes y por eso me mantengo siempre en movimiento y aprendiendo para crear cosas cada vez mejores.`;
    this.aboutImgUrl = 'https://i.ibb.co/yQX0pqk/defaul-Thumbnail.png';
    this.popUpStudies = -2;
    this.popUpExperiences = -2;
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

  handleEditStudy(id:number):void{
    this.popUpStudies = id;
  }

  handleEditExperience(id:number):void{
    this.popUpExperiences = id;
  }
}
