import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Idelete{
  id: number,
  tablename: string
}

@Component({
  selector: 'experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})

export class ExperienceComponent {
  @Input() experiences:Array<number>;
  @Output() delete = new EventEmitter<Idelete>();
  @Output() edit:EventEmitter<number>;
  protected faPlus;

  constructor(){
    this.experiences = [];
    this.faPlus = faPlus;
    this.edit = new EventEmitter<number>;
  }

  handleDelete(deleteInfo: Idelete){
    this.delete.emit({
      id: deleteInfo.id,
      tablename: deleteInfo.tablename
    })
  }

  handleEdit(id:number){
    this.edit.emit(id);
  }
  
}
