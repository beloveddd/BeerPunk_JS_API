import { BTN_SEARCH, SEARCH_INPUT } from "./consts.js";
import { checkSearchInputValue } from "./functions.js";

SEARCH_INPUT.addEventListener('keydown', checkSearchInputValue);
BTN_SEARCH.addEventListener('click', checkSearchInputValue);