import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  rfContact: any;
  rfContactUpdate: any;
  public listProduct: any[] = [];
  data: any[] = [];
  dataCategory: any;
  checkInfoUpdate = false;
  checkInfoCategory = false;

  // fileToUpload: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private service: ApiService
  ) {}

  ngOnInit(): void {
    this.rfContact = this.fb.group({
      name: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
    });
    this.rfContactUpdate = this.fb.group({
      name: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
    });
    this.checkInfoCategory = false;

    this.service.getListCategory().subscribe((res) => {
      this.data = res.data;
      console.log(this.data);
    });
  }


  handleFileInput(event: any) {
    event = event.target.files[0]; 
    const formdata = new FormData();
    formdata.set("files",event);
    this.service.postImageCategory(formdata).subscribe((res)=>{
      this.rfContact.value.thumbnail = "http://localhost:8080" + res.data;
      console.log(this.rfContact.value.thumbnail);
    })
  }

  onAdd() {
    if (this.rfContact.invalid) {
      console.log('Lỗi thêm sản phẩm');
      this.checkInfoCategory = true;
    } else {
      this.dataCategory = {
        name: this.rfContact.value.name,
        thumbnail: this.rfContact.value.thumbnail,
      };
      console.log(this.dataCategory);
      this.service.postCategory(this.dataCategory).subscribe((res) => {
        console.log(res);
      });
      // window.location.reload();
      this.service.getListCategory().subscribe((res) => {
        this.data = res.data;
        // console.log(this.data);
      });
      this.rfContact.reset();
      this.modalService.dismissAll();
    }
  }

  onDelete(id: any) {
    this.service.delCategory(id).subscribe((res) => {
      console.log(res);
      this.service.getListCategory().subscribe((res) => {
        this.data = res.data;
        // console.log(this.data);
      });
    });
  }

  openModalAdd(modalAdd: any) {
    const modalRef: NgbModalRef = this.modalService.open(modalAdd);
    modalRef.shown?.subscribe(() => {});
  }
  closeModal() {
    this.checkInfoCategory = false;
    this.rfContact.reset();
    this.rfContactUpdate.reset();
    this.modalService.dismissAll();
  }

  openModalEdit(modalEdit:any,id:any){
    console.log(id);
    localStorage.setItem("idCategory",id);
    let currenData;
    this.service.getCategory(id).subscribe((res)=>{
      currenData = res.data;
      console.log(currenData);
      this.rfContactUpdate.setValue({
        name: currenData.name,
        thumbnail:"",
      })
    })
    const modalRef: NgbModalRef = this.modalService.open(modalEdit);
    modalRef.shown?.subscribe(()=>{})
  }

  handleFileInputUpdate(event:any){
    event = event.target.files[0];
    const formdata = new FormData();
    formdata.set("files",event);
    this.service.postImageCategory(formdata).subscribe((res)=>{
      this.rfContactUpdate.value.thumbnail = "http://localhost:8080" + res.data;
      console.log(this.rfContactUpdate.value.thumbnail);
    })
  }

  onUpdate() {
    console.log("update");
    let idCategory = localStorage.getItem("idCategory");
    let newUpdateCategory = {
      id: idCategory,
      name: this.rfContactUpdate.value.name,
      thumbnail: this.rfContactUpdate.value.thumbnail,
    }
    console.log(newUpdateCategory);
    this.service.updateCategory(newUpdateCategory).subscribe((res) => {
      console.log("ham uop ad");
      console.log(res.data);
      // this.service.getListCategory().subscribe((res)=>{
      //   console.log("thanh cong ")
      //   console.log(res.data);
      //   //sua thanh cong

      // });
    });
    this.modalService.dismissAll();
  }



}
