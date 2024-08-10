import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  rfContact: any;
  checkLogin: any;
  data: any;
  constructor(private fb: FormBuilder, private route: Router, private httpClient: HttpClient,private service:ApiService){}
  ngOnInit(){
    this.rfContact = this.fb.group({
      email: ["",[Validators.required]],
      password: ["",[Validators.required]],
    })
  }
  onLogin(){
    this.checkLogin = false;
    this.data = {
      email: this.rfContact.value.email,
      password: this.rfContact.value.password,
    }
    if(this.rfContact.invalid){
      this.checkLogin = true;
      console.log("Hãy nhập đầy đủ thông tin đăng nhập");
    }else{
        this.service.postLogin(this.data).subscribe((res)=>{
        if(res.status == "success"){
          localStorage.setItem('isLogin','true');
          localStorage.setItem('name',this.data.email);
          localStorage.setItem('token',res.data.access_token);
          this.route.navigate(['../', 'layout', 'home']);
          console.log("Đăng nhập thành công!!!")
        }else{
          console.log("Đăng nhập không thành công!!!");
        }
      });
    }
  }
  onRegister(){
    this.route.navigateByUrl('/account/auth/register');
  }
}
