


import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

import { countryApi } from './features/location/country/countryApi';
import { stateApi } from './features/location/state/stateApi';
import { cityApi } from './features/location/city/cityApi';
import { areaApi } from './features/location/area/areaApi';
import { logoApi } from './features/logo/logoApi';
import { bannerApi } from './features/banner/bannerApi';
import { webInfoApi } from './features/web-info/webInfoApi';
import { postApi } from './features/post/postApi';
import { categoryApi } from './features/category/categoryApi';
import { dashboardApi } from './features/dashboard/dashboardApi';


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(countryApi.middleware)
            .concat(stateApi.middleware)
            .concat(cityApi.middleware)
            .concat(areaApi.middleware)
            .concat(postApi.middleware)
            .concat(logoApi.middleware)
            .concat(categoryApi.middleware)
            .concat(bannerApi.middleware)
            .concat(webInfoApi.middleware)
            .concat(dashboardApi.middleware),
    devTools: true,
});

export default store;
