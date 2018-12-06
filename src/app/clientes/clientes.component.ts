import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal, { SweetAlertOptions, SweetAlertResult, SweetAlertType } from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import {ModalService} from './detalle/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginator: any;
  selectedCliente: Cliente;
  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
    ) { }

  ngOnInit() {
    this.loadClientes();

    this.modalService.notifyUpload.subscribe(changedCliente => {
      this.clientes = this.clientes.map(c => {
        if (changedCliente.id === c.id) {
          c.photo = changedCliente.photo;
        }
        return c;
      });
    });
  }

  private loadClientes() {
    this.activatedRoute.paramMap.subscribe(p => {
      let page: number = +p.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).subscribe(apiCliente => {
        this.clientes = (apiCliente.content as Cliente[]);
        this.paginator = apiCliente;
      });
    });
  }

  delete(cliente: Cliente): void {
    // this.clienteService.delete(cliente.id);

    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });

    swalWithBootstrapButtons({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          r => {
            this.loadClientes();
            swalWithBootstrapButtons(
                'Deleted!',
                'The record has been deleted.',
                'success'
              );
          }
        );
      } else if ( result.dismiss === swal.DismissReason.cancel) {     // Read more about handling dismissals
        swalWithBootstrapButtons(
          'Cancelled',
          'Operation cancelled.',
          'error'
        );
      }
    });


  }

  showModal(cliente: Cliente) {
    this.selectedCliente = cliente;
    this.modalService.showModal();
  }
}
