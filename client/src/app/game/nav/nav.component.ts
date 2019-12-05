import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GameService} from '../game.service';

function IpValidator(control:FormControl) {
  const ipRegEx = /(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])/; //tslint:disable-line max-line-length
  return ipRegEx.test(control.value) ? null : { //tslint:disable-line no-null-keyword
    IpValidator: {
      valid: false
    }
  };
}

function TrimAndRequiredValidator(control:FormControl) {
  return control.value.toString().trim() !== '' ? null : { //tslint:disable-line no-null-keyword
    TrimAndRequiredValidator: {
      valid: false
    }
  };
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

  form = new FormGroup({
    name: new FormControl('Huhu', TrimAndRequiredValidator),
    ip: new FormControl('192.168.1.16', IpValidator)
    // ip: new FormControl('10.70.138.97', IpValidator)
    // ip: new FormControl('10.70.138.162', IpValidator)
  });

  constructor(public gameService:GameService) { }

  onSubmit() {
    const name = this.form.controls.name.value.toString().trim();
    const ip = this.form.controls.ip.value.toString().trim();
    this.gameService.connectPlayer(name, ip);
  }

}
