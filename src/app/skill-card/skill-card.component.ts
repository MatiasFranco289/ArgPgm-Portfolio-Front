import { Component, Input } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent{
  @Input() name:string;
  @Input() progress:number;
  protected faPen;
  protected faTrash;

  constructor(){
    this.name = '';
    this.progress = 0;
    this.faPen = faPen;
    this.faTrash = faTrash;
  }

}
