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

  constructor(){
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
    //Lo que hay aca abajo es solo para simular asincronisidad
    //Cambialo cuando implementes lo de la DB

    this.deletePhase = 'deleting';//Esto hace que apareza una ruedita de cargando
    setTimeout(() => {
      this.deletePhase = 'done';//Esto hace que aparezca un cartel que informa el exito o fallo
      console.log(`Se ha borrado el objeto con los siguiente datos`);
      console.log(`id: ${this.deleteInfo.id} table: ${this.deleteInfo.tablename}`);
    },1000);
  }
}
