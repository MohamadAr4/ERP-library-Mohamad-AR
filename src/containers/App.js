import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect } from "react";
import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import Warehouses from "../pages/str/mng/Warehouses/Warehouses";
import Items from "../pages/str/mng/Item/Item";
import InventoryQuantities from "../pages/str/qry/InventoryQuantities/InventoryQuantities";
import TotalFixedAmountsStatistics from "../pages/fix/qry/TotalFixedAmountsStatistics/TotalFixedAmountsStatistics";
import DailyJournal from "../pages/acc/DailyJournal/DailyJournal";
import AppraisalNote from "../pages/hr/hr/qry/AppraisalNote";
import EntryAppraisalNote from "../pages/hr/hr/AppraisalNote";
import EntryEmployeehistory from "../pages/hr/hr/EmployeeHistory";
import EntryADMConsideration from "../pages/hr/hr/ADMConsideration";
import EntryADMpunishment from "../pages/hr/hr/ADMPunishment";
import EntryEmployeeAppraisal from "../pages/hr/hr/EmployeeAppraisal";
import EmployeeCard from "../pages/hr/hr/mng/EmployeeCard";
import EmployeeHistory from "../pages/hr/hr/qry/EmployeeHistory";
import ADMConsideration from "../pages/hr/hr/qry/ADMConsideration";
import ADMPunishment from "../pages/hr/hr/qry/ADMPunishment";
import { useSelector } from "react-redux";
import meta from "../data/Jsons/MenuJson/MenuJson";
import EmployeeCardQuery from "../pages/hr/hr/qry/EmployeeCard";
import EmployeeAppraisal from "../pages/hr/hr/qry/EmployeeApprisal";
import GrandChange from "../pages/hr/hr/qry/GrandChange";
import ApprisalTemplete from "../pages/hr/hr/qry/AppraisalTemplete";
import WareHouseItems from "../pages/str/mng/WareHouseItems";
import ItemMovementsCard from "../pages/str/qry/ItemMovementsCard";
import Inbounds from "../pages/str/Inbounds";
import Outbounds from "../pages/str/Outbounds";
import ActualQuantities from "../pages/str/ActualQuantities";
import InventoryDifferences from "../pages/str/qry/InventoryDifferences";
import OverMinLimitsQuantities from "../pages/str/qry/OverMinLimitsQuantities";
import OverReqLimitsQuantities from "../pages/str/qry/OverReqLimitsQuantities";
import OverMaxLimitsQuantities from "../pages/str/qry/OverMaxLimitsQuantities";
import MovementsStatistics from "../pages/str/qry/MovementsStatistics";
import CompareMovementsPeriods from "../pages/str/qry/CompareMovementsPeriods";
import GrandGroup from "../pages/hr/hr/qry/GradeGroups";
import EmployeeCardStatistics from "../pages/hr/hr/qry/EmployeeCardStatistics";
import GradeGroups from "../pages/hr/hr/mng/GradeGroups";
import Leaves from "../pages/hr/att/Leaves";
import EntryGradeChange from "../pages/hr/hr/GradeChange";
import LeaveBalances from "../pages/hr/att/qry/LeaveBalances";
import AttendanceForSalaries from "../pages/hr/pay/AttendanceForSalaries";
import Loans from "../pages/hr/pay/Loans";
import LoanPayments from "../pages/hr/pay/LoanPayments";
import SalaryAccredited from "../pages/hr/pay/mng/SalaryAccredited";
import TaxableSalaryGroups from "../pages/hr/pay/mng/TaxableSalaryGroups";
import CompensationTypes from "../pages/hr/pay/mng/CompensationTypes";
import DeductionTypes from "../pages/hr/pay/mng/DeductionTypes";
import ChangeSalarySlices from "../pages/hr/pay/mng/ChangeSalarySlices";
import AddToSalary from "../pages/hr/pay/AddToSalary";
import DeductFromSalary from "../pages/hr/pay/DeductFromSalary";
import Tax from "../pages/hr/pay/Tax";
import EmployeeCompensation from "../pages/hr/pay/mng/EmployeeCompensation";
import EmployeeDeduction from "../pages/hr/pay/mng/EmployeeDeduction";
import SalaryChange from "../pages/hr/pay/mng/SalaryChange";
import LoanPayment from "../pages/hr/pay/qry/LoanPayment";
import Loanss from "../pages/hr/pay/qry/Loans";
import CompensatiosTypesQuery from "../pages/hr/pay/qry/CompensatiosTypes";
import QueryEmployeeCompensation from "../pages/hr/pay/qry/EmployeeCompensation";
import QueryDeductionTypes from "../pages/hr/pay/qry/DeductionTypes";
import QueryEmployeeDeduction from "../pages/hr/pay/qry/EmployeeDeduction";
import QueryMonthlyPayrollTable from "../pages/hr/pay/qry/MonthlyPayrollTable";
import QueryEmployeePayrollTax from "../pages/hr/pay/qry/EmployeePayrollTax";
import QueryMonthlyBankPayrollTable from "../pages/hr/pay/qry/MonthlyBankPayrollTable";
import QueryAddToSalary from "../pages/hr/pay/qry/AddToSalary";
import QuerySalaryChange from "../pages/hr/pay/qry/SalaryChange";
import QueryDeductFromSalary from "../pages/hr/pay/qry/DeductFromSalary";
import LeaveRequest from "../pages/hr/att/qry/LeaveRequest";
import QueryLeave from "../pages/hr/att/qry/Leaves";
import MissionRequest from "../pages/hr/att/qry/MissionRequest";
import Missions from "../pages/hr/att/qry/Missions";
import OvertimeRequest from "../pages/hr/att/qry/OvertimeRequest";
import Overtimes from "../pages/hr/att/qry/Overtimes";
import WorkingShifts from "../pages/hr/att/mng/WorkShifts";
import EntryMissions from "../pages/hr/att/Missions";
import EntryOvertimes from "../pages/hr/att/Overtimes";
import EntryLeavesRequests from "../pages/hr/self/LeavesRequests";
import EntryOvertimeRequests from "../pages/hr/self/OvertimeRequests";
import EntryMissionRequests from "../pages/hr/self/MissionsRequests";

