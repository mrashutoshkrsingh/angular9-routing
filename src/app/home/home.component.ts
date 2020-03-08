import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent implements OnInit {

  isLoggedIn:false;

  constructor(private route:Router, private auth:AuthService) { }

  ngOnInit() {
    
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
