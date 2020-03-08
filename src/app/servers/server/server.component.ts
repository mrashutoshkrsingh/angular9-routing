import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  serverId=1;

  constructor(private serversService: ServersService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
   
    this.serverId=+this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(this.serverId);
    // console.log(this.route.snapshot,this.serverId,this.server)
    this.route.params.subscribe((params:Params)=>{
      this.serverId=+params['id'];
    this.server = this.serversService.getServer(this.serverId);

    })
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.route, queryParamsHandling:'preserve'})
  }

}
