import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnoService } from '../service/alumno.service';
import { Alumno } from '../model/Alumno';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent {
  titulo: string = "Categorias";
  listadoAlumnos: Alumno[] = [];

  constructor(
    private alumnoService: AlumnoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAlumnos();
  }

  getAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe((data: Alumno[]) => {
      this.listadoAlumnos = data;
    });
  }

  create(): void{
    this.router.navigate(['/alumnos-form']);
  }
  
  update(id: number): void{
    this.router.navigate(['/alumnos-form', id]);
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
        this.alumnoService.deleteAlumno(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
}
