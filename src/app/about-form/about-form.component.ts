import { Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.css']
})

export class AboutFormComponent implements OnChanges{
  @Input() popUpState:boolean;
  @Input() description:string;
  @Input() imgUrl:string;
  @Output() close:EventEmitter<boolean>;

  protected faXmark;
  protected aboutForm:FormGroup;
  protected sendStatus:string;

  constructor(private http: HttpClient){
    this.popUpState = false;
    this.faXmark = faXmark;
    this.description = '';
    this.imgUrl = ''
    this.aboutForm = new FormGroup({
      description: new FormControl(this.description, Validators.required),
      imgUrl: new FormControl(this.imgUrl, [Validators.required, Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)])
    })
    this.sendStatus = '';
    this.close = new EventEmitter<boolean>;
  }

  ngOnChanges(): void {
    //Updateo los valores por defectos con los datos que me manda el padre, que deberian venir de la DB
    this.aboutForm.get('description')?.setValue(this.description);
    this.aboutForm.get('imgUrl')?.setValue(this.imgUrl);
  }

  sendForm():string{
    if(this.aboutForm.status === 'INVALID') return this.sendStatus = 'error';
    //Hacer el envio aca
    this.sendStatus = 'loading';

    let newAbout = {
      id_post: 1,
      title: "About me",
      description: this.aboutForm.value.description,
      images: [{
        id_image: 1,
        imgUrl: this.aboutForm.value.imgUrl
      }]
    }
    
    this.http.post(`${environment.domain}/posts`, newAbout)
    .subscribe({
      next: () => this.sendStatus = 'done',
      error: (err) => console.log("An unexpected error has ocurred while trying to update the About info.")
    });

    return '';
  }

  closeError():void{
    this.sendStatus = '';
  }

  reload():void{//Este el el boton que da fin a todo y reloadea la pagina para que veas los cambios
    window.location.reload();
  }

  closePopUp():void{
    this.close.emit(false);
  }
}
