import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {AuthenService} from '../authen.service';
import {DataService} from '../data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login_form: FormGroup;
  error_message: string;

  constructor(
        public formBuilder: FormBuilder,
        public loadingController: LoadingController,
        public authenService: AuthenService,
        public dataService: DataService,
        private router: Router) {
  }

  ngOnInit() {
    this.login_form = this.formBuilder.group({
           username: new FormControl('', Validators.compose([
               Validators.required
           ])),
           password: new FormControl('', Validators.required)
       });
  }

  async login(value) {
        const loading = await this.loadingController.create({
            duration: 5000,
            message: 'Please wait...'
        });
        loading.present();
        this.authenService.doLogin(value.username, value.password)
            .subscribe(res => {
                    this.authenService.setUser(res);

                    this.dataService.items = [];
                    loading.dismiss();
                    this.router.navigateByUrl('home');
                },
                err => {
                    this.error_message = 'Invalid credentials.';
                    loading.dismiss();
                    console.log(err);
                });
    }

}
