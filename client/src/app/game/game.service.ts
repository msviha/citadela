import {Injectable} from '@angular/core';
import * as Colyseus from 'colyseus.js';
import {CharEnum} from '../citadela.types';

export interface IPlayers {
    [key:string]:IPlayer;
}

export interface IPlayer {
    id:string;
    name:string;
    seatIndex?:number;
}

export class Player implements IPlayer {
    name:string;

    constructor(public id:string) {
    }
}

export enum StateChanges {
    players = 'players',
    phase = 'phase',
    characters = 'characters'
}

export enum Phase {
    seat,
    draft,
    pickCharacter
}

@Injectable({
    providedIn: 'root'
})
export class GameService {

    room:Colyseus.Room;

    player:IPlayer;
    players:IPlayers = {};

    seats:Array<undefined | IPlayer> = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
    ];

    joined = false;

    phase = Phase.seat;

    pickedCharacters:CharEnum[];

    connectPlayer(name:string, ip:string) {
        const client = new Colyseus.Client(`ws://${ip}:4201`);

        client.onOpen.add(() => {
            console.log('connection is now open');
        });
        client.onClose.add(() => {
            console.log('connection has been closed');
        });
        client.onError.add((err) => {
            console.log('something wrong happened', err);
        });

        this.room = client.join('citadela');

        this.room.onMessage.add((data) => {
            console.log('onMessage: ', data);
        });

        this.room.onJoin.add(() => {
            this.joined = true;

            this.room.state.onChange = (changes) => {
                console.log(changes);
                for (const change of changes) {
                    if (change.field === StateChanges.phase) {
                        this.processPhaseChange(change.value);
                    }
                    if (change.field === StateChanges.characters) {
                        this.pickedCharacters = change.value;
                    }
                }
            };

            this.room.send({playerName: name}); // update player name on server

            // listen to patches coming from the server
            this.room.state.players.onAdd = (player, id) => {
                this.players[id] = new Player(id);
                console.log('onAdd');
                this.updatePlayer(player, id);
            };
            this.room.state.players.onRemove = (player, id) => {
                delete this.players[id];
            };
            this.room.state.players.onChange = (player, id) => {
                this.updatePlayer(player, id);
            };
        });
    }

    sitPlayer(seatIndex:number) {
        this.room.send({seatChange: seatIndex});
    }

    pick(n:number) {
        this.room.send({play: {heroPick: n}});
    }

    private updatePlayer(player:IPlayer, id:string) {
        // update player name
        this.players[id].name = player.name;

        // update player seat
        if (player.seatIndex !== undefined) {
            const currentPlayer = this.players[id];
            this.seats[currentPlayer.seatIndex] = undefined;
            currentPlayer.seatIndex = player.seatIndex;
            this.seats[currentPlayer.seatIndex] = this.players[id];
        }
    }

    private processPhaseChange(phase:Phase) {
        this.phase = phase;

    }
}
