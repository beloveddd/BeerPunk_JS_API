import { ADD, CLASSES, REMOVE } from "./consts.js";

export class BeerItem {

    constructor(beerData) {
        Object.assign(this, {...beerData});
    }

    getBeerItemHTML() {
        const classBtn = this.isFavourite ? CLASSES.FAV_ITEM : CLASSES.NOT_FAV_ITEM;
        const textBtn = this.isFavourite ? REMOVE : ADD;

        return `
        <div id="${this.id}" class="${CLASSES.BEER_ITEM}">
            <h3 class="${CLASSES.BEER_TITLE}">Beer: ${this.name}</h3>
            <div class="${CLASSES.DIV_DESCR}">
                <img class="${CLASSES.BEER_IMG}" src="${this.imageUrl}" alt="${this.name}">
                <div class="${CLASSES.DIV_PR}">
                    <div class="${CLASSES.BEER_DESCRIPTION}">${this.description}</div>
                    <div class="${CLASSES.BEER_PRICE}">Price: ${this.price}</div>
                    <button id="${this.id}" class="${classBtn}">${textBtn}</button>
                </div>
            </div>
        </div>
        `;
    }
}

