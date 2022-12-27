import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faPen, faTrash, faCircle, faCalendar, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

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
  selector: 'experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.css']
})

export class ExperienceCardComponent{
  
  @Input() name:string;
  @Input() dateInit:string;
  @Input() dateFinish:string;
  @Input() location:string;
  @Input() description:string;
  @Input() duration:string;
  @Input() idExperience:number;
  @Input() idPlace:number;
  @Output() delete = new EventEmitter<Idelete>();
  @Output() edit:EventEmitter<Iexperience>;
  protected faPen;
  protected faTrash;
  protected faCircle;
  protected faCalendar;
  protected faFlagCheckered;
  protected logged: boolean;

  constructor(){
    this.name = '';
    this.dateInit = '';
    this.dateFinish = '';
    this.location = '';
    this.description = '';
    this.duration = '';
    this.faPen = faPen;
    this.faTrash = faTrash;
    this.faCircle = faCircle;
    this.idExperience = -2;
    this.idPlace = -2;
    this.edit = new EventEmitter<Iexperience>();
    this.faCalendar = faCalendar;
    this.faFlagCheckered = faFlagCheckered;
    this.logged = !!sessionStorage.getItem('logged');
  }

  handleDelete():void{
    this.delete.emit({
      id: this.idExperience,
      tablename: 'experiences'
    })
  }

  handleEdit():void{
    this.edit.emit({
      id_experience: this.idExperience,
      id_place: this.idPlace,
      title: this.name,
      description: this.description,
      location: this.location,
      dateInit: this.dateInit,
      dateFinish: this.dateFinish,
    });
  }
}
