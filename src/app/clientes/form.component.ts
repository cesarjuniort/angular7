import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal, { SweetAlertOptions, SweetAlertResult, SweetAlertType } from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo = 'Crear Cliente';
  private errors: string[];
  constructor(private clienteSvr: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.loadCustomer();
  }

  public create(): void {
    this.clienteSvr.create(this.cliente).subscribe(
      response => {
        this.navigateToList(); // this.router.navigate(['/clientes']);
        this.showToast('Saved successfully!');
      },
      err => {
        this.errors = err.error.errors as string[]; // this.errors is an array of string binded to the View.
      }
    );
    console.log(this.cliente);
  }

  private showToast(msg: string, toastType: SweetAlertType = 'success') {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: toastType,
      title: msg
    });
  }

  loadCustomer(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clienteSvr.getCliente(id).subscribe( (c) => this.cliente = c);
      }
    });
  }

  navigateToList(): void {
    this.router.navigate(['/clientes']);
  }

  update(): void {
    this.clienteSvr.update(this.cliente).subscribe(
      resp => {
        this.navigateToList();
        this.showToast('Updated successfully!');
      }
    );
  }
}
