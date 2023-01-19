import { Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface IdbImage{
  id_image?: number,
  imgUrl: string
}

interface Ipost{
  id_post?: number,
  title: string,
  description: string,
  images: Array<IdbImage>
}

@Component({
  selector: 'blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})

export class BlogFormComponent {
  protected imgLinks: Array<string>;
  protected previousImgs: Array<IdbImage>;
  protected faXmark;
  protected faPlus;
  protected blogForm;
  protected sendState:string;
  protected readOnly: Array<boolean>;
  @Input() popUpState:number;//Si recibis un -1 aca, significa que quieren crear un post, si recibir cualquier otra cosa significa que quieren editar un post y ese numero
  //Es la id correspondiente al post que quiren editar
  //Si quieren editar un post tendrias que asignar abajo en this.blogForm los valores por defecto traidos desde la db.
  @Output() close:EventEmitter<number>;

  constructor(private http: HttpClient){
    this.imgLinks = [];
    this.faXmark = faXmark;
    this.faPlus = faPlus;
    this.sendState = '';
    this.popUpState = 0;
    this.close = new EventEmitter<number>;
    this.previousImgs = [];
    this.readOnly = [false, false, false, false];

    //Defino las validaciones que tendra cada campo del formulario
    this.blogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      url0: new FormControl('', [Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]),
      url1: new FormControl('', [Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]),
      url2: new FormControl('', [Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]),
      url3: new FormControl('', [Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)])
    });
  }

  ngOnChanges(): void {//Cuando cambia algo
    if(this.popUpState > -1){//Si el popUpState es mayor a -1 es porque se quiere editar un post y popUpState contiene la id de ese post
      this.http.get(`${environment.domain}/posts/${this.popUpState}`)//Por lo tanto llamo a la api pidiendo la info de ese post
      .subscribe((res: any) => {//Cuando la api responde sobreescribo los datos en el formulario para que ya aparezca rellenado
        this.blogForm.patchValue({title: res.title});
        this.blogForm.patchValue({description: res.description});
        
        for(let f=0;f<res.images.length;f++){
          this.handleNewUrl();
          this.readOnly[f] = true;

          switch(f){
            case 0:
              this.blogForm.patchValue({url0: res.images[f].imgUrl})
            break;
            case 1:
              this.blogForm.patchValue({url1: res.images[f].imgUrl})
            break;
            case 2:
              this.blogForm.patchValue({url2: res.images[f].imgUrl})
            break;
            default:
              this.blogForm.patchValue({url3: res.images[f].imgUrl})
          }
        }

        this.previousImgs = res.images;
      })
    }
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
    let deletedUrl = this.blogForm.get(key)?.value;
    this.imgLinks.shift();//Elimino la ultima imagen
    this.blogForm.get(key)?.setValidators([]);//Elimino el validator
    this.blogForm.get(key)?.updateValueAndValidity();//Updateo

    let deletedId = this.previousImgs.filter(prevImg => prevImg.imgUrl === deletedUrl)[0];
    if(deletedId){
      this.http.delete(`${environment.domain}/images/${deletedId.id_image}`)
      .subscribe((res) => {this.reload()});
    }

  }

  sendForm():string{
    if(this.blogForm.status === 'INVALID') return this.sendState = 'error';//Si hay un error muestro un popUp
    //Si no hay un error por aca deberias hacer el POST o PUT
    this.sendState = 'loading';//El componente pasa a cargando

    let postToCreate:Ipost = {//Formateo la informacion como la pide la API
      title: this.blogForm.value.title || '',
      description: this.blogForm.value.description || '',
      images: []
    }

    if(this.popUpState > -1) postToCreate.id_post = this.popUpState;

    this.imgLinks.forEach((img, index) => {//Por cada input de img que haya en el formulario
      let val = this.blogForm.get('url'+index)?.value;//Guardo el valor de ese input

      if(val !== ''){//Si ese input tiene algo escrito
        let newImg:IdbImage = {imgUrl: val};//Guardo ese valor aca

        let filteredPrevious = this.previousImgs.filter(prevImg => prevImg.imgUrl === val);
        if(filteredPrevious.length){//Si esa imagen ya existia desde antes
          newImg.id_image = filteredPrevious[0].id_image;//Agrego el id antiguo para evitar duplicados
          //Elimino la imagen de imagenes previas
          let index = this.previousImgs.indexOf(filteredPrevious[0]);
          this.previousImgs.splice(index,1);
        }


        postToCreate.images.push(newImg);
      }

    })

    this.http.post(`${environment.domain}/posts`, postToCreate)
    .subscribe((res) => {
      this.sendState = 'done';
    })
  
    return '';
  }

  closeError():void{//Esto cierra el popUp de errors
    this.sendState = '';
  }

  reload():void{//Este el el boton que da fin a todo y reloadea la pagina para que veas los cambios
    window.location.reload();
  }

  closePopUp():void{//Esto emite un evento que cerrara el popUp y reseteo los valores a por defecto
    this.imgLinks = [];
    this.blogForm.setValue({
      title: '',
      description: '',
      url0: '',
      url1: '',
      url2: '',
      url3: ''
    })
    this.close.emit(-2);
  }
}
