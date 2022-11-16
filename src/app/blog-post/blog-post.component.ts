import { Component, OnInit, Input } from '@angular/core';
import { faTrash, faPen, faCalendar } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  @Input() title:string;
  @Input() date:string;
  @Input() description:string;
  @Input() imgs:Array<string>;
  protected faTrash;
  protected faPen;
  protected faCalendar;

  constructor(){
    this.title = '';
    this.date = '';
    this.description = '';
    this.imgs = [];
    this.faTrash = faTrash;
    this.faPen = faPen;
    this.faCalendar = faCalendar;
  }

  ngOnInit(): void {
  }

}
