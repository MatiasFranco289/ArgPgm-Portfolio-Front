import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  selector: 'skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})

export class SkillCardComponent{
  @Input() name:string;
  @Input() progress:number;
  @Input() skillId:number;
  @Output() delete = new EventEmitter<Idelete>();//Emisor de evento para boton borrar
  /* @Output() editCreate: EventEmitter<number>; */
  @Output() editCreate: EventEmitter<Iskill>;

  protected faPen;
  protected faTrash;

  constructor(){
    this.name = '';
    this.progress = 0;
    this.faPen = faPen;
    this.faTrash = faTrash;
    this.skillId = 0;
    this.editCreate = new EventEmitter<Iskill>;
  }

  handleDelete(): void{//Cuando tocan el boton de eliminar
    this.delete.emit({//Emito un evento hacia mi componente padre con los datos de esta skill
      id: this.skillId,//id de la skill a borrar
      tablename: 'skills'//tabla donde se encuentra, en este caso skills 
    });
  }

  openPopUp():void{
    this.editCreate.emit({
      id_skill: this.skillId,
      skill_name: this.name,
      percentaje: this.progress
    });
  }
}
