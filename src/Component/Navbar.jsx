import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={style.Navbar}>
      <Link to="/" className={style.link}>
        <button className={style.button}>INCOME TAX CALCULATOR</button>
      </Link>

      <Link to="/house-rent-allowance" className={style.link}>
        <button className={style.button}>HOUSE RENT ALLOWANCE</button>
      </Link>
    </div>
  );
}

export default Navbar;
