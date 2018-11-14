import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal, { SweetAlertOptions, SweetAlertResult, SweetAlertType } from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    // this.clientes = this.clienteService.getClientes();
    this.clienteService.getClientes().subscribe(
       apiCliente => this.clientes = apiCliente
    );
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

}
