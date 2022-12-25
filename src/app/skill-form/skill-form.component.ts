import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

interface Iskill{
  id_skill?: number,
  skill_name: string,
  percentaje: number
}

@Component({
  selector: 'skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnChanges{
  protected faXmark;
  protected groupForm: FormGroup;
  protected sendState:string;
  @Input() popUpState: Iskill;
  @Output() close: EventEmitter<number>;

  constructor(private http: HttpClient){
    this.faXmark = faXmark;
    this.groupForm = new FormGroup({
      skill: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)])
    })
    this.sendState = '';
    this.close = new EventEmitter<number>;
    this.popUpState = {id_skill:-2,skill_name:'',percentaje:0};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.popUpState.id_skill && this.popUpState.id_skill < 0) return;//Si el popUp se abre para otra cosa que no sea edicion no doy bola
    //Si se abre para edicion sobreescribo el formulario con los valores anteriores
    this.groupForm.patchValue({skill: this.popUpState.skill_name});
    this.groupForm.patchValue({level: this.popUpState.percentaje});
  }

  sendForm():string{
    if(this.groupForm.status === "INVALID") return this.sendState = 'error';
    //Hacer el envio aca
    this.sendState = 'loading';

    //Si id_skill es -1 es porque se quiere crear un nuevo skill, por lo tanto no debo asignarle una id, caso contrario si le asigno la id anterior de ese skill
    let newSkill: Iskill = this.popUpState.id_skill === -1?
    {skill_name: this.groupForm.value.skill, percentaje: this.groupForm.value.level}:
    {id_skill: this.popUpState.id_skill, skill_name: this.groupForm.value.skill, percentaje: this.groupForm.value.level}

    this.http.post('http://localhost:8080/skills', newSkill)
    .subscribe({
      next: (res) => this.sendState = "done",
      error: (err) => this.sendState = "error",
    });


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
