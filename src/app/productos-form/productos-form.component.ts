import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../model/Producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './productos-form.component.html',
  styleUrl: './productos-form.component.css'
})
export class ProductosFormComponent {

  
  titulo: string = "";
  productId: number | null = null;
  isNewProducto: boolean = true;
  productoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      nombreProducto: ['', Validators.required],
      descripcionProducto: ['', Validators.required],
      existencia: [0, Validators.required],
      precio: [0, Validators.required],
      categoria: this.fb.group({
        idCategoria: [0, Validators.required],
        nombreCategoria: ['', Validators.required],
        descripcionCategoria: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'] ? +params['id'] : null;
      this.isNewProducto = !this.productId;
      if (!this.isNewProducto) {
        this.getProducto();
        this.titulo = "Editar Producto"
      } else {
        this.titulo = "Nuevo Producto"
      }
    });
  }

  getProducto(): void {
    if (this.productId !== null) {
      this.productoService.getProducto(this.productId).subscribe(
        (producto: Producto) => {
          this.productoForm.patchValue(producto);
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
        }
      );
    }
  }

  guardarProducto(): void {
    if (this.productoForm.valid) {
      const productoData = this.productoForm.value;
      console.log('Datos del producto a enviar:', productoData);

      if (this.isNewProducto) {
        this.productoService.createProducto(productoData).subscribe(
          (response) => {
            console.log('Producto creado exitosamente:', response);
          },
          (error) => {
            console.error('Error al crear el producto:', error);
          }
        );
      } else if (this.productId !== null) {
        this.productoService.updateProducto(productoData, this.productId).subscribe(
          (response) => {
            console.log('Producto actualizado exitosamente:', response);
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
          }
        );
      }
    } else {
      console.error('Formulario inválido. Verifica los campos.');
    }
  }
}
