import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Idelete{
  id: number,
  tablename: string
}

interface Iexperience{
  id_experience: number,
  id_place: number,
  title: string,
  description: string,
  location: string,
  dateInit: string,
  dateFinish: string,
}

@Component({
  selector: 'experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})

export class ExperienceComponent implements OnInit{
  protected experiences:Array<Iexperience>;
  @Output() delete = new EventEmitter<Idelete>();
  @Output() edit:EventEmitter<Iexperience>;
  protected faPlus;
  protected jobDurations:Array<string>;
  protected logged: boolean;

  constructor(private http: HttpClient){
    this.experiences = [];
    this.faPlus = faPlus;
    this.edit = new EventEmitter<Iexperience>;
    this.jobDurations = [];
    this.logged = !!sessionStorage.getItem('logged');
  }

  ngOnInit(): void {
    //Recupero los "places" y con ello todas las experiencias relacionadas a estos
    this.http.get("http://localhost:8080/places")
    .subscribe({
      next: (res: any) => {
        res.forEach((place:any) => {//Por cada place
          place.experiences.forEach((experience:any):void => {//Por cada experiencia relacionada a ese place
            let newExperience =  {
              id_experience: experience.id_experience,
              id_place: place.id_place,
              title: experience.title,
              description: experience.description,
              location: place.location,
              dateInit: experience.dateInit,
              dateFinish: experience.dateFinish
            }

            this.jobDurations.push(this.monthDiff(new Date(experience.dateInit), new Date(experience.dateFinish)));
            this.experiences.push(newExperience);
          })
        })
      },
      error: (err) => console.log("An unexpected error has ocurred while trying to get the experiences.")
    });
  }

  handleDelete(deleteInfo: Idelete){
    this.delete.emit({
      id: deleteInfo.id,
      tablename: deleteInfo.tablename
    })
  }

  handleEdit(experienceInfo:Iexperience){
    this.edit.emit(experienceInfo);
  }

  monthDiff(d1: Date, d2: Date): string {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    let result = months <= 0 ? 0 : months;
    return result + " meses";
  }
  
}
