import { CommonEngine } from '@angular/ssr';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../shared/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  rfContact: any;
  inforRegister: any;
  checkFullInfo: any;
  constructor(private fb: FormBuilder, private route: Router,private httpClient: HttpClient, private service: ApiService){}
  ngOnInit(){
    this.rfContact = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
    })
  }
  onRegister(){
    this.inforRegister = {
      userName: this.rfContact.value.name,
      email: this.rfContact.value.email,
      password: this.rfContact.value.password,
    }
    this.checkFullInfo = false;
    if(this.rfContact.invalid){
      this.checkFullInfo = true;
      console.log("Hãy nhập đủ thông tin đăng kí!!");
    }else{
        this.service.postRegister(this.inforRegister).subscribe((res)=>{
        console.log(res);
        this.route.navigateByUrl("account/auth/login");
        console.log("Đăng kí thành công!!!");
      })
    }
  }
  onLogin(){
    this.route.navigateByUrl('account/auth/login');
  }


}
