import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  private cliente: Cliente;
  private selectedPhoto: File;
  titulo = 'Details';

  constructor(private clienteService: ClienteService, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(c => {
          this.cliente = c;
        });
      }
    });
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
  }

  uploadPhoto() {
    if (!this.selectedPhoto) {
      swal('Error', 'Please select a photo.', 'warning');
      return;
    }
    this.clienteService.uploadPhoto(this.selectedPhoto, this.cliente.id)
    .subscribe( c => {
      this.cliente = c;
      swal('Completed successfully!', `The photo has been uploaded successfully! File: ${this.cliente.photo}`, 'success');
     });
  }

}
