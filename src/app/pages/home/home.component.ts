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

    this.service.getData().subscribe((res) => {
      this.data = res.data;
      console.log(this.data);
    });
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
      this.service.postData(this.dataCategory).subscribe((res) => {
        console.log(res);
      });
      // window.location.reload();
      this.service.getData().subscribe((res) => {
        this.data = res.data;
        // console.log(this.data);
      });
      this.rfContact.reset();
      this.modalService.dismissAll();
    }
  }

  onDelete(id: any) {
    this.service.delData(id).subscribe((res) => {
      console.log(res);
      this.service.getData().subscribe((res) => {
        this.data = res.data;
        // console.log(this.data);
      });
    });
  }

  onUpdate(id: any) {
    this.service.updateData(id).subscribe((res) => {
      console.log(res);
    });
  }

  openModalAdd(modalAdd: any) {
    const modalRef: NgbModalRef = this.modalService.open(modalAdd);
    modalRef.shown?.subscribe(() => {});
  }
  closeModal() {
    this.rfContact.reset();
    this.rfContactUpdate.reset();
    this.modalService.dismissAll();
  }

  openModalEdit(modalEdit:any){
    const modalRef: NgbModalRef = this.modalService.open(modalEdit);
    modalRef.shown?.subscribe(()=>{})
  }

}
