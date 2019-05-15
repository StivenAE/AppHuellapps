import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { NoticiasService } from "./../noticias.service";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  constructor(private route: ActivatedRoute, private noticiaSrvc: NoticiasService) { }
  post$: Observable<any>;
  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.noticiaSrvc.fetchPost(params.get("id")))
    );
  }

}
