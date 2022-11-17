import { Component, Input } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.css']
})
export class AboutCardComponent {
  @Input() img:string;
  @Input() description: Array<string>;
  protected faPen;

  constructor(){
    this.img = '';
    this.description = [];
    this.faPen = faPen;
  }


}
