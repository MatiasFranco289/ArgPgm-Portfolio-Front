import { Component, Output, EventEmitter, Input } from '@angular/core';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent {
  protected faXmark;
  protected groupForm: FormGroup;
  protected sendState:string;
  @Input() popUpState: number;
  @Output() close: EventEmitter<number>;

  constructor(){
    this.faXmark = faXmark;
    this.groupForm = new FormGroup({
      skill: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)])
    })
    this.sendState = '';
    this.close = new EventEmitter<number>;
    this.popUpState = -2;
  }

  sendForm():string{
    if(this.groupForm.status === "INVALID") return this.sendState = 'error';
    //Hacer el envio aca
    this.sendState = 'loading';

    setTimeout(() => {
      this.sendState = 'done';
    },1000);

    return '';
  }

  closeError():void{
    this.sendState = '';
  }

  reload():void{//Este el el boton que da fin a todo y reloadea la pagina para que veas los cambios
    window.location.reload();
  }

  closePopUp():void{//Esto emite un evento que cerrara el popUp
    this.close.emit(-2);
  }
}
