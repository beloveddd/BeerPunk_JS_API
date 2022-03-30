import { BEERS_CONTAINER, BTN_ARROW_UP, BTN_LOAD_MORE, BTN_SEARCH, CLASSES, RECENT_SEARCHES_CONTAINER, SEARCH_INPUT } from "./consts.js";
import { addArrow, checkSearchInputValue, navigateToTop, defineTarget } from "./functions.js";

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

    if (ev.className !== CLASSES.RECENT_SEARCH) {
        return;
    }

    SEARCH_INPUT.value = ev.outerText;
    pageCounter = 1;
    checkSearchInputValue(pageCounter, e);
});
BEERS_CONTAINER.addEventListener('click', defineTarget);