import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
// import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import {ModalService} from './modal.service';


@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  private selectedPhoto: File;
  titulo = 'Details';
  uploadProgress = 0;


  constructor(private clienteService: ClienteService,
    private modalService: ModalService) { }

  ngOnInit() {
    // this.activatedRouter.paramMap.subscribe(params => {
    //   const id: number = +params.get('id');
    //   if (id) {
    //     this.clienteService.getCliente(id).subscribe(c => {
    //       this.cliente = c;
    //     });
    //   }
    // });
  }

  setSelectedPhoto(event) {
    if (event) {
      const selFile = event.target.files[0];
      if (selFile.type.indexOf('image') < 0) {
        swal('Bad file', 'The file type must be an image file.', 'error');
        this.selectedPhoto = null;
        return;
      }
      this.selectedPhoto = selFile;
      console.log('selected photo: ', this.selectedPhoto);
    }
    this.uploadProgress = 0;
  }

  uploadPhoto() {
    if (!this.selectedPhoto) {
      swal('Error', 'Please select a photo.', 'warning');
      return;
    }
    this.clienteService.uploadPhoto(this.selectedPhoto, this.cliente.id)
    .subscribe( evt => {
      if (evt.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round((evt.loaded / evt.total ) * 100);
      } else if (evt.type === HttpEventType.Response) {
        const response: any = evt.body;
        this.cliente = response.cliente as Cliente;
        this.modalService.notifyUpload.emit(this.cliente); // broadcast that the current cliente has updated its profile picture.
        swal('Completed successfully!', `The photo has been uploaded successfully! File: ${this.cliente.photo}`, 'success');
      }
      // this.cliente = c;
     });
  }

  closeModal() {
    this.modalService.closeModal();
    this.uploadProgress = 0;
    this.selectedPhoto = null;
  }

}
