import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})
export class ExperienceFormComponent{
  @Input() popUpState:number;
  @Output() close:EventEmitter<number>;
  protected sendState:string;
  protected experiencesForm: FormGroup;
  protected faXmark;

  constructor(){
    this.popUpState = -2;
    this.sendState = '';
    this.experiencesForm = new FormGroup({
      name: new FormControl('',Validators.required),
      dateInit: new FormControl('',Validators.required),
      dateFinish: new FormControl('',Validators.required),
      location: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required)
    })
    this.faXmark = faXmark;
    this.close = new EventEmitter<number>();
  }

  sendForm():string{
    if(this.experiencesForm.status === 'INVALID') return this.sendState = 'error';//Si hay un error muestro un popUp
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
