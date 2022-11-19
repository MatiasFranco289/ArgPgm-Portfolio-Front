import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  protected loginForm:FormGroup;
  protected sendState:string;

  constructor(private router:Router){
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required,Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    this.sendState = '';
  }

  sendForm():string{
    if(this.loginForm.status === 'INVALID') return this.sendState = 'error';//Si hay un error muestro un popUp
    //Si no hay un error por aca deberias hacer el llamado a la DB
    this.sendState = 'loading';

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
    return '';
  }

  closeError():void{
    this.sendState = '';
  }
} 
