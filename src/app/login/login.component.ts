import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Iuser{
  id: number,
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  protected loginForm:FormGroup;
  protected sendState:string;

  constructor(private router:Router, private http: HttpClient){
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

    //Sisisi ya se, este login es horrible, ineficiente e inseguro, pero tengo sueño. Pido perdon 
    this.http.get("http://localhost:8080/users/all")
    .subscribe({
      next: (res: any) => {
        res = res.find((user: Iuser) => {return user.username === this.loginForm.value.username});
        //Si no encontro ningun user que coincida con el email o la pass es incrorrecta tira error
        if(!res || res.password !== this.loginForm.value.pass) return this.sendState = "wrong";
        sessionStorage.setItem("logged", "true");//Guardo esta variable de sesion como true
        return this.router.navigate(['/']);
      },
      error: (err) => console.error("An unexpected error has ocurred while trying to connect.")
    });

    return '';
  }

  closeError():void{
    this.sendState = '';
  }
} 
