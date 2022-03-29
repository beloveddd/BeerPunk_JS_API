export const SEARCH_INPUT = document.querySelector('#searchInput');
export const RECENT_SEARCHES_CONTAINER = document.querySelector('#recentSearches');
export const BEERS_CONTAINER = document.querySelector('#beersContainer');
export const DIV_FOR_MODAL_OVERLAY = document.querySelector('.forModalOverlay');
export const BEER_OBJ = {};
export const BASIC_BEER_IMG = 'https://images.punkapi.com/v2/keg.png';
export const BTNS_IDS = {
    FAVOURITES: 'favourites',
    SEARCH: 'search',
    LOAD_MORE: 'loadMore',
    ARROW_UP: 'arrowUp',
}
export const BTN_SEARCH = document.querySelector(`#${BTNS_IDS.SEARCH}`);
export const BTN_ARROW_UP = document.querySelector(`#${BTNS_IDS.ARROW_UP}`);
export const CLASSES = {
    INVALID: 'invalid',
    BEER_ITEM: 'beerItem',
    BEER_TITLE: 'beerTitle',
    BEER_PRICE: 'beerPrice',
    DIV_DESCR: 'divDescr',
    DIV_PR: 'divPr',
    BEER_IMG: 'beerImg',
    BEER_DESCRIPTION: 'beerDescription',
    DIV_BEER: 'divBeer',
    DIV_ERROR: 'divError',
    DIV_WARNING: 'divWarning',
    RECENT_SEARCH: 'recentSearch',
    MODAL_OVERLAY: 'modal-overlay',
}
export const ENTER_KEY_CODE = 'Enter';
export const URL_GET_BEERS = 'https://api.punkapi.com/v2/beers';
export const URL_PARAMATERS = {
    BEER_NAME: 'beer_name',
}
export const ERROR = 'There were no properties found for the given location!';
export const CURRENCY = ' €';
export const LOAD_MORE = 'Load more';
export const DISPLAY_PROPERTIES = {
    BLOCK: 'block',
    NONE: 'none',
}
