import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GameService} from "../game/game.service";

function IpValidator(control:FormControl) {
  const ipRegEx = /(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])/;
  return ipRegEx.test(control.value) ? null : {
    IpValidator: {
      valid: false
    }
  };
}

function TrimAndRequiredValidator(control:FormControl) {
  return control.value.toString().trim() !== '' ? null : {
    TrimAndRequiredValidator: {
      valid: false
    }
  };
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('Huhu', TrimAndRequiredValidator),
    ip: new FormControl('1.1.1.1', IpValidator)
  });

  name = '';
  ip = '';

  connected = false;

  constructor(public gameService:GameService) { }

  ngOnInit() {
  }

  onSubmit() {
    // mocked connection and response to game service
    this.name = this.form.controls.name.value.toString().trim();
    this.ip = this.form.controls.ip.value.toString().trim();
    this.connected = true;
    this.gameService.connectPlayer(this.name);
  }

}
