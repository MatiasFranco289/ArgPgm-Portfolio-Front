import { Component } from '@angular/core';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Iinputs{
  title:string,
  description:string,
  urls: Array<string>
}

@Component({
  selector: 'blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})

export class BlogFormComponent {
  protected imgLinks: Array<string>;
  protected faXmark;
  protected faPlus;
  protected inputs:Iinputs;

  constructor(){
    this.imgLinks = ['','',''];
    this.faXmark = faXmark;
    this.faPlus = faPlus;
    this.inputs = {title:'',description:'',urls:[]}
  }

  handleNewUrl(e:Event):void{
    e.preventDefault();
    this.imgLinks.push('');
  }

  handleDeleteUrl(e:Event):void{
    e.preventDefault();
    this.imgLinks.shift();
  }

  handleInputs(e: Event):void{
    let target: HTMLInputElement = e.target as HTMLInputElement;
    

  }
}
