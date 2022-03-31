import { BEERS_CONTAINER, BTN_ARROW_UP, BTN_CLOSE_MODAL, BTN_FAV, BTN_LOAD_MORE, BTN_SEARCH, CLASSES, RECENT_SEARCHES_CONTAINER, SEARCH_INPUT, MODAL_FAVOURITES, BEER_ITEM_MODAL } from "./consts.js";
import { addArrow, checkSearchInputValue, navigateToTop, defineTarget, showFavouriteModal, closeFavouritesModal, initRecentSearchesLocalStorage, initFavBeersLocalStorage } from "./functions.js";

let pageCounter = 1;

SEARCH_INPUT.addEventListener('keydown', function addItemsEnter(e) {
    pageCounter = 1;
    checkSearchInputValue(pageCounter, e);
});
BTN_SEARCH.addEventListener('click', function addItemsClick(e) {
    pageCounter = 1;
    checkSearchInputValue(pageCounter, e);
});
BTN_LOAD_MORE.addEventListener('click', function loadMoreItems(e) {
    pageCounter++;
    checkSearchInputValue(pageCounter, e);
});
BTN_ARROW_UP.addEventListener('click', navigateToTop);
window.addEventListener('wheel', addArrow);
RECENT_SEARCHES_CONTAINER.addEventListener('click', function searchByRecentSearches(e) {
    const ev = e.target;

    if (ev.className !== CLASSES.RECENT_SEARCH) return;

    SEARCH_INPUT.value = ev.outerText;
    pageCounter = 1;
    checkSearchInputValue(pageCounter, e);
});
BEERS_CONTAINER.addEventListener('click', defineTarget);
BTN_FAV.addEventListener('click', showFavouriteModal);
BTN_CLOSE_MODAL.addEventListener('click', closeFavouritesModal);
MODAL_FAVOURITES.addEventListener('click', defineTarget);
document.addEventListener('keydown', defineTarget);
BEER_ITEM_MODAL.addEventListener('click', defineTarget);
initRecentSearchesLocalStorage();
initFavBeersLocalStorage();