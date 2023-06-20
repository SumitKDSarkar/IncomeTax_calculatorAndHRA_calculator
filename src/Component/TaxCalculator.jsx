import React, { useState } from "react";
import "./TaxCalculator.css";

function Calculator() {
  const [taxPayer, setTaxPayer] = useState(false);
  const [netIncome, setNetIncome] = useState(0);
  const [surcharge, setSurcharge] = useState(0);
  const [educationCess, setEducationCess] = useState(0);
  const [secHigherEducationCess, setSecHigherEducationCess] = useState(0);
  const [totalTaxLiability, setTotalTaxLiability] = useState(0);
  const [relief, setRelief] = useState(0);
  const [tdsCredit, setTdsCredit] = useState(0);
  const [assessedTax, setAssessedTax] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "taxPayer":
        setTaxPayer(e.target.value === "true");
        break;
      case "netIncome":
        setNetIncome(parseFloat(value));
        break;
      case "surcharge":
        setSurcharge(parseFloat(value));
        break;
      case "educationCess":
        setEducationCess(parseFloat(value));
        break;
      case "secHigherEducationCess":
        setSecHigherEducationCess(parseFloat(value));
        break;
      case "tdsCredit":
        setTdsCredit(parseFloat(value));
        break;
      default:
        break;
    }
  };

  const calculateTax = () => {
    let totalTax = 0;
    let reliefAmount = 0;
    let assessedTaxAmount = 0;

    if (taxPayer) {
      const taxableIncome = netIncome - relief - tdsCredit;

      // Apply the tax slabs and rates
      if (taxableIncome <= 250000) {
        totalTax = 0; // No tax
      } else if (taxableIncome > 250000 && taxableIncome <= 500000) {
        totalTax = taxableIncome * 0.05; // 5% tax rate
      } else if (taxableIncome > 500000 && taxableIncome <= 1000000) {
        totalTax = taxableIncome * 0.2; // 20% tax rate
      } else if (taxableIncome > 1000000) {
        totalTax = taxableIncome * 0.3; // 30% tax rate
      }

      // Apply surcharge
      if (surcharge > 0) {
        totalTax += (totalTax * surcharge) / 100;
      }

      // Apply education cess and secondary/higher education cess
      const cessAmount =
        (totalTax * (educationCess + secHigherEducationCess)) / 100;
      totalTax += cessAmount;

      // Calculate relief amount
      reliefAmount = relief;

      // Calculate assessed tax amount
      assessedTaxAmount = totalTax - reliefAmount;
    }

    setTotalTaxLiability(totalTax);
    setRelief(reliefAmount);
    setAssessedTax(assessedTaxAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateTax();
  };

  const handleReset = () => {
    setTaxPayer(false);
    setNetIncome(0);
    setSurcharge(0);
    setEducationCess(0);
    setSecHigherEducationCess(0);
    setTotalTaxLiability(0);
    setRelief(0);
    setTdsCredit(0);
    setAssessedTax(0);
  };

  return (
    <div className="calculator">
      <div className="heading-intro">
        <p className="calculator-intro">(As amended up to Finance Act, 2023)</p>
      </div>

      <div className="heading">
        <h1 className="calculator-title">
          ADVANCE TAX CALCULATOR FOR FINANCIAL YEAR 2023-24
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Tax Payer (Opting for taxation under Section 115BAC)</label>
          <select name="taxPayer" value={taxPayer.toString()} onChange={handleInputChange}>
            <option value="false">SELECT</option>
            <option value="true">YES</option>
            <option value="false">NO</option>
          </select>
        </div>
        <div className="form-field">
          <label>Net Taxable Income:</label>
          <input
            type="number"
            name="netIncome"
            value={netIncome}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Surcharge:</label>
          <input
            type="number"
            name="surcharge"
            value={surcharge}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Education Cess:</label>
          <input
            type="number"
            name="educationCess"
            value={educationCess}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Secondary and Higher Education Cess:</label>
          <input
            type="number"
            name="secHigherEducationCess"
            value={secHigherEducationCess}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>TDS/TCS/MAT (AMT) Credit Utilized:</label>
          <input
            type="number"
            name="tdsCredit"
            value={tdsCredit}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="calculate-button">
            Calculate
          </button>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      <div className="result">
        <label>Total Tax Liability:</label>
        <span>{totalTaxLiability}</span>
      </div>
      <div className="result">
        <label>Relief:</label>
        <span>{relief}</span>
      </div>
      <div className="result">
        <label>Assessed Tax:</label>
        <span>{assessedTax}</span>
      </div>
    </div>
  );
}

export default Calculator;
