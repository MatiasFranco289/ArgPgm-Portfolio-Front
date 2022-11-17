import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faPen, faTrash, faCircle } from '@fortawesome/free-solid-svg-icons';

interface Idelete{
  id: number,
  tablename: string
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
  @Output() delete = new EventEmitter<Idelete>();
  protected faPen;
  protected faTrash;
  protected faCircle;

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
    this.idExperience = 0;
  }

  handleDelete():void{
    this.delete.emit({
      id: this.idExperience,
      tablename: 'experiences'
    })
  }
}
