import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate{
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  serverId=1;
  allowEdit=false;
  changesSaved=false;

  constructor(private serversService: ServersService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
   // console.log(this.route.snapshot);
    this.route.queryParams.subscribe((queryParams:Params)=>{
     console.log('queryParams', queryParams)
     this.allowEdit=queryParams['allowEdit']==1?true:false
    })
    this.serverId=+this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(this.serverId);
    // console.log(this.route.snapshot,this.serverId,this.server)
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved=true;
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // if(!this.allowEdit)
    // return true;
    if((this.serverName!==this.server.name || this.serverStatus!== this.server.status) && !this.changesSaved){
      return confirm('Do you want to discard the changes? ')
    }
    return true;
  }

}
