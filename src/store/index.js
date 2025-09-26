

// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './rootReducer'

// const store = configureStore({

//     reducer: rootReducer,
//     middleware: getDefaultMiddleware => {
//         return getDefaultMiddleware({
//             serializableCheck: false
//         })
//     },
//     devTools: true

// })
// export default store


import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

import { countryApi } from './features/location/country/countryApi';
import { stateApi } from './features/location/state/stateApi';
import { cityApi } from './features/location/city/cityApi';
import { logoApi } from './features/logo/logoApi';
import { bannerApi } from './features/banner/bannerApi';
import { webInfoApi } from './features/web-info/webInfoApi';

import { categoryApi } from './features/category/categoryApi';
import { dashboardApi } from './features/dashboard/dashboardApi';


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })

            .concat(countryApi.middleware)
            .concat(stateApi.middleware)
            .concat(cityApi.middleware)
            .concat(logoApi.middleware)
            .concat(categoryApi.middleware)
             .concat(bannerApi.middleware)
             .concat(webInfoApi.middleware)
            .concat(dashboardApi.middleware),
    devTools: true,
});

export default store;
