import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbModal,
  NgbModalRef,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isLogin = localStorage.getItem('name');
  rfContact:any;
  constructor(
    private route: Router,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.rfContact = this.fb.group({
      email: ['',[Validators.required]],
      currentPassword: ['',[Validators.required]],
      newPassword: ['',[Validators.required]],
    }
    )
  }
  logOut() {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    this.route.navigate(['../', 'account', 'auth', 'login']);
    this.modalService.dismissAll();
  }
  changePassword() {
    this.route.navigateByUrl('/pages/changePassword');
    this.modalService.dismissAll();
  }

  openModalInfor(content: any) {
    const modalRef: NgbModalRef = this.modalService.open(content);
    modalRef.shown?.subscribe(() => {
      console.log('open success');
    });
  }
  closeModalInfor() {
    this.modalService.dismissAll();
  }

  openChangePassword(changePassword: any) {
    this.modalService.dismissAll();
    this.offcanvasService.open(changePassword, {
      ariaLabelledBy: 'offcanvas-basic-title',
    });
  }
  closeModalChangePass() {
    this.offcanvasService.dismiss();
  }
  onChangePass() {
    // console.log("Changr success")
    this.closeModalChangePass();
  }

  openNotify(content: any) {
		this.offcanvasService.open(content, { position: 'end' });
	}
}
