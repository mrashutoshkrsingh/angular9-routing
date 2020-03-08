import { Component, OnInit, Injectable, OnChanges, DoCheck, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent implements OnInit,  DoCheck {
  
  // ngAfterContentChecked(): void {
  //   console.log(this.auth,'after')
  // }

  isLoggedIn=false;

  constructor(private route:Router, private auth:AuthService) { }

  ngOnInit() {
    //console.log(this.auth,"Init")
  }

  ngDoCheck(): void {
    this.isLoggedIn=this.auth.loggedIn;
  }
 

  onLoadServers(){
    this.route.navigate(['/servers'], {queryParams:{allowEdit:'1'}, fragment:'loading'})
  }

  onLogin(){
    this.auth.login();
  }
  onLogout(){
    this.auth.logout();
  }
}
