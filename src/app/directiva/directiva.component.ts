import { Component, OnInit } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {
  habilitar = false;
  listaCurso: string[] = ['TypeScript', 'JS', 'Java', 'C#', 'Php'];
  constructor() { }

  toggleHabilitar() {
    this.habilitar = !this.habilitar;
  }
}
