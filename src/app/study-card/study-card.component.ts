import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Idelete{
  id: number,
  tablename: string
}

@Component({
  selector: 'study-card',
  templateUrl: './study-card.component.html',
  styleUrls: ['./study-card.component.css']
})
export class StudyCardComponent{
  
  @Input() name:string;
  @Input() type:string;
  @Input() dateInit:string;
  @Input() dateFinish:string;
  @Input() description:string;
  @Input() img:string;
  @Input() studyId:number;
  @Output() delete = new EventEmitter<Idelete>();//Emisor de evento para boton borrar
  protected faPen;
  protected faTrash;

  constructor(){
    this.name = '';
    this.type = '';
    this.dateInit = '';
    this.dateFinish = '';
    this.description = '';
    this.img = '';
    this.faPen = faPen;
    this.faTrash = faTrash;
    this.studyId = 0;
  }

  handleDelete(): void{//Cuando tocan el boton de eliminar
    this.delete.emit({//Emito un evento hacia mi componente padre con los datos de este estudio
      id: this.studyId,//id del estudio a borrar
      tablename: 'studies'//tabla donde se encuentra, en este caso studies 
    });
  }

}
