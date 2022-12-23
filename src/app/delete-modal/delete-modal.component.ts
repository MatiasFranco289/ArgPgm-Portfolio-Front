import { HttpClient } from '@angular/common/http';
import { Component, Input, Output,EventEmitter } from '@angular/core';

interface Idelete{
  id:number,
  tablename: string
}

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})

export class DeleteModalComponent{
  @Input() deleteInfo: {id:number, tablename: string};
  @Output() delete = new EventEmitter<Idelete>();
  protected deletePhase:string;

  constructor(private http: HttpClient){
    this.deleteInfo = {id:-1,tablename:''}
    this.deletePhase = '';
  }

  handleClose(refresh:boolean): void{//Esto emite un evento al padre cambiando el objeto delete al enviado y cerrando asi este modal
    this.delete.emit({
      id: -1,
      tablename: ''
    })
    
    refresh && window.location.reload();
  }

  handleDelete():void{
    //Aca tenes que realizar el borrado de la base de datos
    //En this.deleteInfo tenes un objeto {id: number, tablename: string}
    //Que contiene el id del item a borrar y el nombre de la tabla 
    this.deletePhase = 'deleting';//Esto hace que apareza una ruedita de cargando

    this.http.delete(`http://localhost:8080/${this.deleteInfo.tablename}/${this.deleteInfo.id}`)
    .subscribe((res) => {
      this.deletePhase = 'done';//Esto hace que aparezca un cartel que informa el exito o fallo
    })
  }
}
