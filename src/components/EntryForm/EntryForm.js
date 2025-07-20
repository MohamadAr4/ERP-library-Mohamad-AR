import EntryBlock from "../EntryBlock/EntryBlock";
import QueryFilter from "../QueryFilter/QueryFilter";
import SearchResult from "../SearchResult/SearchQueryResult";
import ToolBar from "../ToolBar/ToolBar";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRef } from "react";
import Filter from "../QueryFilter/Filter";
import EntryTable from "../MasterTransaction/EntryTable/EntryTable";
import PhFOperations from "../../data/operation";
function EntryForm(props, ref) {
  useImperativeHandle(ref, () => ({
    setRows,
  }));
  const aFields = props.aFields;
  const inputs = props.inputs;
  const setInputs = props.setInputs;
  const entryRef = useRef();
  const filterRef = useRef();

  //data form the server Token and statusSetting(active/disActive)
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const PhStatusSetting = useSelector(
    (state) => state.user.user.data.PhsCodes.PhsStatus
  );
  const sectionOptions = props.sectionOptions;
  const Statusoptions = props.Statusoptions;
  //state for the toolBar when i click each of button of the toolBar what will happened
  const [isSearchClicked, setIsSearchClicked] = useState(true);
  const [isToogleClicked, setIsToogleClicked] = useState(false);
  const [isProgressClicked, setIsProgressClicked] = useState(false);

  const [afterGetMessage, setAfterGetMessage] = useState("");
  //state for store if the delete is done successfully
  const [isDeleteDone, setIsDeleteDone] = useState(false);
  //state for store if the delete is not done
  const [isDeleteError, setIsDeleteError] = useState(false);
  //state for store the Rows that i have in my table
  const [rows, setRows] = useState([{ id: 0 }]);
  //state for store if the add is done successfully
  const [isAddDone, setIsAddDone] = useState(false);
  //state for store if the delete after get is done successfully
  const [isDeleteAfterGetDone, setIsDeleteAfterGetDone] = useState(false);
  //state for store if the get is done successfully
  const [isGetDone, setIsGetDone] = useState(false);
  //state for store the inserted id after successfull add or successfull get
  const [insertedId, setInsertedId] = useState(null);
  //state for store the searchResult that i get form the search api
  const [SearchQuery, setSearchQuery] = useState([]);
  //state for store the Index of the searched item and get it Index
  const [searchQueryIndex, setSearchQueryIndex] = useState(null);
  //state for store the search condition that i want to search for
  const [SearchCreadintal, setSearchCreadintal] = useState(null);
  //state for store the how many records that i get form my search result
  const [count, setCount] = useState(null);
  //state for make sure that the user can search in pager or not
  const [shouldSearch, setShouldSearch] = useState(false);
  //state for tell the user if there is anything after the search
  const [searchErrorMessage, setSearchErrorMessage] = useState(null);
  //state for store the searchError code which means i have no result form the search
  const [searchErrorCode, setSearchErrorCode] = useState(null);

  //state for make the array of input based on the Json

  //function to know what will do if i click the search button
  const handleSearchClick = () => {
    //first make the state of the if search cliked is the the opposite of the pre state
    setIsSearchClicked((prevState) => !prevState);
    //after that we make the condition that i was wanted to search to null
    setSearchCreadintal(null);
    //then i set isGetDone state to false in case we in get mode to exit that mode
    setIsGetDone(false);
    //here we reset the data of the fields that i have
    resetInputs();
  };

  //function to know what will do if i click the progress button
  const handleProgressClick = () => {
    //make the state of the if progress cliked is the the opposite of the pre state
    setIsProgressClicked((prevState) => !prevState);
  };

  //function to know what will do if i click the Add button
  const handelAddClick = () => {
    //so here we have to situtaion
    //first if the insertedId is not null that tells us that either we in get mode or we add something new and we have the abbilty to update the thing that we created
    if (insertedId !== null) {
      //calling update cuz we insertedId and we pass it to the function which is in the entryBlock
      entryRef.current.handelUpdate(insertedId);
    }
    //second if we dont have inserted id and the state of the delete after get is fasle to call the submit
    else if (!insertedId && !isDeleteAfterGetDone) {
      entryRef.current.handleSubmit();
    }
  };

  //function to know what will do if i click the delete button
  const handelDeleteClick = () => {
    //here we have condition if is the inserted Id is not null
    if (insertedId !== null) {
      //if it is not null so we have the abbility to delete the thing that we created or get or updated
      //we pass the inserted Id to the function to delete
      handelDelete(insertedId);
    }
  };

  //function to hendelSearch in pager at the top of the page after get
  const handelPagerSearch = async (page, req) => {
    try {
      const url = `${props.aFields.URLS.Search.URl}${page}/${req}`;
      const headers = {
        periodId: 2022,
        Authorization: `Bearer ${PhToken}`,
        "Content-Type": "application/json",
      };
      console.log("Search Cread", SearchCreadintal);
      //here we make the Api call in axios in we pass the SearchCreadintal as body to know the backend that the condition that we want to search about
      const response = await axios.post(url, SearchCreadintal, {
        headers: headers,
      });
      console.log(response);
      //here we store the result of the search Api in SearchQuery state
      setSearchQuery(response.data.data.List);
      //here we make sure that the message of the response is Success which means that the result is not empty
      if (response.data.message === "Success") {
        //here we make the progress clicked is true to show the result table
        setIsProgressClicked(true);
        //then store the Inserted Id
        setInsertedId(response.data.data.List[0].id);
        //here we pass the result for fuction which responsible to fill the field with the respone that i get
        updateInputsWithResponse(response.data.data.List[0]);

        props.afterGet?.(response.data.data , setAfterGetMessage);
        
      } else {
        //and if the message of the response is not success we take the message and store it in the state to show it for the user
        entryRef.current.setIsError(response.data.message);
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

  //function to reset all the input
  const resetInputs = () => {
    const initialInputs = aFields.Fields.reduce((acc, field) => {
      if (field) {
        acc[field.element] = field.Form.defValue;
        acc[field.rElement] = field.Form.defValue;
        if (field.type !== "hidden") {
          acc[field.Query.Operation] =
            PhFOperations[field.Query.defOperationValue].sign;
        }
      }
      return acc;
    }, {});
    entryRef.current?.resetRowsAndData();
    setIsAddDone(false);
    setInsertedId(null);
    setIsProgressClicked(false);
    setIsToogleClicked(false);
    if (!isDeleteAfterGetDone) {
      setSearchCreadintal(null);
    }
    console.log(insertedId);
    setInputs(initialInputs);
  };

  //function to format the date that return from the get
  function formatDateWithMonthName(dateString) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [day, month, year] = dateString.split("-");
    const monthName = monthNames[month - 1]; // Subtract 1 because month array is zero-based
    return `${day} ${monthName} ${year}`;
  }

  //function to update the input value based on the respone of the get
  const updateInputsWithResponse = (responseData) => {
    console.log(responseData);
    //here we make sure the response have something that called aList which have the data that i passed form the handle pager search if it does have aList that means that i have date in Row
    if (responseData.hasOwnProperty("aList")) {
      const updatedRows = [];
      responseData.aList.forEach((item, index) => {
        const newRow = {};
        Object.keys(item).forEach((key) => {
          //here we store the id of the response
          newRow["id"] = item["id"];
          //then we find the column in my Json file
          const field = aFields.Column.find((field) => field.field === key);
          //if there is a field
          if (field) {
            //and the type of it is select
            if (field.type === "select") {
              //then we declare a var called matchingOption then we make the value of it the sectionOption which gave it the key which is field.options
              const matchingOption = sectionOptions[field.options].find(
                //then we took the option of it and make it value of the value that came form the Api
                (option) => option.value === item[key]
              );
              //after that if i have matchingOption that match with i have option in my column
              if (matchingOption) {
                //we make the value of it to be in the value of out select option in our column
                newRow[field.defLabel] = matchingOption.label;
                newRow[field.field] = matchingOption.value;
              }
            }
            //then we make sure that the field in our row the type of the field is date
            else if (field.type === "date") {
              // Format the date if the field type is "date"
              if (item[key]) {
                const formatedDate = formatDateWithMonthName(item[key]);
                newRow[field.field] = formatedDate;
              } else {
                newRow[field.field] = "";
              }
            }
            //here we make it to the final condtion if the field it is not date or select
            else if (field.isAutocomplete) {
              newRow[field.field] = item[key] === null ? "" : item[key];
              newRow[field.rfield] = item[field.rfield];
            } else {
              newRow[field.field] = item[key];
            }
          }
        });
        updatedRows.push(newRow);
      });
      //after update the value of the rows after get the data then we store the rows whith getten data to show it to the user and make him update if he want
      setRows(updatedRows);
      console.log("Rows", rows);

      const updatedInputs = aFields.Fields.reduce((acc, field) => {
        if (responseData.hasOwnProperty(field.field)) {
          if (field.type === "date" && responseData[field.field] !== null) {
            const formatedDate = formatDateWithMonthName(
              responseData[field.field]
            );
            acc[field.element] = formatedDate;
            console.log("formated data : ", formatedDate);
          } else {
            acc[field.element] = responseData[field.field];
            acc[field.rElement] = responseData[field.rField];
          }
        }
        console.log("acc in parent", acc);
        return acc;
      }, {});
      setInputs(updatedInputs);
    }
    //here if i dont have Rows
    else {
      const updatedInputs = aFields.Fields.reduce((acc, field) => {
        console.log("updateInputs not MT");
        if (responseData.hasOwnProperty(field.field)) {
          if (field.type === "date" && responseData[field.field] !== null) {
            const formatedDate = formatDateWithMonthName(
              responseData[field.field]
            );
            acc[field.element] = formatedDate;
            console.log("dateaaa", formatedDate);
          } else {
            acc[field.element] =
              responseData[field.field] === null
                ? ""
                : responseData[field.field];
            acc[field.rElement] = responseData[field.rField];
          }
        }

        return acc;
      }, {});
      setInputs(updatedInputs);
    }
  };
  //function to make the search Api
  const handelSearch = async (page, req) => {
    setSearchErrorCode(null);
    try {
      const url = `${props.aFields.URLS.Search.URl}${page}/${req}`;
      const headers = {
        periodId: 2022,
        Authorization: `Bearer ${PhToken}`,
        "Content-Type": "application/json",
      };
      console.log(headers);
      const response = await axios.post(
        url,
        filterRef.current?.prepareDataForSearch(),
        {
          headers: headers,
        }
      );
      console.log(response);
      setCount(response.data.data.Count);
      setSearchQuery(response.data.data.List);
      if (response.data.message === "Success") {
        setIsProgressClicked(true);
      }
      if (response.data.code === 204) {
        setIsProgressClicked(true);
        setSearchErrorCode(response.data.code);
        setSearchErrorMessage("لا توجد نتائج متطابقة");
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

  //function to make the Delete Api
  const handelDelete = async (insertedId) => {
    try {
      const url = `${props.aFields.URLS.Delete.URl}${insertedId}`;
      const headers = {
        periodId: 2022,
        Accept: "application/json",
        Authorization: `Bearer ${PhToken}`,
        "Content-Type": "application/json",
      };
      console.log(headers);
      const response = await axios.delete(url, { headers: headers });
      console.log(response);
      if (response.data.status === true) {
        setIsDeleteDone(true);
        if (shouldSearch) {
          setInsertedId(null);
          console.log(insertedId);
          console.log(shouldSearch);
          resetInputs();
        }
        if (isDeleteAfterGetDone) {
          console.log("after pager", insertedId);
          console.log("after pager", shouldSearch);
          setCount(count - 1);
          handelSearch(searchQueryIndex - 1, 1);
          setInsertedId(response.data.data.List[0].id);
          updateInputsWithResponse(response.data.data.List[0]);
          setIsDeleteAfterGetDone(false);
        }
        setTimeout(() => {
          setIsDeleteDone(false);
        }, 5000);
      } else {
        entryRef.current.setIsError(response.data.message);
        setIsDeleteDone(false);
        setIsDeleteError(true);
        setTimeout(() => {
          setIsDeleteError(false);
        }, 5000);
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

  //function to make the Get Api
  const handelGet = async (insertedId) => {
    try {
      const url = `${props.aFields.URLS.Get.URl}${insertedId}`;
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
        setInsertedId(response.data.data.Obj.id);
        updateInputsWithResponse(response.data.data.Obj);
        setIsGetDone(true);
        setIsDeleteAfterGetDone(true);
        setIsToogleClicked(false);
        props?.afterGet(response.data.data);
      } else {
        entryRef.current.setIsError(response.data.message);
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
  console.log(afterGetMessage)
  return (
    <>
      <ToolBar
        aFields={aFields}
        isSearchClicked={isSearchClicked}
        isProgressClicked={isProgressClicked}
        handleProgressClick={handleProgressClick}
        handleSearchClick={handleSearchClick}
        PhStatusSetting={PhStatusSetting}
        onNewClick={resetInputs}
        handelAddClick={handelAddClick}
        handelDeleteClick={handelDeleteClick}
        handelSearch={handelSearch}
        setIsGetDone={setIsGetDone}
        isGetDone={isGetDone}
        searchQueryIndex={searchQueryIndex}
        setSearchQueryIndex={setSearchQueryIndex}
        handelPagerSearch={handelPagerSearch}
        count={count}
        isAddDone={isAddDone}
        insertedId={insertedId}
        setInsertedId={setInsertedId}
        setShouldSearch={setShouldSearch}
        shouldSearch={shouldSearch}
        setIsDeleteAfterGetDone={setIsDeleteAfterGetDone}
        setSearchCreadintal={setSearchCreadintal}
        setIsToogleClicked={setIsToogleClicked}
        isToogleClicked={isToogleClicked}
        isQuery={false}
        vaFields={props.vaFields}
        toggleFieldVisibility={props.toggleFieldVisibility}
      ></ToolBar>
      {(!isSearchClicked || !isGetDone) && (isSearchClicked || isGetDone) && (
        <EntryBlock
          aFields={aFields}
          ref={entryRef}
          inputs={inputs}
          afterGetMessage={afterGetMessage}
          preInsert={props.preInsert}
          preUpdate={props.preUpdate}
          setNewOption={props.setNewOption}
          setIsAddDone={setIsAddDone}
          isGetDone= {isGetDone}
          setInputs={setInputs}
          baseUrl={props.baseUrl}
          isDeleteError={isDeleteError}
          handelGet = {handelGet}
          isDeleteDone={isDeleteDone}
          insertedId={insertedId}
          setInsertedId={setInsertedId}
          packageName={props.packageName}
          newEndPoint={props.newEndPoint}
          Statusoptions={Statusoptions}
          sectionOptions={sectionOptions}
          rows={rows}
          setRows={setRows}
          rate={props.rate}
          setRate={props.setRate}
          resetCorrespondingField={props.resetCorrespondingField}
        ></EntryBlock>
      )}
      {((!isSearchClicked && !isProgressClicked) || isToogleClicked) && (
        <>
          <Filter
            aFields={props.vaFields}
            ref={filterRef}
            Statusoptions={Statusoptions}
            missingField={null}
            inputs={inputs}
            setInputs={setInputs}
            setSearchCreadintal={setSearchCreadintal}
            sectionOptions={sectionOptions}
          ></Filter>
        </>
      )}
      {isProgressClicked && searchErrorCode === 204 && (
        <>
          <div id="InventoryDifferencesQryCard" class="card card-custom mt-2">
            <div class="card-body">
              <div class="row pt-1">
                <div
                  id="InventoryDifferencesTableResult"
                  class="col-12 overflow-x-auto"
                >
                  <h4 class="text-center text-danger">{searchErrorMessage}</h4>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {isProgressClicked && !isGetDone && searchErrorCode !== 204 && (
        <>
          <SearchResult
            SearchQuery={SearchQuery}
            aFields={aFields}
            count={count}
            handelPagerSearch={handelPagerSearch}
            handelSearch={handelSearch}
            handelGet={handelGet}
            setIsGetDone={setIsGetDone}
            isGetDone={isGetDone}
            setSearchQueryIndex={setSearchQueryIndex}
            searchQueryIndex={searchQueryIndex}
            insertedId={insertedId}
            setInsertedId={setInsertedId}
          ></SearchResult>
        </>
      )}
    </>
  );
}
export default forwardRef(EntryForm);
