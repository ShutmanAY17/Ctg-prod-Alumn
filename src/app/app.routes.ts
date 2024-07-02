import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { AlumnoFormComponent } from './alumno-form/alumno-form.component';
import { AlumnosComponent } from './alumnos/alumnos.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home/',
        pathMatch: 'full'
    },
    {
        path:'', component: HomeComponent
    },
    {
        path:'operaciones', component: OperacionesComponent
    },
    {
        path:'categorias', component: CategoriasComponent
    },
    {
        path:'form-categorias/:id', component: CategoriaFormComponent
    },
    {
        path:'form-categorias', component: CategoriaFormComponent
    },
    {
        path:'productos', component: ProductosComponent
    },
    {
        path:'form-productos/:id', component: ProductosFormComponent
    },
    {
        path:'form-productos', component: ProductosFormComponent
    },
    {
        path:'alumnos-form/:id', component: AlumnoFormComponent
    },
    {
        path:'alumnos-form', component: AlumnoFormComponent
    },
    {
        path:'alumnos', component: AlumnosComponent
    }
    
];
