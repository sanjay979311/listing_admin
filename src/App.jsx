


import { BrowserRouter, Routes, Route } from "react-router";




import ChangePassword from "./components/dashboard/change-password";




import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Summery from "./components/dashboard/summery";

import CategoryList from './components/dashboard/category'
import AddCategory from './components/dashboard/category/AddCategory';
import EditCategory from './components/dashboard/category/EditCategory';

import SubCategoryList from './components/dashboard/sub-category'
import AddSubCategory from './components/dashboard/sub-category/AddSubCategory';
import EditSubCategory from './components/dashboard/sub-category/EditSubCategory';

import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

import LogoList from './components/dashboard/logo';
import AddLogo from './components/dashboard/logo/AddLogo';
import EditLogo from './components/dashboard/logo/EditLogo';

import Country from './components/dashboard/location/country'
import AddCountry from "./components/dashboard/location/country/AddCountry";
import EditCountry from "./components/dashboard/location/country/EditCountry";

import StateList from './components/dashboard/location/state';
import AddState from './components/dashboard/location/state/AddState';
import EditState from './components/dashboard/location/state/EditState';

import CityList from './components/dashboard/location/city';
import AddCity from './components/dashboard/location/city/AddCity';
import EditCity from './components/dashboard/location/city/EditCity';
import BlogList from './components/dashboard/blog';
import WebInfo from "./components/dashboard/web-info";
import BannerList from "./components/dashboard/banner/ListBanners";
import AddBanner from "./components/dashboard/banner/AddBanner";
import EditBanner from "./components/dashboard/banner/EditBanner";
import CourseList from "./components/dashboard/course/CourseList";









function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />

        {/* Allow all roles to access the Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Summery />} /> {/* Show summary to everyone */}




            {/* Admin Only */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="logo-list" element={<LogoList />} />
              <Route path="add-logo" element={<AddLogo />} />
              <Route path="edit-logo/:id" element={<EditLogo />} />


              <Route path="country-list" element={<Country />} />
              <Route path="add-country" element={<AddCountry />} />
              <Route path="edit-country/:id" element={<EditCountry />} />

              <Route path="state-list" element={<StateList />} />
              <Route path="add-state" element={<AddState />} />
              <Route path="edit-state/:id" element={<EditState />} />

              <Route path="city-list" element={<CityList />} />
              <Route path="add-city" element={<AddCity />} />
              <Route path="edit-city/:id" element={<EditCity />} />


              <Route path="category-list" element={<CategoryList />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="edit-category/:id" element={<EditCategory />} />
              <Route path="blog-list" element={<BlogList />} />

                <Route path="sub-category-list" element={<SubCategoryList />} />
                <Route path="add-sub-category" element={<AddSubCategory />} />
                <Route path="edit-sub-category/:id" element={<EditSubCategory />} />

                  <Route path="banner-list" element={<BannerList />} />
                <Route path="add-banner" element={<AddBanner />} />
                <Route path="edit-banner/:id" element={<EditBanner />} />

                 <Route path="course-list" element={<CourseList />} />

             <Route path="web-info" element={<WebInfo />} />

              <Route path="change-password" element={<ChangePassword />} />

            </Route>

          </Route>
        </Route>
        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 404 Page for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

