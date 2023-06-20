import { Route, Routes } from "react-router-dom";
import TaxCalculator from "../Component/TaxCalculator";
import { HouseRentAllowance } from "../Component/HouseRentAllowance";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TaxCalculator />} />
      <Route path="/house-rent-allowance" element={<HouseRentAllowance />} />
    </Routes>
  );
};

export default AllRoutes;
