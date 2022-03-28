import { BeerItem } from "./BeerItem.js";
import { ENTER_KEY_CODE, BTNS_IDS, SEARCH_INPUT, CLASSES, URL_GET_BEERS, URL_PARAMATERS, BEERS_CONTAINER, ERROR, RECENT_SEARCHES_CONTAINER, CURRENCY } from "./consts.js";

export function checkSearchInputValue(e) {
    const ev = e.target;

    if (e.key === ENTER_KEY_CODE || ev.className.includes(BTNS_IDS.SEARCH)) {
        const searchValue = SEARCH_INPUT.value;

        if (!searchValue) {
            markAsInvalid(SEARCH_INPUT);
            return;
        }
    
        markAsValid(SEARCH_INPUT);
        searchBeers(searchValue);
        SEARCH_INPUT.value = '';
    }
}

export function searchBeers(searchValue) {
    const urlGetBeerName = `${URL_GET_BEERS}?${URL_PARAMATERS.BEER_NAME}=${searchValue}`;

    fetch(urlGetBeerName)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        clearItemsFromBeerContainer();
        data.forEach( (elem) => {
            addNewBeerItem(elem);
        });
        BEERS_CONTAINER.firstElementChild.scrollIntoView(false);

        if (data.length) {
            addToRecentSearches(searchValue);
        }
    })
    .catch( (e) => {
        showError();
    });   
}

export function markAsValid(input) {
    input.classList.remove(CLASSES.INVALID);
}

export function markAsInvalid(input) {
    input.classList.add(CLASSES.INVALID);
}

export function parseBeerData(beerItem) {
    return {
        id: beerItem.id,
        name: beerItem.name,
        imageUrl: beerItem.image_url,
        description: beerItem.description,
        price: getBeerPrice(),
    } 
}

export function getBeerPrice() {
    function randomInteger(min, max) {
        const rand = min - 0.5 + Math.random() * (max - min + 1);

        return rand.toFixed(2) + CURRENCY;
    }

    return randomInteger(5, 10);
}

export function addNewBeerItem(elem) {
    const beerData = parseBeerData(elem);
    const beerItem = new BeerItem(beerData);

    renderBeerItem(beerItem);
}

export function renderBeerItem(beerItem) {
    const divBeer = document.createElement('div');

    divBeer.classList.add(`${CLASSES.DIV_BEER}`);
    divBeer.innerHTML = beerItem.getBeerItemHTML();
    BEERS_CONTAINER.append(divBeer);
}

export function showError() {
    const divError = document.createElement('div');

    divError.classList.add(`${CLASSES.DIV_ERROR}`);
    divError.innerHTML = ERROR;
    BEERS_CONTAINER.append(divError);
}

export function clearItemsFromBeerContainer() {
    Array.from(BEERS_CONTAINER.children).forEach( (elem) => elem.remove());
}

export function addToRecentSearches(searchValue) {
    const recentItem = Array.from(RECENT_SEARCHES_CONTAINER.children).find( (elem) => elem.outerText === searchValue);

    if (recentItem) {
        return;
    }

    const searchItem = document.createElement('div');

    searchItem.classList.add(`${CLASSES.RECENT_SEARCH}`);
    searchItem.innerHTML = searchValue;
    RECENT_SEARCHES_CONTAINER.append(searchItem);
}