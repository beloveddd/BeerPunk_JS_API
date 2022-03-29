import { BeerItem } from "./BeerItem.js";
import { ENTER_KEY_CODE, BTNS_IDS, SEARCH_INPUT, CLASSES, URL_GET_BEERS, URL_PARAMATERS, BEERS_CONTAINER, RECENT_SEARCHES_CONTAINER, CURRENCY, BASIC_BEER_IMG, BEER_OBJ, LOAD_MORE, DISPLAY_PROPERTIES, DIV_FOR_MODAL_OVERLAY, BTN_ARROW_UP, ITEMS_PER_PAGE, BTN_LOAD_MORE } from "./consts.js";

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
    }
}

export function searchBeers(searchValue) {
    let pageCounter = 1;
    const urlGetBeerName = `${URL_GET_BEERS}?${URL_PARAMATERS.PAGE}=${pageCounter}&${URL_PARAMATERS.PER_PAGE}=${ITEMS_PER_PAGE}&${URL_PARAMATERS.BEER_NAME}=${searchValue}`;

    fetch(urlGetBeerName)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        clearItemsFromBeerContainer();

        if (!data.length) {
            return showError(); 
        }

        let counter = 0;
        data.forEach( (elem) => {
            addNewBeerItem(elem, counter);
        }); 

        addLoadMoreButton();
        addToRecentSearches(searchValue);
        BEERS_CONTAINER.firstElementChild.scrollIntoView(false);
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
        imageUrl: (beerItem.image_url) ? beerItem.image_url : BASIC_BEER_IMG,
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

export function addNewBeerItem(elem, searchValue, counter) {
    const beerData = parseBeerData(elem);
    const beerItem = new BeerItem(beerData, searchValue);

    BEER_OBJ[searchValue + counter] = beerItem;
    renderBeerItem(beerItem);
}

export function renderBeerItem(beerItem) {
    const divBeer = document.createElement('div');

    divBeer.classList.add(`${CLASSES.DIV_BEER}`);
    divBeer.innerHTML = beerItem.getBeerItemHTML();
    BEERS_CONTAINER.append(divBeer);
}

export function showError() {
    const divError = document.querySelector(`.${CLASSES.DIV_ERROR}`);
    const beersContainerParent = BEERS_CONTAINER.parentNode;

    toggleModal(divError, beersContainerParent);
}

export function hideModal(div, container) {
    setDisplayProperty(div, DISPLAY_PROPERTIES.NONE);
    container.classList.remove(CLASSES.MODAL_OVERLAY);
}

export function showWarning() {
    const divWarning = document.querySelector(`.${CLASSES.DIV_WARNING}`);

    toggleModal(divWarning, DIV_FOR_MODAL_OVERLAY);
}

export function toggleModal(item, container) {
    setDisplayProperty(item, DISPLAY_PROPERTIES.BLOCK);
    container.classList.add(CLASSES.MODAL_OVERLAY);
    setTimeout(hideModal.bind(null, item, container), 2000);
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

export function loadMoreItems(pageCounter) {
    const searchValue = SEARCH_INPUT.value;

    if (!searchValue) {
        return showWarning();
    }

    pageCounter++;

    const urlGetBeerName = `${URL_GET_BEERS}?${URL_PARAMATERS.PAGE}=${pageCounter}&${URL_PARAMATERS.PER_PAGE}=${ITEMS_PER_PAGE}&${URL_PARAMATERS.BEER_NAME}=${searchValue}`;

    fetch(urlGetBeerName)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if (!data.length) {
            return showWarning();
        }

        data.forEach( (elem) => {
            addNewBeerItem(elem);
        });           
        BEERS_CONTAINER.lastElementChild.scrollIntoView(false);
    })
    .catch( (e) => {
        showWarning();
    });

    SEARCH_INPUT.value = '';
}

export function addLoadMoreButton() {
    setDisplayProperty(BTN_LOAD_MORE, DISPLAY_PROPERTIES.BLOCK);
    addArrow();
}

export function addArrow() {
    setDisplayProperty(BTN_ARROW_UP, DISPLAY_PROPERTIES.BLOCK);
}

export function navigateToTop() {
    BEERS_CONTAINER.firstElementChild.scrollIntoView(false);
    setDisplayProperty(BTN_ARROW_UP, DISPLAY_PROPERTIES.NONE);
}

export function setDisplayProperty(item, property) {
    item.style.display = property;
}