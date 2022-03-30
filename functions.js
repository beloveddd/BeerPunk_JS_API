import { BeerItem } from "./BeerItem.js";
import { ENTER_KEY_CODE, BTNS_IDS, SEARCH_INPUT, CLASSES, URL_GET_BEERS, URL_PARAMATERS, BEERS_CONTAINER, RECENT_SEARCHES_CONTAINER, CURRENCY, BASIC_BEER_IMG, BEER_OBJ, LOAD_MORE, DISPLAY_PROPERTIES, DIV_FOR_MODAL_OVERLAY, BTN_ARROW_UP, ITEMS_PER_PAGE, BTN_LOAD_MORE, DIV_WARNING, DIV_ERROR, DIV_CONTENT } from "./consts.js";

export function checkSearchInputValue(pageCounter, e) {
    const ev = e.target;
    const searchValue = SEARCH_INPUT.value;

    if (ev.id.includes(BTNS_IDS.LOAD_MORE)) {
        if (!searchValue) {
            return showWarning();
        }

        searchBeers(searchValue, pageCounter);
    }

    if (e.key === ENTER_KEY_CODE || ev.className.includes(BTNS_IDS.SEARCH) || ev.className.includes(CLASSES.RECENT_SEARCH)) {
        if (!searchValue) {
            return markAsInvalid(SEARCH_INPUT);
        }
    
        searchBeers(searchValue, pageCounter);
    }

    markAsValid(SEARCH_INPUT);
}

export function searchBeers(searchValue, pageCounter) {
    const urlGetBeerName = `${URL_GET_BEERS}?${URL_PARAMATERS.PAGE}=${pageCounter}&${URL_PARAMATERS.PER_PAGE}=${ITEMS_PER_PAGE}&${URL_PARAMATERS.BEER_NAME}=${searchValue}`;

    fetch(urlGetBeerName)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if (pageCounter === 1) {
            clearItemsFromBeerContainer();
            setDisplayProperty(BTN_LOAD_MORE, DISPLAY_PROPERTIES.NONE);
            setDisplayProperty(BTN_ARROW_UP, DISPLAY_PROPERTIES.NONE);

            if (!data.length) {
                SEARCH_INPUT.value = '';
                return showError(); 
            }

            addLoadMoreButton();
            addToRecentSearches(searchValue);
            data.forEach( (elem) => {
                addNewBeerItem(elem);
            });
            BEERS_CONTAINER.firstElementChild.scrollIntoView(false);
        } else {
            if (!data.length) {
                SEARCH_INPUT.value = '';
                return showWarning();
            }
    
            data.forEach( (elem) => {
                addNewBeerItem(elem);
            });
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

export function addNewBeerItem(elem, searchValue) {
    const beerData = parseBeerData(elem);
    const beerItem = new BeerItem(beerData, searchValue);

    BEER_OBJ[beerItem.id] = beerItem;
    renderBeerItem(beerItem);
}

export function renderBeerItem(beerItem) {
    const divBeer = document.createElement('div');

    divBeer.classList.add(`${CLASSES.DIV_BEER}`);
    divBeer.innerHTML = beerItem.getBeerItemHTML();
    BEERS_CONTAINER.append(divBeer);
}

export function showError() {
    toggleModal(DIV_ERROR, DIV_CONTENT);
}

export function hideModal(div, container) {
    setDisplayProperty(div, DISPLAY_PROPERTIES.NONE);
    container.classList.remove(CLASSES.MODAL_OVERLAY);
}

export function showWarning() {
    toggleModal(DIV_WARNING, DIV_FOR_MODAL_OVERLAY);
}

export function toggleModal(item, container) {
    setDisplayProperty(item, DISPLAY_PROPERTIES.BLOCK);
    container.classList.add(CLASSES.MODAL_OVERLAY);
    setTimeout(() => hideModal(item, container), 2000);
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