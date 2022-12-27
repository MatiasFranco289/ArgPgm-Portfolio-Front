import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface Idelete{
  id: number,
  tablename: string
}

interface IdbImage{
  id_image: number,
  imgUrl: string
}

interface Iblog{
  createdAt: string,
  description: string,
  id_post: number,
  images: Array<IdbImage>,
  title: string
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  protected faPlus;
  protected publications: Array<Iblog>;
  protected deleteModal:Idelete;
  protected popUpState:number;
  protected logged:boolean;

  constructor() { 
    this.faPlus = faPlus;
    this.publications = [];
    this.deleteModal = {id:-1,tablename:''};
    this.popUpState = -2;
    this.logged = !!sessionStorage.getItem('logged');
  }

  ngOnInit(): void {
      fetch("http://localhost:8080/posts")
      .then(data => data.json())
      .then(response => {
        this.publications = response.filter((publication: any) => publication.id_post !== 1);
        this.publications = this.publications.map((publication => {
          let formattedDate = new Date(publication.createdAt).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"}) 
          publication.createdAt = formattedDate;
          return publication;
        }))
      })
  }

  handleDelete(deleteInfo:Idelete): void{//Esto es llamado desde alguno de los componente hijos de blog
    //En deleteInfo recibo un objeto que contiene la id de la cosa a eliminar y la tabla de donde debo eliminarlo
    this.deleteModal = deleteInfo;//Guardo esto en el estado local para luego enviarselo al modal de eliminar
  }

  changePopUpState(newState: number):void{
    this.popUpState = newState;
  }

  closePopUp():void{
    this.popUpState = -2;
  }
}
