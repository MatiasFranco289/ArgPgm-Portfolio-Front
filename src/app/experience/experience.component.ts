import { Component, Input } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  @Input() experiences:Array<number>;
  protected faPlus;

  constructor(){
    this.experiences = [];
    this.faPlus = faPlus;
  }

}
