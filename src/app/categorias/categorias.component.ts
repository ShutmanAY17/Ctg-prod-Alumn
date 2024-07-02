import { Component } from '@angular/core';
import { Categoria } from '../model/Categoria';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'
import { CategoriaService } from '../service/categoria.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  titulo: string = "Categorias";
  listadoDeCategorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe((data: Categoria[]) => {
      this.listadoDeCategorias = data;
    });
  }

  create(): void{
    this.router.navigate(['/form-categorias']);
  }
  
  update(id: number): void{
    this.router.navigate(['/form-categorias', id]);
    /*
    Swal.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question"
    });*/
  }

  eliminar(id: number): void{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.deleteCategoria(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
}
