import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../model/Producto';
import { ProductoService } from '../service/producto.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  listaProductos: Producto[] = []

  constructor(
    private productoService: ProductoService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this.productoService.getProductos().subscribe((data: Producto[]) => {
      this.listaProductos = data;
    });
  }


  create(): void{
    this.router.navigate(['/form-productos']);
  }

  update(id: number): void{
    this.router.navigate(['/form-productos', id]);
    /*
    Swal.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question"
    });
    */
  }

  eliminar(id: number): void{
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Al eliminar este elemento no podras recuperarlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(id)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
}
