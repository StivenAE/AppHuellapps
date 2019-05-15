import { Observable } from "rxjs";
import { NoticiasService } from "./../noticias.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  public categories$: Observable<any>;
    public items: Array<{ title: string; note: string; icon: string }> = [];
    constructor(private postSrvc: NoticiasService) {}

    ngOnInit() {
      this.categories$ = this.postSrvc.fetchPostCategories();
    }
}
