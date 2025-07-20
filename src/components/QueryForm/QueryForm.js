import ToolBar from "../ToolBar/ToolBar";
import SearchResult from "../QueryForm/SearchResult/SearchResult";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PrintOption from "../QueryForm/PrintOption/PrintOption";
import { PhAggregate } from "../../data/operation";
import Aggreagte from "../QueryForm/Aggregate/Aggregate";
import GroupBy from "../QueryForm/GroupBy/GroupBy";
import Filter from "../QueryForm/Filter/Filter";
import DisplayOption from "../QueryForm/DisplayOption/DisplayOption";
import Options from "./Options/Options";
import { PeriodId } from "../../data/contants";
function QueryForm(props) {
  let aFields = props.meta;
  const filterRef = useRef();
  const printOptionRef = useRef();
  const GroupByRef = useRef();
  const AggRef = useRef();
  const OrderRef = useRef();
  const DisplayOptionRef = useRef();
  const OptionRes = useRef ();
  //to get the Token that it returns form the login response
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  //state for store boolean value if the search button is cliked or not
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  //state for store boolean value if the toggle button is cliked or not
  const [isToogleClicked, setIsToogleClicked] = useState(false);
  //state for store boolean value if the progress button is cliked or not
  const [isProgressClicked, setIsProgressClicked] = useState(false);
  //state for store search result Header
  const [SearchQueryHeader, setSearchQueryHeader] = useState([]);
  //state for store the result of the search
  const [SearchQuery, setSearchQuery] = useState([]);
  //state for store the error which occured after search
  const [searchError, setSearchError] = useState(null);
  //explain that later
  const [missingFields, setMissingFields] = useState({});
  //function to handle what happend if i clik search button
  const handleSearchClick = () => {
    setIsSearchClicked((prevState) => !prevState);
    //set the creadintal to null to avoid keepin it
    filterRef.current?.setSearchCreadintal(null);
    //rest the input that i typed in
    filterRef.current?.resetInputs();
  };
  //function to handle what happend if i click progress button
  const handleProgressClick = () => {
    setIsProgressClicked((prevState) => !prevState);
  };
  //function to reset every field that i have
  const resetEveryThing = () => {
    filterRef.current?.resetInputs();
    printOptionRef.current?.resetPrintInputs();
    resetStates();
  };
  //function to reset all the state that i have
  const resetStates = () => {
    GroupByRef.current?.setSelectedOptions(
      Array(GroupByRef.current?.divGroupCount).fill("")
    );
    AggRef.current?.setSecAggOptions(Array(AggRef.current.divCount).fill(""));
    AggRef.current?.setAggOptions(Array(AggRef.current.divCount).fill(""));
    AggRef.current?.setSecAggTOptions(Array(AggRef.current.divCount).fill(""));
    AggRef.current?.setDivStates([{ id: 0 }]);
    OrderRef.current?.resetState();
    GroupByRef.current?.setDivGroupCount(1);
    DisplayOptionRef.current?.resetCheckBoxes();
  };
  //function to handle the search Api call
  const handelSearch = async () => {
    const missing = aFields.Fields.reduce((array, field) => {
      console.log('in missing');
      //two condition first is the field is required then make sure if it's empty or not
      if (field.Query.isRequired && filterRef.current?.inputs[field.element] === "") {
        array[field.element] = true;
      }
      return array;
    }, {});
    //then we make the missingField array state to have the value of the missing
    setMissingFields(missing);
    //then we call function in MT validatedRow to make sure that every required column of each row is not empty
    if (Object.keys(missing).length > 0) {
      console.error(
        "Please fill all required fields:",
        Object.keys(missing).join(", ")
      );
      return;
    }
    try {
      const url = aFields.URLS.Search.URl;
      const headers = {
        periodId: '2022',
        vLang : 'ar',
        Authorization: `Bearer ${PhToken}`,
        "Content-Type": "application/json",
      };
      const vParams = JSON.stringify({
        conditions: filterRef.current?.prepareDataForSearch(),
        printOptions: printOptionRef.current?.preparePrintForSearch(),
        group: GroupByRef.current?.prepareDataForGroupedSearch(),
        options : OptionRes.current?.prepareSearchData(),
        aggregate: AggRef.current?.prepareAggDataForSearch(),
        displayOptions: DisplayOptionRef.current?.prepareSearchData(),
        periodId: PeriodId,
        vLang: "ar",
      });
      console.log("vParams : ",vParams)
      const response = await axios.post(url, vParams, {
        headers: headers,
      });
      console.log("response : ", response);
      setSearchQueryHeader(response.data.data.report.header);
      console.log("searchQuery : ", SearchQuery);
      setSearchQuery(response.data.data.report.rows);
      if (SearchQuery.length === 0) {
        setSearchError("لا توجد نتائج متطابقة");
      }
      if (response.data.status) {
        setIsProgressClicked(true);
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
  };
  //function to make us contoll if the field in the query can i show it or not
  const toggleFieldVisibility = (fieldd) => {
    props.setvAFields((prevFields) =>
      prevFields.map((field) => {
        if (field.element === fieldd) {
          return { ...field, isShown: !field.isShown };
        }
        return field;
      })
    );
  };

  

  return (
    <>
      <ToolBar
        vaFields={props.vaFields}
        setvAFields={props.setvAFields}
        isProgressClicked={isProgressClicked}
        toggleFieldVisibility={toggleFieldVisibility}
        handleProgressClick={handleProgressClick}
        handleSearchClick={handleSearchClick}
        onNewClick={resetEveryThing}
        handelSearch={handelSearch}
        isQuery = {true}
        setIsToogleClicked={setIsToogleClicked}
        isToogleClicked={isToogleClicked}
      ></ToolBar>
      {
        <>
          <section
            className={`section ${
              (!isSearchClicked && !isProgressClicked) || isToogleClicked
                ? ""
                : "d-none"
            }`}
          >
            <Filter
              aFields={props.vaFields}
              missingFields = {missingFields}
              ref={filterRef}
              setIsProgressClicked={setIsProgressClicked}
              setIsToogleClicked={setIsToogleClicked}
              sectionOptions={props.sectionOptions}
            ></Filter>
            <div class="w-100 d-none d-sm-block order-0"></div>
            <div className="row pt-2 d-flex" style={{justifyContent : 'space-around'}}>
              {aFields.isGroupBy && (
                <GroupBy aFields={aFields} ref={GroupByRef}></GroupBy>
              )}
              {aFields.isAggregate && (
                <Aggreagte
                  aFields={aFields}
                  ref={AggRef}
                  PhAggregate={PhAggregate}
                ></Aggreagte>
              )}
              {aFields.isPrintOption && (
                <PrintOption
                  aFields={aFields}
                  ref={printOptionRef}
                ></PrintOption>
              )}
              {aFields.isDisplayOPtion && (
                <DisplayOption
                  aFields={aFields}
                  ref={DisplayOptionRef}
                ></DisplayOption>
              )}
              {aFields.isOption && (
                <Options
                  aFields={aFields}
                  ref={OptionRes}
                ></Options>
              )}
            </div>
          </section>
        </>
      }
      {isProgressClicked && !SearchQuery && (
        <>
          <div id="InventoryDifferencesQryCard" class="card card-custom mt-2">
            <div class="card-body">
              <div class="row pt-1">
                <div
                  id="InventoryDifferencesTableResult"
                  class="col-12 overflow-x-auto"
                >
                  <h4 class="text-center text-danger">{searchError}</h4>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {isProgressClicked && SearchQuery && (
        <>
          <SearchResult
            SearchQuery={SearchQuery}
            SearchQueryHeader={SearchQueryHeader}
          ></SearchResult>
        </>
      )}
    </>
  );
}
export default QueryForm;
