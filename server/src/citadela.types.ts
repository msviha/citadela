export enum CharEnum {
    Jezibaba = 'Jezibaba',
    Mordyrka = 'Mordyrka',
    Soudce = 'Soudce',
    Spion = 'Spion',
    Vyderacka = 'Vyderacka',
    Zlodej = 'Zlodej'
}
export enum CardEnum {
    Hospoda = 'Hospoda',
    StrazniVez = 'StrazniVez',
    Kostel = 'Kostel',
    Opatstvi = 'Opatstvi',
    Cviciste = 'Cviciste',
    Pristav = 'Pristav',
    Palac = 'Palac',
    LoveckyZamek = 'LoveckyZamek'
}
export enum ColorEnum {
    None = 'None',
    Red = 'Red',
    Green = 'Green',
    Blue = 'Blue',
    Gold = 'Gold'
}
export type Characters = {
    [K in CharEnum]: IChar<K>
}
export type Cards = {
    [K in CardEnum]: ICard<K>
}
export interface IPicture {
    picturePath:string;
}
export interface IChar<T> extends IPicture {
    id:T;
    position:number;
}
export interface ICard<T> extends IPicture {
    id:T;
    color:ColorEnum;
    cost:number;
    // effect?
}

export interface IPlayData {
    /**
     * calls end player turn
     */
    prospech?:boolean;
    /**
     * when player picks hero
     * (private)
     */
    heroPick?:CharEnum;
    cardPlay?:CardEnum;
}

export interface IClientMessage {
    message?:string;
    seatChange?:number;
    playerName?:string;
    play?:IPlayData;
}
