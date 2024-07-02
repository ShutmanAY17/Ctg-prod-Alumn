import { Component } from '@angular/core';

@Component({
  selector: 'app-operaciones',
  standalone: true,
  imports: [],
  templateUrl: './operaciones.component.html',
  styleUrl: './operaciones.component.css'
})
export class OperacionesComponent {
  titulo: string = 'Operaciones'
  resultado: number = 0;
  grados: number = 10;

  convertir() {
    
  }
}
