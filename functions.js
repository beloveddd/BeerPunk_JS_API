import { BeerItem } from "./BeerItem.js";
import { ENTER_KEY_CODE, BTNS_IDS, SEARCH_INPUT, CLASSES, URL_GET_BEERS, URL_PARAMATERS, BEERS_CONTAINER, ERROR, RECENT_SEARCHES_CONTAINER, CURRENCY, BASIC_BEER_IMG, BEER_OBJ, LOAD_MORE, DISPLAY_PROPERTIES, DIV_FOR_MODAL_OVERLAY, BTN_ARROW_UP } from "./consts.js";

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
    const urlGetBeerName = `${URL_GET_BEERS}?${URL_PARAMATERS.BEER_NAME}=${searchValue}`;

    fetch(urlGetBeerName)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        clearItemsFromBeerContainer();

        if (!data.length) {
            return showError(); 
        }
        
        if (data.length > 2) {
            let counter = 0;
            for (let i = 0; i < data.length; i++) {
                counter++;

                if (i > 1) break;

                addNewBeerItem(data[i], searchValue, counter);
            }
        } else if (data.length) {
            data.forEach( (elem) => {
                addNewBeerItem(elem);
            }); 
        }

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
    div.style.display = DISPLAY_PROPERTIES.NONE;
    container.classList.remove(CLASSES.MODAL_OVERLAY);
}

export function showWarning() {
    const divWarning = document.querySelector(`.${CLASSES.DIV_WARNING}`);

    toggleModal(divWarning, DIV_FOR_MODAL_OVERLAY);
}

export function toggleModal(item, container) {
    item.style.display = DISPLAY_PROPERTIES.BLOCK;
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

export function loadMoreItems() {
    const searchValue = SEARCH_INPUT.value;
    const urlGetBeerName = `${URL_GET_BEERS}?${URL_PARAMATERS.BEER_NAME}=${searchValue}`;

    fetch(urlGetBeerName)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if (data.length > 2) {
            for (let i = 2; i < data.length; i++) {             
                addNewBeerItem(data[i]);
            }
            BEERS_CONTAINER.lastElementChild.scrollIntoView(false);
        } else {
            showWarning();
        }
    });

    SEARCH_INPUT.value = '';
}

export function addLoadMoreButton() {
    const btnLoadMore = document.createElement('button');

    btnLoadMore.id = `${BTNS_IDS.LOAD_MORE}`;
    btnLoadMore.innerHTML = LOAD_MORE;
    BEERS_CONTAINER.append(btnLoadMore);
    btnLoadMore.addEventListener('click', loadMoreItems);
    addArrow();
}

export function addArrow() {
    BTN_ARROW_UP.style.display = DISPLAY_PROPERTIES.BLOCK;
}

export function navigateToTop() {
    BEERS_CONTAINER.firstElementChild.scrollIntoView(false);
    BTN_ARROW_UP.style.display = DISPLAY_PROPERTIES.NONE;
}