import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.css']
})
export class AboutCardComponent implements OnInit {
  @Input() img:string;
  @Input() description:string;
  @Output() aboutPopUp: EventEmitter<boolean>;
  protected faPen;
  protected descriptionSegmented:Array<string>;

  constructor(){
    this.img = '';
    this.description = '';
    this.faPen = faPen;
    this.aboutPopUp = new EventEmitter<boolean>();
    this.descriptionSegmented = [];
  }

  ngOnInit(): void {
    this.descriptionSegmented = this.description.split(/\r?\n/);
  }

  handleAboutEdit(): void{
    this.aboutPopUp.emit(true);
  }

}
