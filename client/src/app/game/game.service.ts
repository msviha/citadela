import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  started = false;
  playerConnected = false;
  playerName = '';

  seats = [
    {
      player: undefined
    },
    {
      player: undefined
    },
    {
      player: undefined
    },
    {
      player: undefined
    },
    {
      player: undefined
    },
    {
      player: undefined
    }
  ];

  player = {
    playerChange: new Subject<void>(),
    playerName: '',
    crown: false
  };

  constructor() { }

  connectPlayer(name:string) {
    //mocked without server communication
    this.playerConnected = true;
    this.player.playerName = name;
  }

  sitPlayer(index:number) {
    this.seats[index].player = this.player;
  }
}
