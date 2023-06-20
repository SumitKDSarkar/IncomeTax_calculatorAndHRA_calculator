import React, { useState } from "react";
import style from "./HouseRentAllowance.module.css";

export const HouseRentAllowance = () => {
  const [basicSalary, setBasicSalary] = useState(0);
  const [da, setDa] = useState(0);
  const [commission, setCommission] = useState(0);
  const [hraReceived, setHraReceived] = useState(0);
  const [rentPaid, setRentPaid] = useState(0);
  const [isMetroCity, setIsMetroCity] = useState(false);
  const [exemptedHra, setExemptedHra] = useState(0);
  const [taxableHra, setTaxableHra] = useState(0);

  const calculateHra = () => {
    const hraBasic = 0.5 * (basicSalary + da);
    const hraActual = hraReceived - 0.1 * (basicSalary + da);
    const hra40 = 0.4 * (basicSalary + da);

    const calculatedExemptedHra = Math.min(hraActual, hraBasic, hra40);
    let commissionHra = (commission / 100) * (basicSalary + da);

    if (isMetroCity) {
      commissionHra = Math.min(commissionHra, 0.5 * (basicSalary + da));
    } else {
      commissionHra = Math.min(commissionHra, 0.4 * (basicSalary + da));
    }

    const totalExemptedHra = calculatedExemptedHra + commissionHra;
    const finalExemptedHra = totalExemptedHra >= 0 ? totalExemptedHra : 0;

    setExemptedHra(finalExemptedHra);
    setTaxableHra(hraReceived - finalExemptedHra);
  };
  const resetValues = () => {
    setBasicSalary(0);
    setDa(0);
    setCommission(0);
    setHraReceived(0);
    setRentPaid(0);
    setIsMetroCity(false);
    setExemptedHra(0);
    setTaxableHra(0);
  };

  return (
    <div className={style.container}>
      <div className={style.heading_intro}>
        <p className="calculator-intro">(As amended upto Finance Act, 2023)</p>
      </div>
      <div className={style.heading}>
        <h1 className={style.calculator_title}>HOUSE RENT ALLOWANCE</h1>
      </div>
      <div className={style.form_field}>
        <label>Basic Salary:</label>
        <input
          type="number"
          value={basicSalary}
          onChange={(e) => setBasicSalary(parseFloat(e.target.value))}
        />
      </div>
      <div className={style.form_field}>
        <label>DA forming part of salary:</label>
        <input
          type="number"
          value={da}
          onChange={(e) => setDa(parseFloat(e.target.value))}
        />
      </div>
      <div className={style.form_field}>
        <label>Commission (% of turnover):</label>
        <input
          type="number"
          value={commission}
          onChange={(e) => setCommission(parseFloat(e.target.value))}
        />
      </div>
      <div className={style.form_field}>
        <label>HRA Received:</label>
        <input
          type="number"
          value={hraReceived}
          onChange={(e) => setHraReceived(parseFloat(e.target.value))}
        />
      </div>
      <div className={style.form_field}>
        <label>Rent Paid:</label>
        <input
          type="number"
          value={rentPaid}
          onChange={(e) => setRentPaid(parseFloat(e.target.value))}
        />
      </div>
      <div className={style.form_field}>
        <label>Metro City:</label>
        <input
          type="checkbox"
          checked={isMetroCity}
          onChange={(e) => setIsMetroCity(e.target.checked)}
        />
      </div>
      <div className={style.button_container}>
        <button className={style.calculate_button} onClick={calculateHra}>
          Calculate
        </button>
        <button className={style.reset_button} onClick={resetValues}>
          Reset
        </button>
      </div>
      <div className={style.form_field}>
        <label>Exempted House Rent Allowance:</label>
        <span>{exemptedHra >= 0 ? exemptedHra : 0}</span>
      </div>
      <div className={style.form_field}>
        <label>Taxable House Rent Allowance:</label>
        <span>{taxableHra}</span>
      </div>
    </div>
  );
};

export default HouseRentAllowance;
