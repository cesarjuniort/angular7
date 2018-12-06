import { Injectable, EventEmitter} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modal = false;
  constructor() { }

  private _notifyUpload = new EventEmitter<any>();

  showModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  get notifyUpload(): EventEmitter<any> {
    return this._notifyUpload;
  }
}
