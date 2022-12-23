import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {//Esto es lo mismo que ComponentDidMount en react
    console.log("He vuelto a mi amado TS, java te odio");

    fetch("http://localhost:8080/skills")
    .then(response => response.json())
    .then(data => console.log(data))
  }

}
