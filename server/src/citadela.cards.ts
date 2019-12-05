import {CardEnum, Cards, ColorEnum} from './citadela.types';

export const cards:Cards = {
    [CardEnum.Hospoda]: {
        id: CardEnum.Hospoda,
        color: ColorEnum.Green,
        cost: 1,
        picturePath: './assets/cards/1-green-hospoda.png'
    },
    [CardEnum.StrazniVez]: {
        id: CardEnum.StrazniVez,
        color: ColorEnum.Red,
        cost: 1,
        picturePath: './assets/cards/1-red-strazni-vez.png'
    },
    [CardEnum.Kostel]: {
        id: CardEnum.Kostel,
        color: ColorEnum.Blue,
        cost: 2,
        picturePath: './assets/cards/2-blue-kostel.png'
    },
    [CardEnum.Opatstvi]: {
        id: CardEnum.Opatstvi,
        color: ColorEnum.Blue,
        cost: 3,
        picturePath: './assets/cards/.png'
    },
    [CardEnum.Cviciste]: {
        id: CardEnum.Cviciste,
        color: ColorEnum.Red,
        cost: 3,
        picturePath: './assets/cards/.png'
    },
    [CardEnum.Pristav]: {
        id: CardEnum.Pristav,
        color: ColorEnum.Green,
        cost: 4,
        picturePath: './assets/cards/.png'
    },
    [CardEnum.LoveckyZamek]: {
        id: CardEnum.LoveckyZamek,
        color: ColorEnum.Gold,
        cost: 3,
        picturePath: './assets/cards/.png'
    },
    [CardEnum.Palac]: {
        id: CardEnum.Palac,
        color: ColorEnum.Gold,
        cost: 5,
        picturePath: './assets/cards/.png'
    }
}
