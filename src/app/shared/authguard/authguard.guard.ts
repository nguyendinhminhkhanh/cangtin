import { CanActivateFn } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  let isLogin: any;
  if(typeof window !== 'undefined'){
    isLogin = localStorage.getItem('isLogin');
  }
  if(isLogin){
    console.log(isLogin);
    return true;
  }else{
    return false;
  }
};
