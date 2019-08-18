import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameService} from "../game.service";

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss']
})
export class SeatComponent implements OnInit {

  @Input()
  index:number;

  constructor(public gameService:GameService) { }

  ngOnInit() {
  }

  takeSeat() {
    //mock send data to server and update gameService.seats
    this.gameService.sitPlayer(this.index);
  }

}
