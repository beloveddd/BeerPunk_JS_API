import { BTN_ARROW_UP, BTN_SEARCH, SEARCH_INPUT } from "./consts.js";
import { addArrow, checkSearchInputValue, navigateToTop } from "./functions.js";

SEARCH_INPUT.addEventListener('keydown', checkSearchInputValue);
BTN_SEARCH.addEventListener('click', checkSearchInputValue);
BTN_ARROW_UP.addEventListener('click', navigateToTop);
window.addEventListener('wheel', addArrow);