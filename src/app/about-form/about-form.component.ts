import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormGroup,Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.css']
})

export class AboutFormComponent implements OnInit{
  @Input() popUpState:boolean;
  @Input() description:string;
  @Input() imgUrl:string;
  @Output() close:EventEmitter<boolean>;

  protected faXmark;
  protected aboutForm:FormGroup;
  protected sendStatus:string;

  constructor(){
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

  ngOnInit(): void {
    //Updateo los valores por defectos con los datos que me manda el padre, que deberian venir de la DB
    this.aboutForm.get('description')?.setValue(this.description);
    this.aboutForm.get('imgUrl')?.setValue(this.imgUrl);
  }

  sendForm():string{
    if(this.aboutForm.status === 'INVALID') return this.sendStatus = 'error';
    //Hacer el envio aca
    this.sendStatus = 'loading';

    setTimeout(() => {
      this.sendStatus = 'done';
    },1000)
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
