import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.css']
})
export class AboutCardComponent {
  @Input() img:string;
  @Input() description:string;
  @Output() aboutPopUp: EventEmitter<boolean>;
  protected faPen;

  constructor(){
    this.img = '';
    this.description = '';
    this.faPen = faPen;
    this.aboutPopUp = new EventEmitter<boolean>();
  }

  handleAboutEdit(): void{
    this.aboutPopUp.emit(true);
  }

}
