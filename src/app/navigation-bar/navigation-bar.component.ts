import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent{
  protected logged: boolean;
  protected faBars;

  constructor() {
    this.logged = !!sessionStorage.getItem('logged');
    this.faBars = faBars;
  }

  handleDisconnect():void{
    sessionStorage.removeItem('logged');
    window.location.reload();
  }
}
