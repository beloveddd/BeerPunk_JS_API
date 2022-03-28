export const SEARCH_INPUT = document.querySelector('#searchInput');
export const RECENT_SEARCHES_CONTAINER = document.querySelector('#recentSearches');
export const BEERS_CONTAINER = document.querySelector('#beersContainer');
export const BTNS_IDS = {
    FAVOURITES: 'favourites',
    SEARCH: 'search',
}
export const BTN_SEARCH = document.querySelector(`#${BTNS_IDS.SEARCH}`);
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
    RECENT_SEARCH: 'recentSearch',
}
export const ENTER_KEY_CODE = 'Enter';
export const URL_GET_BEERS = 'https://api.punkapi.com/v2/beers';
export const URL_PARAMATERS = {
    BEER_NAME: 'beer_name',
}
export const ERROR = 'There were no properties found for the given location!';
export const CURRENCY = ' €';
