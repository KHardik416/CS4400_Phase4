import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard"; 
import AddEmployee from "./components/Employee/AddEmployee"; 
import HireEmployee from "./components/Employee/HireEmployee";
import FireEmployee from "./components/Employee/FireEmployee";
import AddOwner from "./components/Owner/AddOwner";
import AddBusiness from "./components/Owner/AddBusiness";
import AddLocation from "./components/Owner/AddLocation";
import StartFunding from "./components/Owner/StartFunding";
import AddVan from "./components/Vans/AddVan";
import TakeoverVan from "./components/Vans/TakeoverVan";
import LoadVan from "./components/Vans/LoadVan";
import RefuelVan from "./components/Vans/RefuelVan";
import DriveVan from "./components/Vans/DriveVan";
import RemoveVan from "./components/Vans/RemoveVan";
import AddDriver from "./components/Driver/AddDriver";
import RemoveDriver from "./components/Driver/RemoveDriver";
import AddService from "./components/Service/AddService";
import ManageService from "./components/Service/ManageService";
import AddProduct from "./components/Product/AddProduct";
import PurchaseProduct from "./components/Product/PurchaseProduct";
import RemoveProduct from "./components/Product/RemoveProduct";
import EmployeeView from "./components/Views/ViewEmployee";
import OwnerView from "./components/Views/ViewOwners";
import DriverView from "./components/Views/ViewDrivers";
import LocationView from "./components/Views/ViewLocations";
import ProductView from "./components/Views/ViewProducts";
import ServiceView from "./components/Views/ViewServices";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/hire-employee" element={<HireEmployee />} />
        <Route path="/fire-employee" element={<FireEmployee />} />
        <Route path="/add-owner" element={<AddOwner />} />
        <Route path="/add-business" element={<AddBusiness />} />
        <Route path="/add-location" element={<AddLocation />} />
        <Route path="/start-funding" element={<StartFunding />} />
        <Route path="/add-van" element={<AddVan />} />
        <Route path="/takeover-van" element={<TakeoverVan />} />
        <Route path="/load-van" element={<LoadVan />} />
        <Route path="/refuel-van" element={<RefuelVan />} />
        <Route path="/drive-van" element={<DriveVan />} />
        <Route path="/remove-van" element={<RemoveVan />} />
        <Route path="/add-driver" element={<AddDriver />} />
        <Route path="/remove-driver" element={<RemoveDriver />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/manage-service" element={<ManageService />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/purchase-product" element={<PurchaseProduct />} />
        <Route path="/remove-product" element={<RemoveProduct />} />
        <Route path="/employee-view" element={<EmployeeView />} />
        <Route path="/owner-view" element={<OwnerView />} />
        <Route path="/driver-view" element={<DriverView />} />
        <Route path="/location-view" element={<LocationView />} />
        <Route path="/product-view" element={<ProductView />} />
        <Route path="/service-view" element={<ServiceView />} />



      </Routes>
    </Router>
  );
}

export default App;
