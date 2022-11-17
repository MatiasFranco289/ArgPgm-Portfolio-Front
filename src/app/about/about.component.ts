import { Component } from '@angular/core';

interface Idelete{
  id: number,
  tablename: string
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
  
  constructor(){
    this.skills = [0,1,2,3,4,5];
    this.studies = [0,1,2];
    this.experiences = [0,1,2];
    this.deleteModal = {id:-1,tablename:''};
  }

  handleDelete(deleteInfo:Idelete){
    this.deleteModal = deleteInfo;
  }
}
