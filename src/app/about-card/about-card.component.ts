import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.css']
})
export class AboutCardComponent implements OnChanges {
  @Input() img:string;
  @Input() description:string;
  @Output() aboutPopUp: EventEmitter<boolean>;
  protected faPen;
  protected descriptionSegmented:Array<string>;
  protected logged: boolean;

  constructor(){
    this.img = '';
    this.description = '';
    this.faPen = faPen;
    this.aboutPopUp = new EventEmitter<boolean>();
    this.descriptionSegmented = [];
    this.logged = !!sessionStorage.getItem('logged');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.descriptionSegmented = this.description.split(/\r?\n/);
  }

  handleAboutEdit(): void{
    this.aboutPopUp.emit(true);
  }

}
