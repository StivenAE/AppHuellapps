import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: "home/:category",
    loadChildren: "./home/home.module#HomePageModule"
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'posts/:id', loadChildren: './noticias/noticias.module#NoticiasPageModule'
  },
  {
    path: 'tienda', loadChildren: './tienda/tienda.module#TiendaPageModule'
  },
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesPageModule' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
