import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const ENDPOINT_URL = "https://huellapps.com/wp-json/";
@Injectable({
    providedIn: 'root'
})
export class AuthenService {
    private user: any;
    constructor(private http: HttpClient) {
    }
    /**
     * Login to WordPress via JWT. Returns object with the following shape:
     */
    doLogin(username, password) {
        return this.http.post(ENDPOINT_URL + 'jwt-auth/v1/token', {
            username: username,
            password: password
        });
    }
    validateAuthToken(token) {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Basic ' + token);
        return this.http.post(ENDPOINT_URL + 'jwt-auth/v1/token/validate?token=' + token,
            {}, {headers: headers});
    }
    getUser() {
        return this.user;
    }
    setUser(user) {
        this.user = user;
    }
}
