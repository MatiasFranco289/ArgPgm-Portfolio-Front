import { Component, Input } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent {
  @Input() studies: Array<number>;
  protected faPlus;

  constructor(){
    this.studies = [];
    this.faPlus = faPlus;
  }

}
