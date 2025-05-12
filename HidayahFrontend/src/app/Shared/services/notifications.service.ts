import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private getToastInstance(type: 'success' | 'error' | 'warning' | 'info') {
    return Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: `custom-toast-${type}`
      },
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  success(title: string) {
    this.getToastInstance('success').fire({ title, icon: 'success' });
  }
  
  error(title: string) {
    this.getToastInstance('error').fire({ title, icon: 'error' });
  }
  
  warning(title: string) {
    this.getToastInstance('warning').fire({ title, icon: 'warning' });
  }
  
  info(title: string) {
    this.getToastInstance('info').fire({ title, icon: 'info' });
  }
   // 🔔 Modal-style auto-close alert (not a toast)
   timedAlert(title:string,icon: 'success' | 'error' | 'warning' | 'info' | 'question') {
    Swal.fire({
      title:title,
      text: '',
      icon,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  }
  
}
