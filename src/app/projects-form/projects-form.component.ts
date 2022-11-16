import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import {faXmark} from '@fortawesome/free-solid-svg-icons'


interface IvalidationFunction{
  (text:string, location:string) : void;
}

interface Ivalidation {
  name: IvalidationFunction,
  dateInit: IvalidationFunction,
  dateFinish: IvalidationFunction,
  description: IvalidationFunction,
  git: IvalidationFunction,
  deploy: IvalidationFunction,
  video: IvalidationFunction,
  img: IvalidationFunction,
  tecnologys: IvalidationFunction
}

interface Iinputs {
  name: string,
  dateInit: string,
  dateFinish: string,
  description: string,
  git: string,
  deploy: string,
  video: string,
  img: string,
  tecnologys: string 
}

@Component({
  selector: 'projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.css']
})
export class ProjectsFormComponent implements OnInit {
  @Input() isOpen:boolean;
  @Output() isOpenChange = new EventEmitter<boolean>();//Esto es un emisor de evento
  protected faXmark;

  protected validations: Ivalidation;
  protected inputValues: Iinputs;
  protected errors: Iinputs;
  protected urlValidation: IvalidationFunction;
  protected notEmptyValidation: IvalidationFunction;

  constructor(){ 
    this.isOpen = false;
    this.faXmark = faXmark;

    this.urlValidation = (text:string, location: string) => {
      if(!text.length) return this.errors[location as keyof Iinputs] = "";
      var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(text);
      if(!valid) return this.errors[location as keyof Iinputs] = "Link invalido.";
      return this.errors[location as keyof Iinputs] = "";
    }

    this.notEmptyValidation = (text:string, location: string) => {
      if(!text.length) return this.errors[location as keyof Iinputs] = "No puede estar vacio."
      return this.errors[location as keyof Iinputs] = "";
    }

    this.validations = {
      name: this.notEmptyValidation,
      dateInit: (text:string) => {console.log('Validacion dateInit');},
      dateFinish: (text:string) => {console.log('Validacion dateFinish');},
      description: this.notEmptyValidation,
      git: this.urlValidation,
      deploy: this.urlValidation,
      video: this.urlValidation,
      img: (text:string) => {
        if(!text.length) return this.errors.img = "No puede estar vacio.";
        if(!/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(text)) return this.errors.img = "Link invalido."
        return this.errors.img = "";
      },
      tecnologys: (text:string) => {console.log('Validacion tecnologia.');}
    }

    this.inputValues = {
      name: '',
      dateInit: '',
      dateFinish: '',
      description: '',
      git: '',
      deploy: '',
      video: '',
      img: '',
      tecnologys: '' 
    }

    this.errors = {
      name: '',
      dateInit: '',
      dateFinish: '',
      description: '',
      git: '',
      deploy: '',
      video: '',
      img: '',
      tecnologys: '' 
    }
  }

  ngOnInit(): void {
  }

  closeForm(event:Event):void{//Cuando tocan el boton de cerrar
    event.preventDefault();
    this.isOpenChange.emit(false);//Emito un evento avisando al padre que tiene que cambiar la variable que mantiene este form abierto a falso
  }

  handleInputs(e:Event):void{
    let target = e.target as HTMLInputElement;//Recibo el valor cuando hay un cambio
    this.inputValues[target.id as keyof Iinputs] = target.value;//Actualizo los valores guardados

    let validateFunction = this.validations[target.id as keyof IvalidationFunction] as IvalidationFunction;
    validateFunction(target.value,target.id);
  }
}
