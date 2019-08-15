import { Component, OnInit } from '@angular/core';
import * as Colyseus from 'colyseus.js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  inputVal = 'asd';

  room;

  messages:string[] = [];

  constructor() {}

  ngOnInit() {
    const client = new Colyseus.Client('ws://localhost:4201');
    this.room = client.join('chat');
    
    this.room.listen('messages/:index', (change) => {
        console.log('change: ', change);
    });

    this.room.onJoin.add(() => {
      console.log('joined');
    });

    this.room.onStateChange.addOnce((state) => {
      console.log('initial room state: ', state);
    });

    // new room state
    this.room.onStateChange.add((state) => {
      // this signal is triggered on each patch
      console.log('stateChange triggers: ', state);
    });

    // listen to patches coming from the server
    this.room.onMessage.add((message) => {
      this.messages.push(message);
    });

  }

  send() {
    console.log('input:', this.inputVal);
    this.room.send({message: this.inputVal});
    this.inputVal = '';
  }

}
