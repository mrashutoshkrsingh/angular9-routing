import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  serverId=1;
  allowEdit=false

  constructor(private serversService: ServersService, private route:ActivatedRoute) { }

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
  }

}
