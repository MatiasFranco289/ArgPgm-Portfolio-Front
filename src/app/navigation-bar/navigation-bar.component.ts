import { Component, OnInit } from '@angular/core';
/* import { faCoffee } from '@fortawesome/free-solid-svg-icons'; */
import { faBars } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  protected logged: boolean;
  protected faBars;

  constructor() {
    this.logged = false;
    this.faBars = faBars;
  }

  ngOnInit(): void {
  }

  handleDisconnect():void{ //Implementar logica de desconexion aca
    this.logged = !this.logged;
  }
}
