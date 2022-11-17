import { Component, Input } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  @Input() skills: Array<number>; 
  protected faPlus;

  constructor(){
    this.skills = [];
    this.faPlus = faPlus;
  }

}
