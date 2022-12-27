import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit{
  protected skills: Array<Iskill>; 
  @Output() delete = new EventEmitter<Idelete>();//Emisor de evento para boton borrar
  @Output() editCreate:EventEmitter<Iskill>;
  protected faPlus;
  protected logged: boolean;

  constructor(private http: HttpClient){
    this.skills = [];
    this.faPlus = faPlus;
    this.editCreate = new EventEmitter<Iskill>;
    this.logged = !!sessionStorage.getItem('logged');
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/skills')
    .subscribe((res) => {
      this.skills = res as Array<Iskill>;
    })
  }

  handleDelete(deleteInfo:Idelete): void{//Esto es llamado desde alguno de los componente hijos de skills
    this.delete.emit({//Emito un evento hacia mi componente padre con los datos de esta skill
      id: deleteInfo.id,//id de la skill a borrar
      tablename: deleteInfo.tablename//tabla donde se encuentra, en este caso skills 
    });
  }

  openPopUp(skill:Iskill):void{
   this.editCreate.emit(skill);
  }
}
