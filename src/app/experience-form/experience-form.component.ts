import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

interface Iexperience{
  id_experience: number,
  id_place: number,
  title: string,
  description: string,
  location: string,
  dateInit: string,
  dateFinish: string,
}

interface InewExperience{
  id_place?: number,
  location: string,
  experiences: [{
    id_experience?: number,
    title: string,
    description: string,
    dateInit: string,
    dateFinish: string
  }]
}

@Component({
  selector: 'experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})

export class ExperienceFormComponent implements OnInit, OnChanges{
  @Input() popUpState:Iexperience;
  @Output() close:EventEmitter<Iexperience>;
  protected sendState:string;
  protected experiencesForm: FormGroup;
  protected allPlaces:Array<any>;
  protected faXmark;
  protected newPlaceInput:boolean;

  constructor(private http: HttpClient){
    this.popUpState = {
      id_experience: -2,
      id_place: -2,
      title: "",
      description: "",
      location: "",
      dateInit: "",
      dateFinish: "",
    }
    this.sendState = '';
    this.experiencesForm = new FormGroup({
      name: new FormControl('',Validators.required),
      dateInit: new FormControl('',Validators.required),
      dateFinish: new FormControl('',Validators.required),
      location: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required)
    })
    this.faXmark = faXmark;
    this.close = new EventEmitter<Iexperience>();
    this.allPlaces = [];
    this.newPlaceInput = false;
    this.experiencesForm.get("location")?.valueChanges.subscribe((x) => {
      if(x != -2) return;
      this.newPlaceInput = true;
      this.experiencesForm.patchValue({location:''});
    })
  }


  ngOnInit(): void {
    this.http.get(`${environment.domain}/places`)
    .subscribe({
      next: (res: any) => {
        this.allPlaces = res.map((place:any) => {
          return {
            id_place: place.id_place,
            name: place.location
          }
        })
      },
      error: (err) => console.log("An unexpected error has ocurred while trying to get the places.")
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.popUpState.id_experience < 0) return;

    this.experiencesForm.setValue({
      name: this.popUpState.title,
      dateInit: this.popUpState.dateInit,
      dateFinish: this.popUpState.dateFinish,
      location: this.popUpState.id_place,
      description: this.popUpState.description
    })
  }

  sendForm():string{
    if(this.experiencesForm.status === 'INVALID') return this.sendState = 'error';//Si hay un error muestro un popUp
    //Si no hay un error por aca deberias hacer el POST o PUT
    this.sendState = 'loading';


    let newExperience: InewExperience = {
      id_place: !isNaN(this.experiencesForm.value.location)?this.experiencesForm.value.location:9999,
      location: isNaN(this.experiencesForm.value.location)?this.experiencesForm.value.location:
      this.allPlaces.find((element: any) => {
        return element.id_place == this.experiencesForm.value.location
      }).name,
      experiences: [{
        title: this.experiencesForm.value.name,
        description: this.experiencesForm.value.description,
        dateInit: this.experiencesForm.value.dateInit,
        dateFinish: this.experiencesForm.value.dateFinish
      }]
    }
    
    //Si se esta tratando de editar una experiencia existente, agrego su id anterior para evitar crear un registro nuevo
    if(this.popUpState.id_experience !== -1) newExperience.experiences[0].id_experience = this.popUpState.id_experience; 

    this.http.post(`${environment.domain}/places`, newExperience)
    .subscribe({
      next: (res) => this.sendState = "done",
      error: (err) => {
        this.sendState = "error"
        console.error("An unexpected error has ocurred while trying to create or update a register.");
      }
    });

    return '';
  }

  closeError():void{//Esto cierra el popUp de errors
    this.sendState = '';
  }

  reload():void{//Este el el boton que da fin a todo y reloadea la pagina para que veas los cambios
    window.location.reload();
  }

  closePopUp():void{
    let initialState: Iexperience = {
      id_experience: -2,
      id_place: -2,
      title: "",
      description: "",
      location: "",
      dateInit: "",
      dateFinish: "",
    };

    this.experiencesForm.setValue({
      name: '',
      dateInit: '',
      dateFinish: '',
      location: '',
      description: ''
    });

    this.newPlaceInput = false;
    this.close.emit(initialState);
  }
}
