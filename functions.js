import { BeerItem } from "./BeerItem.js";
import { ENTER_KEY_CODE, BTNS_IDS, SEARCH_INPUT, CLASSES, URL_GET_BEERS, URL_PARAMATERS, BEERS_CONTAINER, RECENT_SEARCHES_CONTAINER, CURRENCY, BASIC_BEER_IMG, BEER_OBJ, DISPLAY_PROPERTIES, MODAL_OVERLAY_CONTAINER, BTN_ARROW_UP, ITEMS_PER_PAGE, BTN_LOAD_MORE, DIV_WARNING, DIV_ERROR, DIV_CONTENT, REMOVE, ADD, FAV_BEERS_ARR, DIV_COUNTER_FAV, BTN_FAV, MODAL_FAVOURITES, FAV_BEERS_CONTAINER, BEER_ITEM_MODAL, ESC_KEY_CODE, RECENT_SEARCHES_OBJ, RECENT_SEARCHES_KEY, FAVOURITE_BEERS_KEY } from "./consts.js";

export function checkSearchInputValue(pageCounter, e) {
    const ev = e.target;
    const searchValue = SEARCH_INPUT.value;
    const conditionsForFindingBeers = e.key === ENTER_KEY_CODE || ev.className.includes(BTNS_IDS.SEARCH) || ev.className.includes(CLASSES.RECENT_SEARCH);

    if (ev.id.includes(BTNS_IDS.LOAD_MORE)) {
        if (!searchValue) {
            return showWarning();
        }

        searchBeers(searchValue, pageCounter);
    }

    if (conditionsForFindingBeers) {
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
    const item = Object.values(BEER_OBJ).find( (elem) => elem.id === beerItem.id);
    const price = item ? item.price : getBeerPrice();
    
    return {
        isFavourite: FAV_BEERS_ARR.some( (elem) => elem.id === beerItem.id),
        abv: beerItem.abv,
        foodPairing: beerItem.food_pairing,
        id: beerItem.id,
        name: beerItem.name,
        imageUrl: (beerItem.image_url) ? beerItem.image_url : BASIC_BEER_IMG,
        description: beerItem.description,
        price
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

    BEER_OBJ[beerItem.id] = beerItem;
    renderBeerItem(beerItem);
}

export function renderBeerItem(beerItem) {
    const divBeer = document.createElement('div');

    divBeer.classList.add(`${CLASSES.DIV_BEER}`);
    divBeer.id = beerItem.id;
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
    toggleModal(DIV_WARNING, MODAL_OVERLAY_CONTAINER);
}

export function toggleModal(item, container) {
    setDisplayProperty(item, DISPLAY_PROPERTIES.BLOCK);
    container.classList.add(CLASSES.MODAL_OVERLAY);

    if ( !item.className.includes(CLASSES.MODAL_FAV) && !item.className.includes(CLASSES.MODAL_BEER_ITEM) ) {
        setTimeout(() => hideModal(item, container), 2000);
    }
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
    RECENT_SEARCHES_OBJ[searchValue] = searchValue;
    saveToLocalStorage(RECENT_SEARCHES_OBJ);
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

export function defineTarget(e) {
    const ev = e.target;
    const conditionsForAddRemoveFav = ev.className.includes(CLASSES.FAV_ITEM) && e.key !== ESC_KEY_CODE || ev.className.includes(CLASSES.NOT_FAV_ITEM) && e.key !== ESC_KEY_CODE;

    if (conditionsForAddRemoveFav) {
        addRemoveFavourites(ev);
    }

    if ( ev.className.includes(CLASSES.REMOVE_BTN) ) {
        removeFavourites(ev);
    }

    if ( ev.className.includes(CLASSES.BEER_TITLE) ) {
        showBeerItemModal(ev);
    }

    if (e.key === ESC_KEY_CODE) {
        closeBeerItemModal(ev);
    }
}

export function addRemoveFavourites(ev) {
    const beerItem = Object.values(BEER_OBJ).find((elem) => elem.id === +ev.id);

    if (ev.outerText === REMOVE) {
        beerItem.isFavourite = false;
        deleteElemFromArr(beerItem);
        ev.innerHTML = ADD;
        ev.classList.add(CLASSES.NOT_FAV_ITEM);
        ev.classList.remove(CLASSES.FAV_ITEM);
    } else {
        beerItem.isFavourite = true;
        FAV_BEERS_ARR.push(beerItem);
        ev.innerHTML = REMOVE;
        ev.classList.add(CLASSES.FAV_ITEM);
        ev.classList.remove(CLASSES.NOT_FAV_ITEM);
    }

    if (ev.parentNode.parentNode.parentNode.parentNode === BEER_ITEM_MODAL) {
        findBeerItem(beerItem);
    }

    saveToLocalStorage({...FAV_BEERS_ARR});
    updateCounterFav();
    checkBtnFav();
}

export function updateCounterFav() {
    DIV_COUNTER_FAV.innerHTML = FAV_BEERS_ARR.length;
}

export function checkBtnFav() {
    if (FAV_BEERS_ARR.length) {
        BTN_FAV.disabled = false;
    } else {
        BTN_FAV.disabled = true;
    }
}

export function showFavouriteModal() {
    toggleModal(MODAL_FAVOURITES, MODAL_OVERLAY_CONTAINER);

    FAV_BEERS_ARR.forEach( (elem) => {
        renderBeerPoint(elem);    
    });
}

export function renderBeerPoint(elem) {
    const newBeerPoint = document.createElement('div');
    const newRemoveBtn = document.createElement('button');

    newBeerPoint.id = elem.id;
    newBeerPoint.classList = CLASSES.BEER_POINT;
    newBeerPoint.innerHTML = elem.name;
    newRemoveBtn.id = elem.id;
    newRemoveBtn.classList = CLASSES.REMOVE_BTN;
    newRemoveBtn.innerHTML = REMOVE;
    newBeerPoint.append(newRemoveBtn);
    FAV_BEERS_CONTAINER.append(newBeerPoint);
}

export function closeFavouritesModal() {
    setDisplayProperty(MODAL_FAVOURITES, DISPLAY_PROPERTIES.NONE);
    MODAL_OVERLAY_CONTAINER.classList.remove(CLASSES.MODAL_OVERLAY);
    Array.from(FAV_BEERS_CONTAINER.children).forEach( (elem) => elem.remove());
}

export function removeFavourites(ev) {
    const beerItem = Object.values(BEER_OBJ).find((elem) => elem.id === +ev.id);
    const itemToDeleteHTML = Array.from(FAV_BEERS_CONTAINER.children).find((elem) => elem.id === ev.id);

    //changing the button in the BEERS_CONTAINER
    beerItem.isFavourite = false;
    //deleting from the MODAL_FAVOURITES
    itemToDeleteHTML.remove();
    //deleting from the FAV_BEERS_ARR
    deleteElemFromArr(beerItem);
    findBeerItem(beerItem);
    updateCounterFav();
    checkBtnFav();
    saveToLocalStorage({...FAV_BEERS_ARR});
}

export function deleteElemFromArr(beerItem) {
    const indexOfItemToDelete = FAV_BEERS_ARR.indexOf(beerItem);
    FAV_BEERS_ARR.splice(indexOfItemToDelete, 1);
}

export function showBeerItemModal(ev) {
    const beerItem = Object.values(BEER_OBJ).find((elem) => elem.id === +ev.parentNode.id);

    toggleModal(BEER_ITEM_MODAL, MODAL_OVERLAY_CONTAINER);
    searchBeers();
    BEER_ITEM_MODAL.innerHTML = beerItem.getExtraBeerItemHTML();
}

export function closeBeerItemModal() {
    if (BEER_ITEM_MODAL.style.display !== DISPLAY_PROPERTIES.BLOCK) {
        return;
    }

    setDisplayProperty(BEER_ITEM_MODAL, DISPLAY_PROPERTIES.NONE);
    MODAL_OVERLAY_CONTAINER.classList.remove(CLASSES.MODAL_OVERLAY);
    BEER_ITEM_MODAL.innerHTML = '';
    updateCounterFav();
    checkBtnFav();
}

export function findBeerItem(beerItem) {
    const divTarget = Array.from(BEERS_CONTAINER.children).find((elem) => +elem.id === beerItem.id);

    if(!divTarget) return;

    divTarget.innerHTML = beerItem.getBeerItemHTML();
}

export function saveToLocalStorage(obj) {
    if (obj === RECENT_SEARCHES_OBJ) {
        window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(obj));
    } else {
        window.localStorage.setItem(FAVOURITE_BEERS_KEY, JSON.stringify(obj));
    }
}

export function initRecentSearchesLocalStorage() {
    if (!window.localStorage.getItem(RECENT_SEARCHES_KEY)) return;

    const localRecentSearches = JSON.parse(window.localStorage.getItem(RECENT_SEARCHES_KEY));

    Object.keys(localRecentSearches).forEach( (elem) => addToRecentSearches(elem));
}

export function initFavBeersLocalStorage() {
    if (!window.localStorage.getItem(FAVOURITE_BEERS_KEY)) return;

    const localFavBeers = JSON.parse(window.localStorage.getItem(FAVOURITE_BEERS_KEY));

    Object.values(localFavBeers).forEach( (elem) => {
        FAV_BEERS_ARR.push(elem);
        BEER_OBJ[elem.id] = elem
    });
    updateCounterFav();
    checkBtnFav();
}