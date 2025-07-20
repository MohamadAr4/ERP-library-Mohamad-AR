import PhFOperations, {
  PhFOper_EQ,
  PhFOper_NE,
  PhFOper_GT,
  PhFOper_GE,
  PhFOper_LT,
  PhFOper_LE,
  PhFOper_BT,
  PhFOper_NB,
  PhFOper_ST,
  PhFOper_ED,
  PhFOper_CT,
  PhFOper_NST,
  PhFOper_NED,
  PhFOper_NCT,
  PhFC_Text,
  PhFC_Number,
  PhFC_DatePicker,
  PhFC_Autocomplete,
  PhFC_Select,
} from "../../../../operation";
import BaseUrl from "../../../../contants";
import axios from "axios";
export const GetOptions = async (
  PhToken,
  userID,
  setNewOption,
  setInputs,
  inputs,
  rows,
  setRows,
  rowId
) => {
  try {
    const url = `${BaseUrl}UC/Emp/Employee/${userID}`;
    const headers = {
      periodId: 2022,
      Accept: "application/json",
      Authorization: `Bearer ${PhToken}`,
      "Content-Type": "application/json",
    };
    console.log(headers);
    const response = await axios.get(url, { headers: headers });
    console.log(response);
    if (response.data.status === true) {
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        const OldSalaryField = meta.Column.find((f) => f.field === "osal");
        const NewSalaryField = meta.Column.find((f) => f.field === "nsal");
        const salay = response.data.data.Obj.basesal;
        const financesal = response.data.data.Obj.financesal;
        const insursal = response.data.data.Obj.insursal;

        updatedRows[rowId][OldSalaryField.rfield] = salay;
        updatedRows[rowId][NewSalaryField.rfield] = salay;

        updatedRows[rowId][OldSalaryField.element] = financesal;
        updatedRows[rowId][NewSalaryField.element] = financesal;

        updatedRows[rowId][OldSalaryField.rElement] = insursal;
        updatedRows[rowId][NewSalaryField.rElement] = insursal;

        if (inputs.SaltypId === "1") {
          updatedRows[rowId][OldSalaryField.field] = salay;
          updatedRows[rowId][NewSalaryField.field] = salay;
        } else if (inputs.SaltypId === "2") {
          updatedRows[rowId][OldSalaryField.field] = financesal;
          updatedRows[rowId][NewSalaryField.field] = financesal;
        } else if (inputs.SaltypId === "3") {
          updatedRows[rowId][OldSalaryField.field] = insursal;
          updatedRows[rowId][NewSalaryField.field] = insursal;
        } else {
          updatedRows[rowId][OldSalaryField.field] = salay;
          updatedRows[rowId][NewSalaryField.field] = salay;
        }
        return updatedRows;
      });
    }
  } catch (error) {
    console.error("Error fetching new store data:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error", error.message);
    }
    console.error(error.config);
  }
  return inputs;
};
export const typeCallBack = async (
  event,
  e,
  inputs,
  setInputs,
  rows,
  setRows
) => {
  console.log(event.target.options[event.target.selectedIndex].value);
  console.log(rows);
  if (event.target.options[event.target.selectedIndex].value === "1") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change = (parseFloat(row.osal) * parseFloat(inputs.Perc)) / 100;
      console.log("change",change);
      if (parseFloat(change) < parseFloat(inputs.Nmin)) {
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(inputs.Nmin) + parseFloat(row.osal);
      } else if (parseFloat(change) > parseFloat(inputs.Nmax)) {
        row.chnge = parseFloat(inputs.Nmax)
        row.nsal = parseFloat(inputs.Nmax) + parseFloat(row.osal);
      } else {
        console.log('ascbiusvbci;sbiucbsaiu;cba')
        rows.chnge = parseFloat(change);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (event.target.options[event.target.selectedIndex].value === "2") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      if (parseFloat(inputs.Amt) < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (parseFloat(inputs.Amt) > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = parseFloat(inputs.Amt);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (event.target.options[event.target.selectedIndex].value === "3") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change =
        ((parseFloat(row.osal) + parseFloat(inputs.Amt)) *
          parseFloat(inputs.Perc)) /
        100;
      let finalchange = change;
      console.log(finalchange);
      if (finalchange < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (finalchange > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = finalchange;
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (event.target.options[event.target.selectedIndex].value === "4") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change = (parseFloat(row.osal) * parseFloat(inputs.Perc)) / 100;
      let finalchange = change + parseFloat(inputs.Amt);
      console.log(finalchange);
      if (finalchange < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (finalchange > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = finalchange;
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (event.target.options[event.target.selectedIndex].value === "5") {
    meta.Column[4].disable = true;
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
  } else if (event.target.options[event.target.selectedIndex].value === "6") {
    meta.Column[4].disable = false;
    meta.Fields[7].Form.disabled = true;
    meta.Fields[8].Form.disabled = true;
    meta.Fields[9].Form.disabled = true;
    meta.Fields[10].Form.disabled = true;
    rows.reduce((minus, row) => {
      const changeField = meta.Column.find((f) => f.field === "chnge");
      const NewSalaryField = meta.Column.find((f) => f.field === "nsal");
      const OldSalaryField = meta.Column.find((f) => f.field === "osal");
      if (
        changeField &&
        row[changeField.field] !== undefined &&
        NewSalaryField &&
        row[NewSalaryField.field] !== undefined
      ) {
        row[NewSalaryField.field] =
          parseFloat(row[changeField.field]) +
          parseFloat(row[OldSalaryField.field]);
      }
    }, 0);
  }
  return inputs;
};
export const precCallBack = async (
  event,
  e,
  inputs,
  setInputs,
  rows,
  setRows
) => {
  if (inputs.TypeId === "1") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change =
        (parseFloat(row.osal) * parseFloat(event.target.value)) / 100;
      console.log("prec", change);
      if (parseFloat(change) < parseFloat(inputs.Nmin)) {
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(inputs.Nmin) + parseFloat(row.osal);
      } else if (parseFloat(change) > parseFloat(inputs.Nmax)) {
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(inputs.Nmax) + parseFloat(row.osal);
      } else {
        row.chnge = parseFloat(change);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "3") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change =
        ((parseFloat(row.osal) + parseFloat(inputs.Amt)) *
          parseFloat(event.target.value)) /
        100;
      let finalchange = change;
      console.log("amount then prec", finalchange);
      if (finalchange < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (finalchange > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = finalchange;
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "4") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change =
        (parseFloat(row.osal) * parseFloat(event.target.value)) / 100;
      let finalchange = change + parseFloat(inputs.Amt);
      console.log("prec then amount", finalchange);
      if (finalchange < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (finalchange > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = finalchange;
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  }
  return inputs;
};
export const amountCallBack = async (
  event,
  e,
  inputs,
  setInputs,
  rows,
  setRows
) => {
  if (inputs.TypeId === "2") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      if (parseFloat(event.target.value) < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (parseFloat(event.target.value) > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = parseFloat(event.target.value);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "3") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change =
        ((parseFloat(row.osal) + parseFloat(event.target.value)) *
          parseFloat(inputs.Perc)) /
        100;
      let finalchange = change;
      console.log("amount then prec", finalchange);
      if (finalchange < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (finalchange > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = finalchange;
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "4") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change = (parseFloat(row.osal) * parseFloat(inputs.Perc)) / 100;
      let finalchange = change + parseFloat(event.target.value);
      console.log("prec then amount", finalchange);
      if (finalchange < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (finalchange > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = finalchange;
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  }
  return inputs;
};
export const MinCallBack = async (
  event,
  e,
  inputs,
  setInputs,
  rows,
  setRows
) => {
  if (inputs.TypeId === "1") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change = (parseFloat(row.osal) * parseFloat(inputs.Perc)) / 100;
      if (parseFloat(change) < parseFloat(event.target.value)) {
        row.chnge = parseFloat(event.target.value);
        row.nsal = parseFloat(event.target.value) + parseFloat(row.osal);
      } else if (parseFloat(change) > parseFloat(inputs.Nmax)) {
        row.nsal = parseFloat(inputs.Nmax) + parseFloat(row.osal);
      } else {
        rows.chnge = parseFloat(change);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "2") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      if (parseFloat(inputs.Amt) < parseFloat(event.target.value)) {
        console.log("smaller");
        row.chnge = parseFloat(event.target.value);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (parseFloat(inputs.Amt) > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = parseFloat(inputs.Amt);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "3") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change =
        ((parseFloat(row.osal) + parseFloat(inputs.Amt)) *
          parseFloat(inputs.Perc)) /
        100;
      let finalchange = change;
      console.log(finalchange);
      if (finalchange < parseFloat(event.target.value)) {
        console.log("smaller");
        row.chnge = parseFloat(event.target.value);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (finalchange > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = finalchange;
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "4") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change = (parseFloat(row.osal) * parseFloat(inputs.Perc)) / 100;
      let finalchange = change + parseFloat(inputs.Amt);
      console.log(finalchange);
      if (finalchange < parseFloat(event.target.value)) {
        console.log("smaller");
        row.chnge = parseFloat(event.target.value);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (finalchange > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = finalchange;
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "5") {
    meta.Column[4].disable = true;
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
  } else if (inputs.TypeId === "6") {
    meta.Column[4].disable = false;
    meta.Fields[7].Form.disabled = true;
    meta.Fields[8].Form.disabled = true;
    meta.Fields[9].Form.disabled = true;
    meta.Fields[10].Form.disabled = true;
    rows.reduce((minus, row) => {
      const changeField = meta.Column.find((f) => f.field === "chnge");
      const NewSalaryField = meta.Column.find((f) => f.field === "nsal");
      const OldSalaryField = meta.Column.find((f) => f.field === "osal");
      if (
        changeField &&
        row[changeField.field] !== undefined &&
        NewSalaryField &&
        row[NewSalaryField.field] !== undefined
      ) {
        row[NewSalaryField.field] =
          parseFloat(row[changeField.field]) +
          parseFloat(row[OldSalaryField.field]);
      }
    }, 0);
  }
  return inputs;
};
export const MaxCallBack = async (
  event,
  e,
  inputs,
  setInputs,
  rows,
  setRows
) => {
  if (inputs.TypeId === "1") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change = (parseFloat(row.osal) * parseFloat(inputs.Perc)) / 100;
      if (parseFloat(change) < parseFloat(inputs.Nmin)) {
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(inputs.Nmin) + parseFloat(row.osal);
      } else if (parseFloat(change) > parseFloat(inputs.Nmax)) {
        row.nsal = parseFloat(event.target.value) + parseFloat(row.osal);
      } else {
        rows.chnge = parseFloat(change);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "2") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      if (parseFloat(inputs.Amt) < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (parseFloat(inputs.Amt) > parseFloat(event.target.value)) {
        console.log("greater");
        row.chnge = parseFloat(event.target.value);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = parseFloat(inputs.Amt);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "3") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change =
        ((parseFloat(row.osal) + parseFloat(inputs.Amt)) *
          parseFloat(inputs.Perc)) /
        100;
      let finalchange = change;
      console.log(finalchange);
      if (finalchange < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (finalchange > parseFloat(event.target.value)) {
        console.log("greater");
        row.chnge = parseFloat(event.target.value);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = finalchange;
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "4") {
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
    meta.Column[4].disable = true;
    rows.map((row) => {
      let change = (parseFloat(row.osal) * parseFloat(inputs.Perc)) / 100;
      let finalchange = change + parseFloat(inputs.Amt);
      console.log(finalchange);
      if (finalchange < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (finalchange > parseFloat(event.target.value)) {
        console.log("greater");
        row.chnge = parseFloat(event.target.value);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = finalchange;
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (inputs.TypeId === "5") {
    meta.Column[4].disable = true;
    meta.Fields[7].Form.disabled = false;
    meta.Fields[8].Form.disabled = false;
    meta.Fields[9].Form.disabled = false;
    meta.Fields[10].Form.disabled = false;
  } else if (inputs.TypeId === "6") {
    meta.Column[4].disable = false;
    meta.Fields[7].Form.disabled = true;
    meta.Fields[8].Form.disabled = true;
    meta.Fields[9].Form.disabled = true;
    meta.Fields[10].Form.disabled = true;
    rows.reduce((minus, row) => {
      const changeField = meta.Column.find((f) => f.field === "chnge");
      const NewSalaryField = meta.Column.find((f) => f.field === "nsal");
      const OldSalaryField = meta.Column.find((f) => f.field === "osal");
      if (
        changeField &&
        row[changeField.field] !== undefined &&
        NewSalaryField &&
        row[NewSalaryField.field] !== undefined
      ) {
        row[NewSalaryField.field] =
          parseFloat(row[changeField.field]) +
          parseFloat(row[OldSalaryField.field]);
      }
    }, 0);
  }
  return inputs;
};
export const SalaryTypeBack = async (
  event,
  e,
  inputs,
  setInputs,
  rows,
  setRows
) => {
  if (event.target.options[event.target.selectedIndex].value === "1") {
    setRows((prevRows, rowId) => {
      const updatedRows = [...prevRows];
      const OldSalaryField = meta.Column.find((f) => f.field === "osal");
      const NewSalaryField = meta.Column.find((f) => f.field === "nsal");
      const changeField = meta.Column.find((f)=> f.field === 'chnge');
      updatedRows.map((row , rowId)=>{
      row[OldSalaryField.field] =
      row[OldSalaryField.rfield];
      row[NewSalaryField.field] =
      parseFloat(row[OldSalaryField.rfield]) + parseFloat(row[changeField.field]);
      })
      return updatedRows;
    });
  } else if (event.target.options[event.target.selectedIndex].value === "2") {
    setRows((prevRows, rowId) => {
      const updatedRows = [...prevRows];
      const OldSalaryField = meta.Column.find((f) => f.field === "osal");
      const NewSalaryField = meta.Column.find((f) => f.field === "nsal");
      const changeField = meta.Column.find((f)=> f.field === 'chnge');
      updatedRows.map((row , rowId)=>{
      row[OldSalaryField.field] =
      row[OldSalaryField.element];
      row[NewSalaryField.field] =
      parseFloat(row[OldSalaryField.element]) + parseFloat(row[changeField.field]);
      })
      return updatedRows;
    });
  } else if (event.target.options[event.target.selectedIndex].value === "3") {
    setRows((prevRows, rowId) => {
      const updatedRows = [...prevRows];
      const OldSalaryField = meta.Column.find((f) => f.field === "osal");
      const NewSalaryField = meta.Column.find((f) => f.field === "nsal");
      const changeField = meta.Column.find((f)=> f.field === 'chnge');
      updatedRows.map((row , rowId)=>{
      row[OldSalaryField.field] =
      row[OldSalaryField.rElement];
      row[NewSalaryField.field] =
      parseFloat(row[OldSalaryField.rElement]) + parseFloat(row[changeField.field]);
      })
      return updatedRows;
    });
  }else{
    setRows((prevRows, rowId) => {
      const updatedRows = [...prevRows];
      const OldSalaryField = meta.Column.find((f) => f.field === "osal");
      const NewSalaryField = meta.Column.find((f) => f.field === "nsal");
      const changeField = meta.Column.find((f)=> f.field === 'chnge');
      updatedRows.map((row , rowId)=>{
      row[OldSalaryField.field] =
      row[OldSalaryField.rfield];
      row[NewSalaryField.field] =
      parseFloat(row[OldSalaryField.rfield]) + parseFloat(row[changeField.field]);
      })
      return updatedRows;
    });
  }

  return inputs;
};
export const BracketsCallBack = async (
  event,
  e,
  inputs,
  setInputs,
  rows,
  setRows
) => {
  console.log(event.target.options[event.target.selectedIndex].value);

 if(inputs.TypeId === '5'){
  if (event.target.options[event.target.selectedIndex].value === "700") {
    rows.map((row) => {
      let change = (parseFloat(row.osal) * parseFloat(inputs.Perc)) / 100;
      if (parseFloat(change) < parseFloat(inputs.Nmin)) {
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(inputs.Nmin) + parseFloat(row.osal);
      } else if (parseFloat(change) > parseFloat(inputs.Nmax)) {
        row.nsal = parseFloat(inputs.Nmax) + parseFloat(row.osal);
      } else {
        rows.chnge = parseFloat(change);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  } else if (event.target.options[event.target.selectedIndex].value === "100") {
    rows.map((row) => {
      if (parseFloat(inputs.Amt) < parseFloat(inputs.Nmin)) {
        console.log("smaller");
        row.chnge = parseFloat(inputs.Nmin);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else if (parseFloat(inputs.Amt) > parseFloat(inputs.Nmax)) {
        console.log("greater");
        row.chnge = parseFloat(inputs.Nmax);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      } else {
        console.log("between");
        row.chnge = parseFloat(inputs.Amt);
        row.nsal = parseFloat(row.chnge) + parseFloat(row.osal);
      }
    });
  }
 }
  return inputs;
};
let meta = {
  hasTable: true,
  hasParent: true,
  id: "", //page id
  Generals: {
    title: "",
  },
  URLS: {
    New: {
      URl: `${BaseUrl}UC/Emp/ChangeSalary/New`,
      Method: "POST",
    },
    Update: {
      URl: `${BaseUrl}UC/Emp/ChangeSalary/`,
      Method: "PUT",
    },
    Delete: {
      URl: `${BaseUrl}UC/Emp/ChangeSalary/`,
      Method: "DELETE",
    },
    Search: {
      URl: `${BaseUrl}UC/Emp/ChangeSalary/Search/`,
      Method: "POST",
    },
    Get: {
      URl: `${BaseUrl}UC/Emp/ChangeSalary/`,
      Method: "GET",
    },
  },
  Fields: [
    {
      label: "Number",
      element: "Num",
      second_element: "Num-second", //if the field does not have second field this key must be removed
      rElement: "Numname",
      field: "num",
      rField: "numName",
      type: "text",
      dataType: PhFC_Number,
      isShown: true,
      hasSecondField: true, //if the field does not have second field (false)
      isAutocomplete: false,
      isForm: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "", //if it doesnt have second field "col-sm-4 px-0"
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Number,
        Operation: "Numm", //must be unique
        aOperations: [
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_GT,
          PhFOper_GE,
          PhFOper_LT,
          PhFOper_LE,
          PhFOper_BT,
          PhFOper_NB,
          PhFOper_ST,
          PhFOper_ED,
          PhFOper_CT,
          PhFOper_NST,
          PhFOper_NED,
          PhFOper_NCT,
        ],
        defOperationValue: PhFOper_CT,
        tableWidth: "15",
      },
    },
    {
      label: "Date",
      element: "Ddate",
      second_element: "Ddate-second",
      rElement: "DdateName",
      field: "ddate",
      rField: "ddate",
      type: "date",
      dataType: PhFC_DatePicker,
      isForm: true,
      hasSecondField: true,
      isShown: true,
      Form: {
        maxDate: "",
        minDate: "",
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: true,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "", //if it doesnt have second field "col-sm-4 px-0"
        autocomplete: false,
        isRequired: false,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_DatePicker,
        Operation: "dddate", //must be unique
        aOperations: [
          PhFOper_GT,
          PhFOper_GE,
          PhFOper_LT,
          PhFOper_LE,
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_BT,
          PhFOper_NB,
        ],
        defOperationValue: PhFOper_GT,
        tableWidth: "10",
      },
    },
    {
      label: "Doc.Num",
      element: "Docn",
      second_element: "Docn-second", //if the field does not have second field this key must be removed
      rElement: "DocnName",
      field: "docn",
      rField: "docnName",
      type: "text",
      dataType: PhFC_Text,
      isShown: true,
      hasSecondField: false, //if the field does not have second field (false)
      isForm: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Text,
        Operation: "", //must be unique
        aOperations: [
          PhFOper_CT,
          PhFOper_NCT,
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_ST,
          PhFOper_NST,
          PhFOper_ED,
          PhFOper_NED,
        ],
        defOperationValue: PhFOper_CT,
        tableWidth: "",
      },
    },
    {
      label: "Doc.Date",
      element: "Docd",
      second_element: "Docd-second",
      rElement: "DocdName",
      field: "docd",
      rField: "docd",
      type: "date",
      dataType: PhFC_DatePicker,
      isForm: true,
      hasSecondField: true,
      isShown: true,
      Form: {
        maxDate: "",
        minDate: "",
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: true,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "", //if it doesnt have second field "col-sm-4 px-0"
        autocomplete: false,
        isRequired: false,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_DatePicker,
        Operation: "dddaate", //must be unique
        aOperations: [
          PhFOper_GT,
          PhFOper_GE,
          PhFOper_LT,
          PhFOper_LE,
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_BT,
          PhFOper_NB,
        ],
        defOperationValue: PhFOper_GT,
        tableWidth: "10",
      },
    },
    {
      label: "Type",
      element: "TypeId",
      rElement: "TypeName",
      field: "typeId",
      rField: "typeName",
      type: "select",
      dataType: PhFC_Select,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm ",
        isAutocomplete: false,
        options: "type", //we need to remmember it
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
        callback: {
          onchange: typeCallBack,
        },
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        autocomplete: false,
        divClass: "col-sm-4 px-0",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Select,
        Operation: "typee", //must be unique
        options: "type", // we need to remmeber it
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Salary.Type",
      element: "SaltypId",
      rElement: "SaltypName",
      field: "saltypId",
      rField: "saltypName",
      type: "select",
      dataType: PhFC_Select,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm ",
        isAutocomplete: false,
        options: "SType", //we need to remmember it
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        callback : {
          onchange: SalaryTypeBack
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        autocomplete: false,
        divClass: "col-sm-4 px-0",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Select,
        Operation: "STypee", //must be unique
        options: "SType", // we need to remmeber it
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },
    {
      label: "Brackets",
      element: "BrktId",
      rElement: "BrktName",
      field: "brktId",
      rField: "brktName",
      type: "select",
      dataType: PhFC_Select,
      isForm: true,
      isShown: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm ",
        isAutocomplete: false,
        options: "brk", //we need to remmember it
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-select form-select-sm",
        autocomplete: false,
        divClass: "col-sm-4 px-0",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Select,
        Operation: "brkk", //must be unique
        options: "brk", // we need to remmeber it
        aOperations: [PhFOper_EQ, PhFOper_NE],
        defOperationValue: PhFOper_EQ,
        tableWidth: "10",
      },
    },

    {
      label: "Perc",
      element: "Perc",
      second_element: "Perc-second", //if the field does not have second field this key must be removed
      rElement: "PercName",
      field: "perc",
      rField: "percName",
      type: "text",
      dataType: PhFC_Number,
      isShown: true,
      hasSecondField: true, //if the field does not have second field (false)
      isAutocomplete: false,
      isForm: true,
      Form: {
        disabled: false,
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: 0,
        isRequired: true,
        callback: {
          onchange: precCallBack,
        },
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-2 px-0",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Number,
        Operation: "percc", //must be unique
        aOperations: [
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_GT,
          PhFOper_GE,
          PhFOper_LT,
          PhFOper_LE,
          PhFOper_BT,
          PhFOper_NB,
          PhFOper_ST,
          PhFOper_ED,
          PhFOper_CT,
          PhFOper_NST,
          PhFOper_NED,
          PhFOper_NCT,
        ],
        defOperationValue: PhFOper_CT,
        tableWidth: "10",
      },
    },
    {
      label: "Amount",
      element: "Amt",
      second_element: "Amt-second", //if the field does not have second field this key must be removed
      rElement: "AmtName",
      field: "amt",
      rField: "amtName",
      type: "text",
      dataType: PhFC_Number,
      isShown: true,
      hasSecondField: true, //if the field does not have second field (false)
      isAutocomplete: false,
      isForm: true,
      Form: {
        disabled: false,
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        callback: {
          onchange: amountCallBack,
        },
        defValue: 0,
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-2 px-0",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Number,
        Operation: "amtt", //must be unique
        aOperations: [
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_GT,
          PhFOper_GE,
          PhFOper_LT,
          PhFOper_LE,
          PhFOper_BT,
          PhFOper_NB,
          PhFOper_ST,
          PhFOper_ED,
          PhFOper_CT,
          PhFOper_NST,
          PhFOper_NED,
          PhFOper_NCT,
        ],
        defOperationValue: PhFOper_CT,
        tableWidth: "10",
      },
    },
    {
      label: "S.Min",
      element: "Nmin",
      second_element: "Nmin-second", //if the field does not have second field this key must be removed
      rElement: "NminName",
      field: "nmin",
      rField: "nminName",
      type: "text",
      dataType: PhFC_Number,
      isShown: true,
      hasSecondField: true, //if the field does not have second field (false)
      isAutocomplete: false,
      isForm: true,
      Form: {
        disabled: false,
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        callback: {
          onchange: MinCallBack,
        },
        defValue: 0,
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-2 px-0",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Number,
        Operation: "nminn", //must be unique
        aOperations: [
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_GT,
          PhFOper_GE,
          PhFOper_LT,
          PhFOper_LE,
          PhFOper_BT,
          PhFOper_NB,
          PhFOper_ST,
          PhFOper_ED,
          PhFOper_CT,
          PhFOper_NST,
          PhFOper_NED,
          PhFOper_NCT,
        ],
        defOperationValue: PhFOper_CT,
        tableWidth: "10",
      },
    },
    {
      label: "S.Max",
      element: "Nmax",
      second_element: "Nmax-second", //if the field does not have second field this key must be removed
      rElement: "NmaxName",
      field: "nmax",
      rField: "nmaxName",
      type: "text",
      dataType: PhFC_Number,
      isShown: true,
      hasSecondField: true, //if the field does not have second field (false)
      isAutocomplete: false,
      isForm: true,
      Form: {
        disabled: false,
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        callback: {
          onchange: MaxCallBack,
        },
        defValue: 0,
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-2 px-0",
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Number,
        Operation: "nmaxn", //must be unique
        aOperations: [
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_GT,
          PhFOper_GE,
          PhFOper_LT,
          PhFOper_LE,
          PhFOper_BT,
          PhFOper_NB,
          PhFOper_ST,
          PhFOper_ED,
          PhFOper_CT,
          PhFOper_NST,
          PhFOper_NED,
          PhFOper_NCT,
        ],
        defOperationValue: PhFOper_CT,
        tableWidth: "10",
      },
    },
    {
      label: "Rem",
      element: "Rem",
      rElement: "RemName",
      field: "rem",
      rField: "remName",
      type: "text",
      dataType: PhFC_Text,
      isShown: true,
      hasSecondField: false,
      isAutocomplete: false,
      isForm: true,
      Form: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: "",
        isRequired: true,
      },
      isQuery: true,
      Query: {
        labelClass:
          "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
        inputClass: "form-control form-control-sm",
        divClass: "col-sm-2 px-0", //if it doesnt have second field "col-sm-4 px-0"
        isRequired: true,
        value1: "",
        value2: "",
        isAutocomplete: false,
        autocomplete: {
          data_label: "",
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        dataType: PhFC_Text,
        Operation: "remm",
        aOperations: [
          PhFOper_CT,
          PhFOper_NCT,
          PhFOper_EQ,
          PhFOper_NE,
          PhFOper_ST,
          PhFOper_NST,
          PhFOper_ED,
          PhFOper_NED,
        ],
        defOperationValue: PhFOper_CT,
        tableWidth: "10",
      },
    },
    {
      element: "id",
      rElement: "Id",
      field: "id",
      rField: "id",
      type: "hidden",
      dataType: 0,
      isForm: false,
      isShown: false,
      Form: {
        labelClass: "",
        inputClass: "",
        isAutocomplete: false,
        options: "",
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: 0,
        isRequired: false,
      },
      isQuery: false,
      Query: {},
    },
    {
      element: "fldStatusId",
      rElement: "fldStatusId",
      field: "statusId",
      rField: "statusId",
      type: "hidden",
      dataType: 0,
      isForm: false,
      isShown: false,
      Form: {
        labelClass: "",
        inputClass: "",
        isAutocomplete: false,
        options: "",
        autocomplete: {
          data_acrel: "",
          data_acoperation: "",
          data_params: "",
        },
        defValue: 0,
        isRequired: false,
      },
      isQuery: false,
      Query: {},
    },
  ],
  Column: [
    {
      title: "id",
      field: "id",
      visible: false,
      type: "hidden",
      component: "input",
      disable: false,
      defValue: 0,
      isAutocomplete: false,
    },
    {
      title: "MstId",
      field: "csalId",
      visible: false,
      type: "hidden",
      component: "input",
      disable: false,
      defValue: 0,
      isAutocomplete: false,
    },
    {
      title: "Employee",
      field: "empId",
      rfield: "empName",
      inputClass:
        "form-control form-control-sm phcell ph-autocomplete ph-ac-accId accId cell-phTable-PhTable col-phTable-PhTable-9 ui-autocomplete-input",
      type: "text",
      isRequired: true,
      width: "300px",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      component: "input",
      isAutocomplete: true,
      disable: false,
      defValue: "",
      ajaxURL: "/UC/Emp/Employee/Autocomplete", //api url for the autoComplete
      callback: {
        onchange: GetOptions,
      },
    },
    {
      title: "Osal",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "osal",
      element: "osall",
      rElement: "ossal",
      rfield: "oosal",
      isRequired: false,
      type: "text",
      datatype: "integer",
      width: "150px",
      required: true,
      disable: true,
      isAutocomplete: false,
      defValue: "",
      // callBack: {
      //   onchange: 'function name',
      // },
    },
    {
      title: "Change",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "chnge",
      isRequired: false,
      type: "text",
      datatype: "integer",
      width: "150px",
      required: true,
      disable: true,
      isAutocomplete: false,
      defValue: 0,
      // callBack: {
      //   onchange: 'function name',
      // },
    },
    {
      title: "Nsal",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      field: "nsal",
      isRequired: true,
      type: "text",
      element: "nsall",
      rElement: "nssal",
      rfield: "nnsal",
      datatype: "integer",
      width: "150px",
      required: false,
      disable: true,
      isAutocomplete: false,
      defValue: "",
      // callBack: {
      //   onchange: 'function name',
      // },
    },
    {
      title: "Rem",
      labelClass: "ph-table-col float-left border border-1 text-center p-1",
      inputClass:
        "form-control form-control-sm phcell  tdocn cell-phTable-PhTable col-phTable-PhTable-12",
      rfield: "rem",
      field: "rem",
      isRequired: false,
      type: "text",
      datatype: "integer",
      width: "150px",
      required: false,
      disable: false,
      isAutocomplete: false,
      defValue: "",
    },
  ],
};

export { meta };
