import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: "home/:category",loadChildren: "./home/home.module#HomePageModule"},
  { path: 'posts/:id', loadChildren: './noticias/noticias.module#NoticiasPageModule'},
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesPageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
