import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/Categoria';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent {

  titulo: string = "";
  categoryId: number = 0;
  isNewCategoria: boolean = false;
  categoriaForm: FormGroup; // Declarar FormGroup para el formulario

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private categoriaService: CategoriaService ) { 
    this.categoriaForm = this.fb.group({
      nombreCategoria: ['', Validators.required],
      descripcionCategoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id']; // Recuperar el ID de la categoría desde los parámetros de la ruta
      this.isNewCategoria = isNaN(this.categoryId); // Verificar si es un nuevo registro o una edición
      console.log('ID de categoría:', this.categoryId); // Debug
      if (!this.isNewCategoria) {
        this.getCategoria();
        this.titulo = "Editar categoria"
      } else {
        this.titulo = "Nueva categoria"
      }
    });
  }


  getCategoria(): void {
    this.categoriaService.getCategoriaById(this.categoryId).subscribe(
      (categoria: Categoria) => {
        // Llenar el formulario con los datos de la categoría existente
        this.categoriaForm.patchValue({
          nombreCategoria: categoria.nombreCategoria,
          descripcionCategoria: categoria.descripcionCategoria
        });
      },
      (error) => {
        console.error('Error al obtener la categoría:', error); // Manejar el error adecuadamente según tus necesidades
      }
    );
  }

  guardarCategoria(): void {
    if (this.categoriaForm.valid) {
      const categoriaData = this.categoriaForm.value;
      console.log('Datos de categoría:', categoriaData);
      if (this.isNewCategoria) {
        this.categoriaService.createCategoria(categoriaData).subscribe(
          (response) => {
            console.log('Categoría creada exitosamente:', response);
            // Aquí puedes redirigir a otra página o hacer cualquier otra acción después de crear la categoría
          },
          (error) => {
            console.error('Error al crear la categoría:', error); // Manejar el error adecuadamente según tus necesidades
          }
        );
      } else {
        // Actualizar una categoría existente
        this.categoriaService.updateCategoria(categoriaData, this.categoryId).subscribe(
          (response) => {
            console.log('Categoría actualizada exitosamente:', response);
            // Aquí puedes redirigir a otra página o hacer cualquier otra acción después de actualizar la categoría
          },
          (error) => {
            console.error('Error al actualizar la categoría:', error); // Manejar el error adecuadamente según tus necesidades
          }
        );
      }
    } else {
      console.error('Formulario inválido. Verifica los campos.');
    }
  }
}
