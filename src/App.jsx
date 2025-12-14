
import './app.css'

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

import AreaList from './components/dashboard/location/area';
import AddArea from './components/dashboard/location/area/AddArea';
import EditArea from './components/dashboard/location/area/EditArea';
import SeoTemplate from './components/dashboard/seo-template';

// import BlogList from './components/dashboard/blog';
import WebInfo from "./components/dashboard/web-info";
import BannerList from "./components/dashboard/banner/ListBanners";
import AddBanner from "./components/dashboard/banner/AddBanner";
import EditBanner from "./components/dashboard/banner/EditBanner";
import CourseList from "./components/dashboard/course/CourseList";
import AddCourse from "./components/dashboard/course/add-course/AddCourse";
import EditCourse from "./components/dashboard/course/edit/EditCourse";

import PackageList from "./components/dashboard/package/PackageList";
import AddPackage from "./components/dashboard/package/AddPackage";
import EditPackage from "./components/dashboard/package/EditPackage";

import FaqList from "./components/dashboard/faq/List";
import AddFaq from "./components/dashboard/faq/Add";
import EditFaq from "./components/dashboard/faq/Edit";

import BlogList from "./components/dashboard/blog/List";
import AddBlog from "./components/dashboard/blog/Add";
import EditBlog from "./components/dashboard/blog/Edit";

import Seo from "./components/dashboard/seo";

import ManageStudent from "./components/dashboard/users/student/List";
import AddStudent from "./components/dashboard/users/student/Add";
import EditStudent from "./components/dashboard/users/student/Edit";

import AdsList from './components/dashboard/ads/List'
import CreateBlugAds from './components/dashboard/ads/Add';
import EditAds from './components/dashboard/ads/Edit';










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
             <Route path="seo-template" element={<SeoTemplate />} />

              <Route path="country-list" element={<Country />} />
              <Route path="add-country" element={<AddCountry />} />
              <Route path="edit-country/:id" element={<EditCountry />} />

              <Route path="state-list" element={<StateList />} />
              <Route path="add-state" element={<AddState />} />
              <Route path="edit-state/:id" element={<EditState />} />

              <Route path="city-list" element={<CityList />} />
              <Route path="add-city" element={<AddCity />} />
              <Route path="edit-city/:id" element={<EditCity />} />

               <Route path="area-list" element={<AreaList />} />
              <Route path="add-area" element={<AddArea />} />
              <Route path="edit-area/:id" element={<EditArea />} />


              <Route path="category-list" element={<CategoryList />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="edit-category/:id" element={<EditCategory />} />

              <Route path="ads-list" element={<AdsList />} />
              <Route path="create-bulk-ads" element={<CreateBlugAds />} />
              <Route path="edit-ads/:id" element={<EditAds />} />
              
              <Route path="blog-list" element={<BlogList />} />
              <Route path="add-blog" element={<AddBlog />} />
              <Route path="edit-blog/:id" element={<EditBlog />} />

                <Route path="sub-category-list" element={<SubCategoryList />} />
                <Route path="add-sub-category" element={<AddSubCategory />} />
                <Route path="edit-sub-category/:id" element={<EditSubCategory />} />

                  <Route path="banner-list" element={<BannerList />} />
                <Route path="add-banner" element={<AddBanner />} />
                <Route path="edit-banner/:id" element={<EditBanner />} />

                 <Route path="manage-course" element={<CourseList />} />
                  <Route path="add-course" element={<AddCourse />} />
                    <Route path="edit-course/:id" element={<EditCourse />} />

                   <Route path="package-list" element={<PackageList />} />
                  <Route path="add-package" element={<AddPackage />} />
                  <Route path="edit-package/:id" element={<EditPackage />} />

                    <Route path="faq-list" element={<FaqList />} />
                  <Route path="add-faq" element={<AddFaq />} />
                  <Route path="edit-faq/:id" element={<EditFaq />} />

                    <Route path="student-list" element={<ManageStudent />} />
                  <Route path="add-student" element={<AddStudent />} />
                  <Route path="edit-student/:id" element={<EditStudent />} />

                   <Route path="seo-settings" element={<Seo />} />

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

