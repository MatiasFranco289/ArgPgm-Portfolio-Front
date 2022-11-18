import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})

export class BlogFormComponent {
  protected imgLinks: Array<string>;
  protected faXmark;
  protected faPlus;
  protected blogForm;
  protected sendState:string;
  @Input() popUpState:number;//Si recibis un -1 aca, significa que quieren crear un post, si recibir cualquier otra cosa significa que quieren editar un post y ese numero
  //Es la id correspondiente al post que quiren editar
  //Si quieren editar un post tendrias que asignar abajo en this.blogForm los valores por defecto traidos desde la db.
  @Output() close:EventEmitter<number>;

  constructor(){
    this.imgLinks = ['',''];
    this.faXmark = faXmark;
    this.faPlus = faPlus;
    this.sendState = '';
    this.popUpState = 0;
    this.close = new EventEmitter<number>;

    //Defino las validaciones que tendra cada campo del formulario
    this.blogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      url0: new FormControl('', [Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]),
      url1: new FormControl('', [Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]),
      url2: new FormControl('', [Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]),
      url3: new FormControl('', [Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)])
    });

    //Recorro el array de imagenes y agrego a las comprobaciones de arriba el "required" en caso de que la imagen exista y por lo tanto
    //Se este renderizando el input en el formulario
    this.imgLinks.forEach((img, index) => {
      let key = 'url'+index;
      this.blogForm.get(key)?.addValidators([Validators.required]);
    })
  }

  handleNewUrl():void{//Agregar un link
    let key:string = 'url'+this.imgLinks.length;
    this.imgLinks.push('');
    this.blogForm.get(key)?.setValidators([
      Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i),
      Validators.required
    ])
    this.blogForm.get(key)?.updateValueAndValidity();
  }

  handleDeleteUrl():void{//Quitar un link
    let key = 'url'+(this.imgLinks.length - 1);//Esto hace referencia al ultimo elemento del array de img
    this.imgLinks.shift();//Elimino la ultima imagen
    this.blogForm.get(key)?.setValidators([]);//Elimino el validator
    this.blogForm.get(key)?.updateValueAndValidity();//Updateo
  }

  sendForm():string{
    if(this.blogForm.status === 'INVALID') return this.sendState = 'error';//Si hay un error muestro un popUp
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

  closePopUp():void{//Esto emite un evento que cerrara el popUp
    this.close.emit(-2);
  }
}
