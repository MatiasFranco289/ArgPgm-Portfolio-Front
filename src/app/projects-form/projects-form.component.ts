import { Component} from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.css']
})
export class ProjectsFormComponent{
  @Input() popUpState:number;
  @Output() close: EventEmitter<number>;//Esto es un emisor de evento
  protected faXmark;
  protected projectForm:FormGroup;
  protected tecnologys: {[key:string]:boolean};
  protected sendState:string;

  protected tecnolgysFromDB: Array<string>;
  protected tecnolgysInProject: Array<string>;

  constructor(){ 
    this.popUpState = -2;
    this.faXmark = faXmark;
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dateInit: new FormControl('', [Validators.required]),
      dateFinish: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      gitUrl: new FormControl('', [Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)]),
      deployUrl: new FormControl('', [Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)]),
      videoUrl: new FormControl('', [Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)]),
      imgUrl: new FormControl('', [Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]),
    })
    this.sendState = '';
    this.close = new EventEmitter<number>();

    this.tecnologys = {};
    //Desde la DB te deberia llegar un array con TODAS las tecnologias disponibles
    //["HTML","BOOTSTRAP","CSS","Js","Angular",etc]
    this.tecnolgysFromDB = ['HTML', 'BOOTSTRAP', 'CSS', 'JS', 'Angular'];
    //Desde la DB te deberia llegar tambien un array con las tecnologias que implementa este proyecto en particular
    //["HTML","BOOTSTRAP","CSS",etc]
    this.tecnolgysInProject = ['HTML','CSS','BOOTSTRAP']
    //Entonces recorro el array con todas las tecnologias y las asingo como llave de un objeto
    //Para saber su valor pregunto si esa tecnologia existe en el array tecnologysInProject
    this.tecnolgysFromDB.forEach(t => {
      this.tecnologys[t] = this.tecnolgysInProject.indexOf(t)!==-1;
    })
    //Ahora tengo un objeto con llaves con nombre de tecnologias y un valor true or false dependiendo de si esa tecnologia existe o no en este proyecto
  }

  ngOnInit(): void {
  }

  closeForm(event:Event):void{//Cuando tocan el boton de cerrar
    event.preventDefault();
    this.close.emit(-2);
  }

  handleTecnology(e: Event):void{
    let target: HTMLButtonElement = e.target as HTMLButtonElement;
    this.tecnologys[target.id] = !this.tecnologys[target.id];
  }

  closeError():void{//Esto cierra el popUp de errors
    this.sendState = '';
  }

  reload():void{//Este el el boton que da fin a todo y reloadea la pagina para que veas los cambios
    window.location.reload();
  }

  sendForm():string{
    if(this.projectForm.status === 'INVALID') return this.sendState = 'error';//Si hay un error muestro un popUp
    //Si no hay un error por aca deberias hacer el POST o PUT
    this.sendState = 'loading';

    setTimeout(() => {//Simulo asincronisidad
      this.sendState = 'done';
    },1000);

    return '';
  }

}
