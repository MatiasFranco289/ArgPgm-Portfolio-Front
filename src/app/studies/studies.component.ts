import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Idelete{
  id: number,
  tablename: string
}

@Component({
  selector: 'studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent {
  @Input() studies: Array<number>;
  @Output() delete = new EventEmitter<Idelete>();//Emisor de evento para boton borrar

  protected faPlus;

  constructor(){
    this.studies = [];
    this.faPlus = faPlus;
  }

  handleDelete(deleteInfo: Idelete): void{//Cuando tocan el boton de eliminar
    this.delete.emit({//Emito un evento hacia mi componente padre con los datos de este estudio
      id: deleteInfo.id,//id del estudio a borrar
      tablename: deleteInfo.tablename//tabla donde se encuentra, en este caso studies 
    });
  }
}