const App = () => {
  // function generateQueryField(fields) {
  //   let NewFields = [];
  //   fields.forEach((field, filedIndex) => {
  //     if (field.componentType === PhFC_Autocomplete) {
  //       if (field.field.endsWith("Id")) {
  //         const fieldName = field.field.replace("Id", "Name");
  //         NewFields.push({
  //           label: field.label,
  //           element: field.element,
  //           rElement: fieldName,
  //           field: field.field,
  //           rField: fieldName,
  //           type: "text",
  //           isForm: true,
  //           isQuery: true,
  //           hasSecondField: false,
  //           isShown: true,
  //           Query: {
  //             isRequired: field.isRequired,
  //             isAutocomplete: true,
  //             dataType: eval("PhFC_Autocomplete"),
  //             divClass: "col-sm-4 px-0",
  //             labelClass:
  //               "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
  //             inputClass: "form-control form-control-sm phAutocomplete",
  //             Operation: filedIndex.toString(),
  //             autocomplete: {
  //               data_label: "",
  //               data_acrel: "",
  //               data_acoperation: field.autoComplete.acUrl, // AutoComplete url
  //               data_params: "",
  //             },
  //             value1: "",
  //             value2: "",
  //             defValue: "",
  //             aOperations: "[PhFOper_EQ ,PhFOper_NE]",
  //             defOperationValue: "PhFOper_EQ",
  //             tableWidth: "10",
  //           },
  //         });
  //       } else {
  //         NewFields.push({
  //           label: field.label,
  //           element: field.element,
  //           rElement: field.element + "Name",
  //           field: field.field,
  //           rField: field.field + "Name",
  //           type: "text",
  //           isForm: true,
  //           isQuery: true,
  //           hasSecondField: false,
  //           isShown: true,
  //           Query: {
  //             isRequired: field.isRequired,
  //             isAutocomplete: true,
  //             dataType: "PhFC_Autocomplete",
  //             divClass: "col-sm-4 px-0",
  //             labelClass:
  //               "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
  //             inputClass: "form-control form-control-sm phAutocomplete",
  //             Operation: filedIndex.toString(),
  //             autocomplete: {
  //               data_label: "",
  //               data_acrel: "",
  //               data_acoperation: field.autoComplete.acUrl, // AutoComplete url
  //               data_params: "",
  //             },
  //             value1: "",
  //             value2: "",
  //             defValue: "",
  //             aOperations: "[PhFOper_EQ ,PhFoper_NE]",
  //             defOperationValue: "PhFOper_EQ",
  //             tableWidth: "10",
  //           },
  //         });
  //       }
  //     } else if (field.componentType === PhFC_DatePicker) {
  //       NewFields.push({
  //         label: field.label,
  //         element: field.element,
  //         second_element: field.element + "-second", //if the field does not have second field this key must be removed
  //         rElement: field.element + "Name",
  //         field: field.field, // type : 2
  //         rField: field.field, // typeName : active
  //         type: "date",
  //         isForm: true,
  //         isQuery: true,
  //         hasSecondField: field.hasSecondField, //if the field does not have second field (false)
  //         isShown: true,
  //         Query: {
  //           isRequired: field.isRequired,
  //           isAutocomplete: false,
  //           dataType: "PhFC_DatePicker",
  //           divClass: "col-sm-2 px-0", //if it doesnt have second field "col-sm-4 px-0"
  //           labelClass:
  //             "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
  //           inputClass:
  //             "form-control form-control-sm ph_datepicker hasDatepicker",
  //           Operation: filedIndex.toString(), //must be unique
  //           value1: "",
  //           value2: "",
  //           defValue: "",
  //           aOperations:
  //             "[PhFOper_GT, PhFOper_GE, PhFOper_LT, PhFOper_LE,PhFOper_EQ, PhFOper_NE, PhFOper_BT, PhFOper_NB]",
  //           defOperationValue: "PhFOper_GT",
  //           tableWidth: "10",
  //         },
  //       });
  //     } else if (field.componentType === PhFC_Select) {
  //       NewFields.push({
  //         label: field.label,
  //         element: field.element,
  //         rElement: field.element + "Name",
  //         field: field.field,
  //         rField: field.field + "Name",
  //         type: "select",
  //         isQuery: true,
  //         hasSecondField: false,
  //         isShown: true,
  //         Query: {
  //           isRequired: field.isRequired,
  //           isAutocomplete: false,
  //           dataType: "PhFC_Select",
  //           divClass: "col-sm-4 px-0",
  //           labelClass:
  //             "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
  //           inputClass: "form-select form-select-sm",
  //           Operation: filedIndex.toString(), //must be unique
  //           options: field.options, //this important to remmember
  //           value1: "",
  //           value2: "",
  //           defValue: "",
  //           aOperations: "[PhFOper_EQ ,PhFOper_NE]",
  //           defOperationValue: "PhFOper_EQ",
  //           tableWidth: "10",
  //         },
  //       });
  //     } else if (field.componentType === PhFC_Number) {
  //       NewFields.push({
  //         label: field.label,
  //         element: field.element,
  //         second_element: field.element + "-second", //if the field does not have second field this key must be removed
  //         rElement: field.element + "Name",
  //         field: field.field,
  //         rField: field.field + "Name",
  //         type: "text",
  //         isForm: false,
  //         isQuery: true,
  //         hasSecondField: field.hasSecondField, //if the field does not have second field (false)
  //         isShown: true,
  //         Query: {
  //           isRequired: field.isRequired,
  //           isAutocomplete: false,
  //           dataType: "PhFC_Number",
  //           divClass: "col-sm-2 px-0", //if it doesnt have second field "col-sm-4 px-0"
  //           labelClass:
  //             "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
  //           inputClass: "form-control form-control-sm",
  //           Operation: filedIndex, //must be unique
  //           value1: "",
  //           value2: "",
  //           defValue: "",
  //           aOperations:
  //             "[PhFOper_EQ, PhFOper_NE, PhFOper_GT, PhFOper_GE,PhFOper_LT, PhFOper_LE, PhFOper_BT, PhFOper_NB]",
  //           defOperationValue: "PhFOper_EQ",
  //           tableWidth: "15",
  //         },
  //       });
  //     } else if (field.componentType === PhFC_Text) {
  //       NewFields.push({
  //         label: field.label,
  //         element: field.element,
  //         second_element: field.element + "-second",
  //         rElement: field.element + "Name",
  //         field: field.field,
  //         rField: field.field + "Name",
  //         type: "text",
  //         isForm: false,
  //         isQuery: true,
  //         hasSecondField: field.hasSecondField,
  //         isShown: true,
  //         Query: {
  //           isRequired: field.isRequired,
  //           isAutocomplete: true,
  //           dataType: "PhFC_Text",
  //           divClass: "col-sm-2 px-0",
  //           labelClass:
  //             "col-sm-1 form-label ph-label text-start text-sm-end text-start text-sm-end",
  //           inputClass: "form-control form-control-sm col-sm",
  //           Operation: filedIndex,
  //           value1: "",
  //           value2: "",
  //           defValue: "",
  //           aOperations:
  //             "[PhFOper_EQ, PhFOper_NE, PhFOper_GT, PhFOper_GE,PhFOper_LT, PhFOper_LE, PhFOper_BT, PhFOper_NB]",
  //           defOperationValue: "PhFOper_EQ",
  //           tableWidth: "10",
  //         },
  //       });
  //     }
  //   });
  //   console.log("NewFields", NewFields);
  // }

  // function generateQueryDisplayOptionField(fields) {
  //   let NewFields = [];
  //   fields.forEach((field, filedIndex) => {
  //     NewFields.push({
  //       label: field.label,
  //       element: field.element,
  //       field: field.field,
  //       labelClass: "col-sm-9 form-label ph-label text-start pt-2",
  //       class: "form-check-input border-secondary mx-1 mb-1 all-Display-Option",
  //       type: "checkbox",
  //       value: "",
  //       checked: false,
  //       defValue: false,
  //       dataType: PhFC_CheckBox,
  //     });
  //   });
  //   console.log("NewFields", NewFields);
  // }

  // useEffect(() => {
  //   // generateQueryField();
  // });

  // const router =  createBrowserRouter(meta);
  // <React.StrictMode>
  //     <RouterProvider router={router}/>
  //   </React.StrictMode>

  // let PhFC_Text = 0;
  // let PhFC_Select = 1;
  // let PhFC_Number = 2;
  // let PhFC_DatePicker = 3;
  // let PhFC_Autocomplete = 4;
  // let PhFC_CheckBox = 5;

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Main />} />
        {/* Warehouse */}
        <Route exact path="/str/mng/Items" element={<Items />} />
        <Route exact path="/str/mng/Warehouses" element={<Warehouses />} />
        <Route
          exact
          path="/str/mng/WarehouseItems"
          element={<WareHouseItems />}
        />
        <Route exact path="/str/Inbounds" element={<Inbounds />} />
        <Route exact path="/str/Outbounds" element={<Outbounds />} />
        <Route
          exact
          path="/str/ActualQuantities"
          element={<ActualQuantities />}
        />
        {/* Query */}
        <Route
          exact
          path="/str/qry/InventoryQuantities"
          element={<InventoryQuantities />}
        />
        <Route
          exact
          path="/str/qry/OverMinLimitsQuantities"
          element={<OverMinLimitsQuantities />}
        />
        <Route
          exact
          path="/str/qry/OverReqLimitsQuantities"
          element={<OverReqLimitsQuantities />}
        />
        <Route
          exact
          path="/str/qry/OverMaxLimitsQuantities"
          element={<OverMaxLimitsQuantities />}
        />
        <Route
          exact
          path="/str/qry/MovementsStatistics"
          element={<MovementsStatistics />}
        />
        <Route
          exact
          path="/str/qry/InventoryDifferences"
          element={<InventoryDifferences />}
        />
        <Route
          exact
          path="/str/qry/ItemMovementsCard"
          element={<ItemMovementsCard />}
        />
        <Route
          exact
          path="/str/qry/CompareMovementsPeriods"
          element={<CompareMovementsPeriods />}
        />
        {/* fix */}
        <Route
          exact
          path="/fix/qry/TotalFixedAmountsStatistics"
          element={<TotalFixedAmountsStatistics />}
        />
        {/* acc */}
        <Route exact path="/acc/DailyJournal" element={<DailyJournal />} />
        {/* hr */}
        <Route
          exact
          path="/hr/hr/qry/AppraisalNote"
          element={<AppraisalNote />}
        />
        <Route
          exact
          path="/hr/hr/qry/EmployeeCard"
          element={<EmployeeCardQuery />}
        />
        <Route
          exact
          path="/hr/hr/qry/EmployeeCardStatistics"
          element={<EmployeeCardStatistics />}
        />
        <Route
          exact
          path="/hr/hr/qry/EmployeeHistory"
          element={<EmployeeHistory />}
        />
        <Route
          exact
          path="/hr/hr/qry/ADMConsideration"
          element={<ADMConsideration />}
        />
        <Route
          exact
          path="/hr/hr/qry/ADMPunishment"
          element={<ADMPunishment />}
        />
        <Route
          exact
          path="/hr/hr/qry/EmployeeAppraisal"
          element={<EmployeeAppraisal />}
        />
        <Route exact path="/hr/hr/qry/GradeChange" element={<GrandChange />} />
        <Route
          exact
          path="/hr/hr/qry/AppraisalTemplate"
          element={<ApprisalTemplete />}
        />
        <Route exact path="/hr/hr/qry/GradeGroups" element={<GrandGroup />} />
        {/* Entry */}
        <Route
          exact
          path="/hr/hr/AppraisalNote"
          element={<EntryAppraisalNote />}
        />
        <Route
          exact
          path="/hr/hr/EmployeeHistory"
          element={<EntryEmployeehistory />}
        />
        <Route
          exact
          path="/hr/hr/ADMConsideration"
          element={<EntryADMConsideration />}
        />
        <Route
          exact
          path="/hr/hr/ADMPunishment"
          element={<EntryADMpunishment />}
        />
        <Route
          exact
          path="/hr/hr/EmployeeAppraisal"
          element={<EntryEmployeeAppraisal />}
        />
        <Route exact path="/hr/hr/mng/GradeGroups" element={<GradeGroups />} />
        <Route
          exact
          path="/hr/hr/mng/EmployeeCard"
          element={<EmployeeCard />}
        />
        <Route exact path="/hr/hr/GradeChange" element={<EntryGradeChange />} />
        {/* att */}
        <Route exact path="/hr/att/Leaves" element={<Leaves />} />
        <Route exact path="/hr/att/Missions" element={<EntryMissions />} />
        <Route exact path="/hr/att/Overtimes" element={<EntryOvertimes />} />
        <Route
          exact
          path="/hr/att/qry/LeaveBalances"
          element={<LeaveBalances />}
        />
        <Route
          exact
          path="/hr/att/qry/LeaveRequest"
          element={<LeaveRequest />}
        />
        <Route exact path="/hr/att/qry/Leaves" element={<QueryLeave />} />
        <Route
          exact
          path="/hr/att/qry/MissionRequest"
          element={<MissionRequest />}
        />
        <Route exact path="/hr/att/qry/Missions" element={<Missions />} />
        <Route
          exact
          path="/hr/att/qry/OvertimeRequest"
          element={<OvertimeRequest />}
        />
        <Route exact path="/hr/att/qry/Overtimes" element={<Overtimes />} />
        {/* pay */}
        <Route
          exact
          path="/hr/pay/AttendanceForSalaries"
          element={<AttendanceForSalaries />}
        />
        <Route exact path="/hr/pay/Loans" element={<Loans />} />
        <Route exact path="/hr/pay/LoanPayments" element={<LoanPayments />} />
        <Route
          exact
          path="/hr/pay/mng/SalaryAccredited"
          element={<SalaryAccredited />}
        />
        <Route
          exact
          path="/hr/pay/mng/TaxableSalaryGroups"
          element={<TaxableSalaryGroups />}
        />
        <Route
          exact
          path="/hr/pay/mng/CompensationTypes"
          element={<CompensationTypes />}
        />
        <Route
          exact
          path="/hr/pay/mng/DeductionTypes"
          element={<DeductionTypes />}
        />
        <Route
          exact
          path="/hr/pay/mng/ChangeSalarySlices"
          element={<ChangeSalarySlices />}
        />
        <Route exact path="/hr/pay/mng/Tax" element={<Tax />} />
        <Route exact path="/hr/pay/AddToSalary" element={<AddToSalary />} />
        <Route
          exact
          path="/hr/pay/DeductFromSalary"
          element={<DeductFromSalary />}
        />
        <Route
          exact
          path="/hr/pay/mng/EmployeeCompensation"
          element={<EmployeeCompensation />}
        />
        <Route
          exact
          path="/hr/pay/mng/EmployeeDeduction"
          element={<EmployeeDeduction />}
        />
        <Route
          exact
          path="/hr/pay/mng/SalaryChange"
          element={<SalaryChange />}
        />
        <Route
          exact
          path="/hr/pay/qry/LoanPayments"
          element={<LoanPayment />}
        />
        <Route exact path="/hr/pay/qry/Loans" element={<Loanss />} />
        <Route
          exact
          path="/hr/pay/qry/CompensationTypes"
          element={<CompensatiosTypesQuery />}
        />
        <Route
          exact
          path="/hr/pay/qry/DeductionTypes"
          element={<QueryDeductionTypes />}
        />
        <Route
          exact
          path="/hr/pay/qry/EmployeeDeduction"
          element={<QueryEmployeeDeduction />}
        />
        <Route
          exact
          path="/hr/pay/qry/MonthlyPayrollTable"
          element={<QueryMonthlyPayrollTable />}
        />
        <Route
          exact
          path="/hr/pay/qry/EmployeesPayrollTax"
          element={<QueryEmployeePayrollTax />}
        />
        <Route
          exact
          path="/hr/pay/qry/MonthlyBankPayrollTable"
          element={<QueryMonthlyBankPayrollTable />}
        />
        <Route
          exact
          path="/hr/pay/qry/AddToSalary"
          element={<QueryAddToSalary />}
        />
        <Route
          exact
          path="/hr/pay/qry/SalaryChange"
          element={<QuerySalaryChange />}
        />
        <Route
          exact
          path="/hr/pay/qry/DeductFromSalary"
          element={<QueryDeductFromSalary />}
        />
        {/* mng */}
        <Route
          exact
          path="/hr/att/mng/WorkingShifts"
          element={<WorkingShifts />}
        />

        {/* self */}
        <Route
          exact
          path="/hr/att/LeaveRequest"
          element={<EntryLeavesRequests />}
        />
        <Route
          exact
          path="/hr/att/MissionRequest"
          element={<EntryOvertimeRequests />}
        />
        <Route
          exact
          path="/hr/att/OvertimeRequest"
          element={<EntryMissionRequests />}
        />
      </Routes>
    </Router>
  );
};
export default App;
