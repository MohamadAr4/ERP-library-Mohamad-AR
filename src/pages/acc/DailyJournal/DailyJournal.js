import React, { useState } from "react";
import MasterTransaction from "../../../components/MasterTransaction/MasterTransaction";
import { meta } from "../../../data/Jsons/acc/DailyJournal/DailyJournal";
function DailyJournal() {
  const MTRef = useState();
  const [rate, setRate] = useState(1);

  const resetCorrespondingField = (event, field, rowIndex) => {
    MTRef.current?.setRows((prevRows) => {
      const updatedRows = [...prevRows];
      if (field.field === "debc") {
        const debitField = meta.Column.find((f) => f.field === "debc");
        const creditField = meta.Column.find((f) => f.field === "crdc");
        const localDebitField = meta.Column.find((f) => f.field === "deb");
        const localCreditField = meta.Column.find((f) => f.field === "crd");
        if (creditField) {
          updatedRows[rowIndex][creditField.field] = '0';
          updatedRows[rowIndex][localCreditField.field] = '0';
          updatedRows[rowIndex][localDebitField.field] =
            parseFloat(updatedRows[rowIndex][debitField.field]) * rate;
        }
      } else if (field.field === "crdc") {
        const debitField = meta.Column.find((f) => f.field === "debc");
        const creditField = meta.Column.find((f) => f.field === "crdc");
        const localDebitField = meta.Column.find((f) => f.field === "deb");
        const localCreditField = meta.Column.find((f) => f.field === "crd");
        if (debitField) {
          updatedRows[rowIndex][debitField.field] = '0';
          updatedRows[rowIndex][localDebitField.field] = '0';
          updatedRows[rowIndex][localCreditField.field] =
            parseFloat(updatedRows[rowIndex][creditField.field]) * rate;
        }
      }
      if (field.field === "curnId") {
        const rateField = meta.Column.find((f) => f.field === "curnRate");
        const localDebit = meta.Column.find((f) => f.field === "deb");
        const localCredit = meta.Column.find((f) => f.field === "crd");
        const Debit = meta.Column.find((f) => f.field === "debc");
        const Credit = meta.Column.find((f) => f.field === "crdc");
        if (rateField) {
          const rate = event.target.options[event.target.selectedIndex].id;
          updatedRows[rowIndex][rateField.field] = rate.toString();
          setRate(rate);
          if (localDebit && Debit) {
            updatedRows[rowIndex][localDebit.field] =
              parseFloat(updatedRows[rowIndex][Debit.field]) * rate;
          }
          if (localCredit && Credit) {
            updatedRows[rowIndex][localCredit.field] =
              parseFloat(updatedRows[rowIndex][Credit.field]) * rate;
          }
        }
      }
      return updatedRows;
    });
  };
  return (
    <>
     <MasterTransaction
     ref={MTRef}
     rate={rate}
     setRate={setRate}
     resetCorrespondingField={resetCorrespondingField}
     ></MasterTransaction>
    </>
  );
}
export default DailyJournal;
