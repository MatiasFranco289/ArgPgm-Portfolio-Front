import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Idelete{
  id: number,
  tablename: string
}

@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent {
  @Input() skills: Array<number>; 
  @Output() delete = new EventEmitter<Idelete>();//Emisor de evento para boton borrar
  @Output() editCreate:EventEmitter<number>;
  protected faPlus;

  constructor(){
    this.skills = [];
    this.faPlus = faPlus;
    this.editCreate = new EventEmitter<number>;
  }

  handleDelete(deleteInfo:Idelete): void{//Esto es llamado desde alguno de los componente hijos de skills
    this.delete.emit({//Emito un evento hacia mi componente padre con los datos de esta skill
      id: deleteInfo.id,//id de la skill a borrar
      tablename: deleteInfo.tablename//tabla donde se encuentra, en este caso skills 
    });
  }

  openPopUp(id:number):void{
   this.editCreate.emit(id);
  }
}
