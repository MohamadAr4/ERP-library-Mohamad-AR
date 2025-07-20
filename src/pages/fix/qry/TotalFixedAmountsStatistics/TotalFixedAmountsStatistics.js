import QueryFilter from "../../../../components/QueryFilter/QueryFilter";
import ToolBar from "../../../../components/ToolBar/ToolBar";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResult from "../../../../components/QueryForm/SearchResult/SearchResult";
import axios from "axios";
import {
  meta,
  aAggregation,
} from "../../../../data/Jsons/fix/qry/TotalFixedAmountsStatistics/TotalFixedAmountsStatistics";
import PrintOption from "../../../../components/QueryForm/PrintOption/PrintOption";
import { PhAggregate } from "../../../../data/operation";
import Aggreagte from "../../../../components/QueryForm/Aggregate/Aggregate";
import GroupBy from "../../../../components/QueryForm/GroupBy/GroupBy";
import Filter from "../../../../components/QueryForm/Filter/Filter";
import OrderBy from "../../../../components/QueryForm/OrederBy/OrderBy";
import Modal from "../../../../components/Modal/Modal";
import StaticExample from "../../../../components/Modal/Modal";
import Example from "../../../../components/Modal/Modal";
import QueryForm from "../../../../components/QueryForm/QueryForm";
function TotalFixedAmountsStatistics(props) {
  let aFields = meta;
  const [vaFields, setvAFields] = useState(aFields.Fields);
  const PhStatusSetting = useSelector(
    (state) => state.user.user.data.UsrCodes.FixStatus
  );
  const aSpc1 = useSelector(
    (state) => state.user.user.data.UsrCodes.FixSpecification1
  );
  const aSpc2 = useSelector(
    (state) => state.user.user.data.UsrCodes.FixSpecification2
  );
  const aSpc3 = useSelector(
    (state) => state.user.user.data.UsrCodes.FixSpecification3
  );
  const aSpc4 = useSelector(
    (state) => state.user.user.data.UsrCodes.FixSpecification4
  );
  const aSpc5 = useSelector(
    (state) => state.user.user.data.UsrCodes.FixSpecification5
  );
  const Statusoptions = PhStatusSetting.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const aLocation1 = useSelector(
    (state) => state.user.user.data.UsrCodes.FixLocation1
  );
  const aLocation2 = useSelector(
    (state) => state.user.user.data.UsrCodes.FixLocation2
  );
  const aLocation3 = useSelector(
    (state) => state.user.user.data.UsrCodes.FixLocation3
  );
  const Location1 = aLocation1.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Location2 = aLocation2.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Location3 = aLocation3.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Spc1 = aSpc1.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Spc2 = aSpc2.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Spc3 = aSpc3.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Spc4 = aSpc4.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const Spc5 = aSpc5.map((setting) => ({
    value: setting.id,
    label: setting.name,
  }));
  const sectionOptions = {
    fixStatus: Statusoptions,
    fixSec1: Spc1,
    fixSec2: Spc2,
    fixSec3: Spc3,
    fixSec4: Spc4,
    fixSec5: Spc5,
    sec1: Spc1,
    sec2: Spc2,
    sec3: Spc3,
    sec4: Spc4,
    sec5: Spc5,
    loc1name: Location1,
    loc2name: Location2,
    loc3name: Location3,
  };
  return (
    <>
    <QueryForm meta = {meta} vaFields={vaFields} setvAFields = {setvAFields} sectionOptions = {sectionOptions}></QueryForm>
    </>
  );
}
export default TotalFixedAmountsStatistics;
