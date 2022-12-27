import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Idelete{
  id: number,
  tablename: string
}

interface Istudy{
  id_study: number,
  description: string,
  dateInit: string,
  dateFinish: string,
  title: string,
  typeName: string,
  typeId: number
}

@Component({
  selector: 'studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit{
  studies: Array<Istudy>;
  @Output() delete = new EventEmitter<Idelete>();//Emisor de evento para boton borrar
  @Output() edit:EventEmitter<Istudy>;
  protected faPlus;
  protected logged: boolean;

  constructor(private http: HttpClient){
    this.studies = [];
    this.faPlus = faPlus;
    this.edit = new EventEmitter<Istudy>();
    this.logged = !!sessionStorage.getItem('logged');
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/types')
    .subscribe({
      next: (res: any) => {
        res.forEach((studyType: any) => {
          studyType.studies.forEach((study: any) => {
            this.studies.push({
              id_study: study.id_study,
              description: study.decription,
              dateInit: study.dateInit,
              dateFinish: study.dateFinish,
              title: study.title,
              typeName: studyType.name,
              typeId: studyType.id_type
            })
          })
        })

      },
      error: (err) => console.log("An unexpected error has ocurred while trying to get studies.")
    });
  }

  handleDelete(deleteInfo: Idelete): void{//Cuando tocan el boton de eliminar
    this.delete.emit({//Emito un evento hacia mi componente padre con los datos de este estudio
      id: deleteInfo.id,//id del estudio a borrar
      tablename: deleteInfo.tablename//tabla donde se encuentra, en este caso studies 
    });
  }

  handleEdit(editInfo: Istudy):void{
    this.edit.emit(editInfo);
  }

  handleAddStudy(){
    this.edit.emit({
      id_study: -1,
      description: "",
      dateInit: "",
      dateFinish: "",
      title: "",
      typeName: "",
      typeId: -1
    });
  }
}
