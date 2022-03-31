export const SEARCH_INPUT = document.querySelector('#searchInput');
export const RECENT_SEARCHES_CONTAINER = document.querySelector('#recentSearches');
export const BEERS_CONTAINER = document.querySelector('#beersContainer');
export const MODAL_OVERLAY_CONTAINER = document.querySelector('.forModalOverlay');
export const FAV_BEERS_CONTAINER = document.querySelector('#divForFavBeers');
export const BEER_ITEM_MODAL = document.querySelector('.forBeerItemModal');
export const BEER_OBJ = {};
export const FAV_BEERS_ARR = [];
export const RECENT_SEARCHES_OBJ = {};
export const BASIC_BEER_IMG = 'https://images.punkapi.com/v2/keg.png';
export const BTNS_IDS = {
    FAVOURITES: 'favourites',
    SEARCH: 'search',
    LOAD_MORE: 'loadMore',
    ARROW_UP: 'arrowUp',
    CLOSE_MODAL: 'closeModal',
}
export const BTN_CLOSE_MODAL = document.querySelector(`#${BTNS_IDS.CLOSE_MODAL}`);
export const BTN_FAV = document.querySelector(`#${BTNS_IDS.FAVOURITES}`);
export const BTN_SEARCH = document.querySelector(`#${BTNS_IDS.SEARCH}`);
export const BTN_LOAD_MORE = document.querySelector(`#${BTNS_IDS.LOAD_MORE}`);
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
    DIV_CONTENT: 'content',
    FAV_ITEM: 'favouriteItem',
    NOT_FAV_ITEM: 'notFavouriteItem',
    COUNTER_FAV: 'counterFav',
    MODAL_FAV: 'divFavourites',
    BEER_POINT: 'beerPoint',
    REMOVE_BTN: 'removeBtn',
    MODAL_BEER_ITEM: 'forBeerItemModal',
    PUNK_LITTLE: 'punkLittle',
}
export const MODAL_FAVOURITES = document.querySelector(`.${CLASSES.MODAL_FAV}`);
export const DIV_WARNING = document.querySelector(`.${CLASSES.DIV_WARNING}`);
export const DIV_ERROR = document.querySelector(`.${CLASSES.DIV_ERROR}`);
export const DIV_CONTENT = document.querySelector(`.${CLASSES.DIV_CONTENT}`);
export const DIV_COUNTER_FAV = document.querySelector(`.${CLASSES.COUNTER_FAV}`);
export const ENTER_KEY_CODE = 'Enter';
export const ESC_KEY_CODE = 'Escape';
export const URL_GET_BEERS = 'https://api.punkapi.com/v2/beers';
export const URL_PARAMATERS = {
    BEER_NAME: 'beer_name',
    PAGE: 'page',
    PER_PAGE: 'per_page',
}
export const CURRENCY = ' €';
export const LOAD_MORE = 'Load more';
export const ADD = 'Add';
export const REMOVE = 'Remove';
export const ITEMS_PER_PAGE = 2;
export const DISPLAY_PROPERTIES = {
    BLOCK: 'block',
    NONE: 'none',
}
export const RECENT_SEARCHES_KEY = 'recentSearches';
export const FAVOURITE_BEERS_KEY = 'favouriteBeers';
export const IMG_PATH = 'images/punk.png';