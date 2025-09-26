

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import categoryReducer from './reducers/categoryReducer';
import subCategoryReducer from './reducers/subCategoryReducer';
import logoReducer from './reducers/logoReducer';
import { countryApi } from './features/location/country/countryApi'; // Import bannerApi
import { stateApi } from './features/location/state/stateApi';
import { cityApi } from './features/location/city/cityApi';
import { logoApi } from './features/logo/logoApi';
import { webInfoApi } from './features/web-info/webInfoApi';
import { bannerApi } from './features/banner/bannerApi';
import { categoryApi } from './features/category/categoryApi';
import { dashboardApi } from './features/dashboard/dashboardApi';
import postsReducer from './features/post/postSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    category: categoryReducer,
    subCategories: subCategoryReducer,
    logos: logoReducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [stateApi.reducerPath]: stateApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [logoApi.reducerPath]: logoApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
     [bannerApi.reducerPath]: bannerApi.reducer,
    [webInfoApi.reducerPath]: webInfoApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,

});

export default rootReducer;