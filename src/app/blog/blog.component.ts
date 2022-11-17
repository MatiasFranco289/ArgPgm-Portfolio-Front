import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  protected faPlus;
  protected publications: Array<number>;//Feel free to change this shit

  constructor() { 
    this.faPlus = faPlus;
    this.publications = [0,1,2];
  }

}
