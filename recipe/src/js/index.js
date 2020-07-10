import string from './models/Search';

//import { add as a , multiply as mul, ID } from './views/searchViews';
import * as searchView from './views/searchViews';

console.log(`Using imported functions. ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${string}`);
