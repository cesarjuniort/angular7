import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modal = false;
  constructor() { }

  showModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}
