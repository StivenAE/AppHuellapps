import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs';
import {AuthenService} from './authen.service';
const ENDPOINT_URL = "https://huellapps.com/wp-json/";

@Injectable({
  providedIn: 'root'
})
export class DataService {

      items: any[] = [];
      page = 1;
      totalPages = 1;

      constructor(private http: HttpClient, public authenService: AuthenService) {
      }

      getPosts(): any {
       if (this.items.length > 0) {
           return of(this.items);
       } else {
           const user = this.authenService.getUser();
           if (user) {
               return this.http.get(ENDPOINT_URL + 'wp/v2/posts?_embed&status=any&token=' + user.token,
                   {observe: 'response', headers: {'Authorization': 'Bearer ' + user.token}})
                   .map(this.processPostData, this);
           } else {
               return this.http.get(ENDPOINT_URL + 'wp/v2/posts?_embed', {observe: 'response'})
                   .map(this.processPostData, this);
           }
       }
   }
   /**
    * Obtiene la siguiente página de publicaciones.
    */
   getMorePosts(): any {
       this.page++;
       return this.http.get(ENDPOINT_URL + 'wp/v2/posts?_embed&page=' + this.page, {observe: 'response'})
           .map(this.processPostData, this);
   }
   // Un lugar para el procesamiento posterior, antes de que los datos obtenidos estén disponibles para verlos.
   processPostData(resp: HttpResponse<any[]>) {
       this.totalPages = +resp.headers.get('X-WP-TotalPages'); // operador unario (+) convierte la cadena a un número
       resp.body.forEach((item: any) => {
           this.items.push(item);
       });
       return this.items;
   }
   getPostBySlug(slug): any {
       return this.items.find(item => item.slug === slug);
   }
   hasMorePosts() {
       return this.page < this.totalPages;
   }



}
