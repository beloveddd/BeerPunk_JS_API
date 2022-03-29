import { BTN_ARROW_UP, BTN_LOAD_MORE, BTN_SEARCH, SEARCH_INPUT } from "./consts.js";
import { addArrow, checkSearchInputValue, navigateToTop, searchBeers } from "./functions.js";

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