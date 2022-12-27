import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faPen, faTrash, faCalendar, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

interface Idelete{
  id: number,
  tablename: string
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

@Component({
  selector: 'study-card',
  templateUrl: './study-card.component.html',
  styleUrls: ['./study-card.component.css']
})
export class StudyCardComponent{
  
  @Input() studyInfo: Istudy;
  @Input() img:string;
  @Output() delete = new EventEmitter<Idelete>();//Emisor de evento para boton borrar
  @Output() edit:EventEmitter<Istudy>;
  protected faPen;
  protected faTrash;
  protected faCalendar;
  protected faFlagCheckered;
  protected logged: boolean;

  constructor(){
    this.img = '';
    this.faPen = faPen;
    this.faTrash = faTrash;
    this.studyInfo = {
      id_study: -2,
      description: "Loading",
      dateInit: "Loading",
      dateFinish: "Loading",
      title: "Loading",
      typeName: "Loading",
      typeId: -2
    }
    this.edit = new EventEmitter<Istudy>();
    this.faCalendar = faCalendar;
    this.faFlagCheckered = faFlagCheckered;
    this.logged = !!sessionStorage.getItem('logged');
  }

  handleDelete(): void{//Cuando tocan el boton de eliminar
    this.delete.emit({//Emito un evento hacia mi componente padre con los datos de este estudio
      id: this.studyInfo.id_study,//id del estudio a borrar
      tablename: 'studies'//tabla donde se encuentra, en este caso studies 
    });
  }

  handleEdit():void{
    this.edit.emit(this.studyInfo);
  }
}
