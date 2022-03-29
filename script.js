import { BTN_ARROW_UP, BTN_LOAD_MORE, BTN_SEARCH, SEARCH_INPUT } from "./consts.js";
import { addArrow, checkSearchInputValue, loadMoreItems, navigateToTop } from "./functions.js";

let pageCounter = 1;

SEARCH_INPUT.addEventListener('keydown', checkSearchInputValue);
BTN_SEARCH.addEventListener('click', checkSearchInputValue);
BTN_LOAD_MORE.addEventListener('click', loadMoreItems.bind(null, pageCounter));
BTN_ARROW_UP.addEventListener('click', navigateToTop);
window.addEventListener('wheel', addArrow);