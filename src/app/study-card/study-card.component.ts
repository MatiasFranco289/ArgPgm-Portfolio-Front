import { Component, Input } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'study-card',
  templateUrl: './study-card.component.html',
  styleUrls: ['./study-card.component.css']
})
export class StudyCardComponent{
  
  @Input() name:string;
  @Input() type:string;
  @Input() dateInit:string;
  @Input() dateFinish:string;
  @Input() description:string;
  @Input() img:string;
  protected faPen;
  protected faTrash;

  constructor(){
    this.name = '';
    this.type = '';
    this.dateInit = '';
    this.dateFinish = '';
    this.description = '';
    this.img = '';
    this.faPen = faPen;
    this.faTrash = faTrash;
  }

}
