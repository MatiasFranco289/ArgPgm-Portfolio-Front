import { Component, Input, Output,EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';

interface Istudy{
  id_study?: number,
  description: string,
  dateInit: string,
  dateFinish: string,
  title: string,
  typeName?: string,
  typeId?: number
}

@Component({
  selector: 'studies-form',
  templateUrl: './studies-form.component.html',
  styleUrls: ['./studies-form.component.css']
})
export class StudiesFormComponent implements OnChanges, OnInit{
  protected faXmark;
  protected studiesForm: FormGroup;
  protected sendState:string;
  protected typeStudies: Array<any>;
  @Input() popUpState:Istudy;
  @Output() close:EventEmitter<number>;

  constructor(private http: HttpClient){
    this.typeStudies = [];
    this.faXmark = faXmark
    this.studiesForm = new FormGroup({
      name: new FormControl('',Validators.required),
      type: new FormControl('', Validators.required),
      dateInit: new FormControl('',Validators.required),
      dateFinish: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required)
    })
    this.sendState = '';
    this.popUpState = {
      id_study: -2,
      description: "",
      dateInit: "",
      dateFinish: "",
      title: "",
      typeName: "",
      typeId: -2
    };
    this.close = new EventEmitter<number>();
  }

  ngOnInit(): void {
    //Al iniciar consulta los tipos de estudios existentes
    this.http.get("http://localhost:8080/types")
    .subscribe({
      next: (res: any) => {
        this.typeStudies = res.map((typeStudy: any) => {
         return {
          id_type: typeStudy.id_type,
          name: typeStudy.name
         }
        })

      },
      error: (err) => console.log("An unexpected error has ocurred while trying to get type of studies.")
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.popUpState.id_study && this.popUpState.id_study < 0) return;
    
    this.studiesForm.patchValue({name: this.popUpState.title});
    this.studiesForm.patchValue({type: this.popUpState.typeId});
    this.studiesForm.patchValue({dateInit: this.popUpState.dateInit});
    this.studiesForm.patchValue({dateFinish: this.popUpState.dateFinish});
    this.studiesForm.patchValue({description: this.popUpState.description});
  }

  sendForm():string{
    if(this.studiesForm.status === 'INVALID') return this.sendState = 'error';//Si hay un error muestro un popUp
    //Si no hay un error por aca deberias hacer el POST o PUT
    this.sendState = 'loading';

    let newStudy: any = this.popUpState.id_study === -1?
    {//Estructura para nuevo estudio
      id_type: this.studiesForm.value.type,
      name: this.typeStudies.find((type) => {
        return type.id_type == this.studiesForm.value.type
      }).name,
      studies: [{
        title: this.studiesForm.value.name,
        decription: this.studiesForm.value.description,
        dateInit: this.studiesForm.value.dateInit,
        dateFinish: this.studiesForm.value.dateFinish
      }]
    }:
    {//Estructura para editar estudio ya existente
      id_type: this.studiesForm.value.type,
      name: this.typeStudies.find((type) => {
        return type.id_type == this.studiesForm.value.type
      }).name,
      studies: [{
        id_study: this.popUpState.id_study,
        title: this.studiesForm.value.name,
        decription: this.studiesForm.value.description,
        dateInit: this.studiesForm.value.dateInit,
        dateFinish: this.studiesForm.value.dateFinish
      }]
    };

    this.http.post("http://localhost:8080/types", newStudy)
    .subscribe({
      next: (res) => this.sendState = "done",
      error: (err) => this.sendState = "error"
    })

    return '';
  }

  closeError():void{//Esto cierra el popUp de errors
    this.sendState = '';
    
  }

  reload():void{//Este el el boton que da fin a todo y reloadea la pagina para que veas los cambios
    window.location.reload();
  }

  closePopUp():void{
    this.studiesForm.setValue({
      name: '',
      type: '',
      dateInit: '',
      dateFinish: '',
      description: ''
    })

    this.studiesForm.markAsUntouched();
    this.close.emit(-2);
  }
}
