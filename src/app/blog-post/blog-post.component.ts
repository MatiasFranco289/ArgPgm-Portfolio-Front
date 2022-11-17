import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTrash, faPen, faCalendar } from '@fortawesome/free-solid-svg-icons'

interface Idelete{
  id: number,
  tablename: string
}

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})

export class BlogPostComponent{

  @Input() title:string;
  @Input() date:string;
  @Input() description:string;
  @Input() imgs:Array<string>;
  @Input() postId:number;//Esto es la id del post, por ahora es solo el index del for del padre, pero mas adelante tenes que cambiarlo por el id real que tenga en la DB
  @Output() delete = new EventEmitter<Idelete>();//Emisor de evento para boton borrar

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
    this.postId = 0;
  }

  handleDelete(): void{//Cuando tocan el boton de eliminar
    console.log('Que tocas la reconcha de tu hermana');
    this.delete.emit({//Emito un evento hacia mi componente padre con los datos de este blog
      id: this.postId,//id del post a borrar
      tablename: 'posts'//tabla donde se encuentra, en este caso posts 
    });
  }

}
