import {Room} from 'colyseus';
import {ArraySchema, MapSchema, Schema, type} from '@colyseus/schema';
import * as _ from 'lodash';
import {CharEnum, IClientMessage, IPlayData} from './citadela.types';

export const REQUIRED_PLAYERS = 6;

export enum Phase {
    seat,
    draft,
    pickCharacter
}

export class Player extends Schema {
    @type('string')
    id = 'id';

    @type('string')
    name = 'player';

    @type('number')
    seatIndex:number;

    pick:CharEnum[] = [];

    constructor(id:string) {
        super();
        this.id = id;
    }
}

export class State extends Schema {
    @type({map:Player})
    players = new MapSchema<Player>();

    @type('uint8')
    phase = Phase.seat;

    seats:Player[] = [];

    @type(['string'])
    characters = new ArraySchema<CharEnum>();

    createPlayer(id:string) {
        const newPlayer = new Player(id);
        this.players[id] = newPlayer;
    }

    removePlayer(id:string) {
        delete this.players[id];
    }

    resolve(id:string, data:IClientMessage) {
        const currentPlayer = this.players[id];

        if (data.playerName !== undefined) {
            currentPlayer.name = data.playerName;
        }
        if (data.seatChange !== undefined) {
            this.resolveSeatChange(currentPlayer, data.seatChange);
            this.seats.length === REQUIRED_PLAYERS - 4 && (this.phase = Phase.draft); // change phase once seats are full
        }
        if (data.play !== undefined) {
            this.resolvePlay(currentPlayer, data.play)
        }
    }

    private resolveSeatChange(currentPlayer:Player, newSeatIndex:number) {
        // remove player from previous seat
        if (currentPlayer.seatIndex !== undefined) {
            this.seats = this.seats.filter((player) => {
                return player.seatIndex !== currentPlayer.seatIndex
            });
        }

        // assign new seat
        currentPlayer.seatIndex = newSeatIndex;

        //add and sort seats by index
        this.seats.push(currentPlayer);
        this.seats.sort((playerA, playerB) => playerA.seatIndex - playerB.seatIndex);
    }

    private isLastPick() {
        let shouldSwitchPhase = true;
        for (const id in this.players) {
            this.players[id].pick.length < 9 && (shouldSwitchPhase = false);
        }
        return shouldSwitchPhase;
    }

    private setMostPickedCharsFromAllPlayers() {
        // loop over player picks (9 char positions)
        for (let i = 0; i < 9; i++) {
            // map the picked chars for the current position and count their picks
            const m = new Map();
            for (const id in this.players) {
                const pickedCharByPlayer = this.players[id].pick[i];
                let val = 1;
                m.has(pickedCharByPlayer) && (val += m.get(pickedCharByPlayer)); // increment count if char exist
                m.set(pickedCharByPlayer, val);
            }
            // get the most picked on the current position
            const mostPicked = [];
            let mostPickCount = 0;
            m.forEach((count, char) => {
                const charCount = m.get(char);
                if (charCount < mostPickCount) {
                    return;
                }
                charCount > mostPickCount && mostPicked.splice(0); // clear the array in case of highest count
                mostPicked.push(char);
                mostPickCount = charCount;
            });
            //push the most picked char (random in case the same picks counts)
            this.characters.push(mostPicked[Math.floor(Math.random() * mostPicked.length)]);
        }
    }

    private resolvePlay(currentPlayer:Player, play:IPlayData) {
        if (play.heroPick !== undefined) {
            currentPlayer.pick.push(play.heroPick);
            if (this.isLastPick()) {
                this.setMostPickedCharsFromAllPlayers();
                this.phase = Phase.pickCharacter;
            }
        }
    }
}

export class CitadelaRoom extends Room<State> {
    maxClients = REQUIRED_PLAYERS;

    onInit(options) {
        console.log('Room created!', options);
        this.setState(new State());
    }

    onJoin(client) {
        this.state.createPlayer(client.id);
    }

    onLeave(client) {
        this.broadcast(`${client.id} left.`);
        //TODO timer for rejoin ?
    }

    onMessage(client, data:IClientMessage) {
        this.state.resolve(client.id, data);
    }

    onDispose() {
        console.log('Dispose CitadelaRoom');
    }

}
