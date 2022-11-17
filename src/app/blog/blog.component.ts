import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface Idelete{
  id: number,
  tablename: string
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  protected faPlus;
  protected publications: Array<number>;//Feel free to change this shit
  protected deleteModal:Idelete;

  constructor() { 
    this.faPlus = faPlus;
    this.publications = [0,1,2];
    this.deleteModal = {id:-1,tablename:''};
  }

  handleDelete(deleteInfo:Idelete): void{//Esto es llamado desde alguno de los componente hijos de blog
    //En deleteInfo recibo un objeto que contiene la id de la cosa a eliminar y la tabla de donde debo eliminarlo
    this.deleteModal = deleteInfo;//Guardo esto en el estado local para luego enviarselo al modal de eliminar
  }

}
