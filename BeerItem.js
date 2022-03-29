import { CLASSES } from "./consts.js";

export class BeerItem {
    searchValue;

    constructor(beerData, searchValue) {
        Object.assign(this, {...beerData});
        this.searchValue = searchValue;
    }

    getBeerItemHTML() {
        return `
        <div id="${this.id}" class="${CLASSES.BEER_ITEM}">
            <h3 class="${CLASSES.BEER_TITLE}">Beer: ${this.name}</h3>
            <div class="${CLASSES.DIV_DESCR}">
                <img class="${CLASSES.BEER_IMG}" src="${this.imageUrl}" alt="${this.name}">
                <div class="${CLASSES.DIV_PR}">
                    <div class="${CLASSES.BEER_DESCRIPTION}">${this.description}</div>
                    <div class="${CLASSES.BEER_PRICE}">Price: ${this.price}</div>
                </div>
            </div>
        </div>
        `;
    }
}