import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faTrash, faPen, faCalendar } from '@fortawesome/free-solid-svg-icons'

interface Idelete{
  id: number,
  tablename: string
}

interface IdbImage{
  id_image: number,
  imgUrl: string
}

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})

export class BlogPostComponent implements OnInit{

  @Input() title:string;
  @Input() date:string;
  @Input() description:string;
  @Input() imgs:Array<IdbImage>;
  @Input() postId:number;//Esto es la id del post, por ahora es solo el index del for del padre, pero mas adelante tenes que cambiarlo por el id real que tenga en la DB
  @Output() delete = new EventEmitter<Idelete>();//Emisor de evento para boton borrar
  @Output() edit: EventEmitter<number>;

  protected faTrash;
  protected faPen;
  protected faCalendar;
  protected logged: boolean;
  protected segmentedDescription: Array<string>;

  constructor(){
    this.title = '';
    this.date = '';
    this.description = '';
    this.imgs = [];
    this.faTrash = faTrash;
    this.faPen = faPen;
    this.faCalendar = faCalendar;
    this.postId = 0;
    this.edit = new EventEmitter<number>;
    this.logged = !!sessionStorage.getItem('logged');
    this.segmentedDescription = [];
  }


  ngOnInit(): void {
    this.segmentedDescription = this.description.split(/\r?\n/);
  }

  handleDelete(): void{//Cuando tocan el boton de eliminar
    this.delete.emit({//Emito un evento hacia mi componente padre con los datos de este blog
      id: this.postId,//id del post a borrar
      tablename: 'posts'//tabla donde se encuentra, en este caso posts 
    });
  }

  editPost():void{
    this.edit.emit(this.postId);
  }
}
