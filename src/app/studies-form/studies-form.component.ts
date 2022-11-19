import { Component, Input, Output,EventEmitter } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'studies-form',
  templateUrl: './studies-form.component.html',
  styleUrls: ['./studies-form.component.css']
})
export class StudiesFormComponent{
  protected faXmark;
  protected studiesForm: FormGroup;
  protected sendState:string;
  @Input() popUpState:number;
  @Output() close:EventEmitter<number>;
  constructor(){
    this.faXmark = faXmark
    this.studiesForm = new FormGroup({
      name: new FormControl('',Validators.required),
      title: new FormControl('',Validators.required),
      dateInit: new FormControl('',Validators.required),
      dateFinish: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      imgUrl: new FormControl('', Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i))
    })
    this.sendState = '';
    this.popUpState = 0;
    this.close = new EventEmitter<number>();
  }


  sendForm():string{
    if(this.studiesForm.status === 'INVALID') return this.sendState = 'error';//Si hay un error muestro un popUp
    //Si no hay un error por aca deberias hacer el POST o PUT
    this.sendState = 'loading';

    setTimeout(() => {//Simulo asincronisidad
      this.sendState = 'done';
    },1000);

    return '';
  }

  closeError():void{//Esto cierra el popUp de errors
    this.sendState = '';
  }

  reload():void{//Este el el boton que da fin a todo y reloadea la pagina para que veas los cambios
    window.location.reload();
  }

  closePopUp():void{
    this.close.emit(-2);
  }
}
