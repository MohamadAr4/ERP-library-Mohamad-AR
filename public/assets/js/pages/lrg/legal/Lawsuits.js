let phForm;
let userId=1;
let  aCity = PhSettings.UsrCodes.LrgCity,
     aType = PhSettings.UsrCodes.LrgSuitsType;
     aCourt = PhSettings.UsrCodes.LrgCourt,
     aSuit = PhSettings.UsrCodes.LrgSuits,
     aLawyer = []; 
jQuery(document).ready(function () {       
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_MstTrn};
  let metta = {};
  let aURL = {};
  let phTable = [
    {container: 'phTable',
      aColumns: initPhTableColumns(),
      height: 40,
      options: {widthType: PhTable_WIDTH_VARIABLE,
        addRowBtn: true}
    }
  ];
  getLawyer();
  getUserDeptUnits();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/Lawsuits';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: phTable};
  phForm = new PhForm('Settlements', metta, options);
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequest();
  });
});

function getBorrowRequest() {
  let aQData = [];
  aRequest = [];
  aQData[0] = {};
  aQData[0].fieldName = 'borrowerId';
  aQData[0].dataType = PhFC_Number;
  aQData[0].operation = '=';
  aQData[0].value1 = $('#fldBorrowerId').val();
  aQData[0].value2 = '';
  showHeaderSpinner(true);
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Request/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aRequest = response.data.List;
        renderRequest();
      }
    }
  });
  showHeaderSpinner(false);
}
function renderRequest() {
  let vHtml = '';
  for (let i = 0; i < aRequest.length; i++) {
    vHtml += '<option value="' + aRequest[i].id + '">' + aRequest[i].dnum + '</option>';
  }
  $('#fldReqId').html(vHtml);
}

function getLawyer(){ 
      $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/Lawyers/List',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': PhSettings.Headers.Authorization,
      'periodId': PhSettings.Period.Id,
      'gId': PhSettings.GUId.GId,
      'vLang': PhSettings.display.vLang
    }, success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aLawyer[i] = {};
          aLawyer[i].id = response.data.List[i].id;
          aLawyer[i].name = response.data.List[i].name;          
        }
      }
    }
  });

}

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('ReqId'),
    element: 'ReqId',
    field: 'reqId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Lrg/Borrowers/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('SuitId'),
    element: 'SuitId',
    field: 'suitId',
    component: PhFC_Select,
    Value: '0',
    options: aSuit,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('TypeId'),
    element: 'TypeId',
    field: 'typeId',
    component: PhFC_Select,
    defValue: '',
    options: aType,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('CourtId'),
    element: 'CourtId',
    field: 'courtId',
    component: PhFC_Select,
    defValue: '',
    options: aCourt,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('CityId'),
    element: 'CityId',
    field: 'cityId',
    component: PhFC_Select,
    defValue: '',
    options: aCity,
    aOpers: aSAOpers
  };
  
  aQFields[idx++] = {
    label: getLabel('Num'),
    element: 'BNum',
    field: 'bnum',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Subject'),
    element: 'Subject',
    field: 'subject',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
 
  aQFields[idx++] = {
    label: getLabel('DefendantName'),
    element: 'DefendantName',
    field: 'defendantname',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('LawyerId'),
    element: 'LawyerId',
    field: 'lawyerId',
    getLabel: true,
    component: PhFC_Select,
    defValue: '',
    options: aLawyer,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Stage'),
    element: 'Stage',
    field: 'stage',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Ddate'),
    element: 'Ddate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Lawyor'),
    element: 'Lawyor',
    field: 'lawyor',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('Proccess'),
    element: 'Proccess',
    field: 'proccess',
    defValue: '',
    component: PhFC_Text,
    aOpers: aTOpers
  };
 
  
  aQFields[idx++] = {
    label: getLabel('Rem'),
    element: 'Rem',
    field: 'rem',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  return aQFields;
}
function getFields() {
  let aFields = [];
  let idx = 0;
  aFields[idx++] = {
    element: 'fldId',
    field: 'id',
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('ReqId'),
    element: 'fldReqId',
    rElement: 'fldReqName',
    field: 'reqId',
    rField: 'reqNum',
    isRequired: true,
    defValue: '',
    tableWidth: '25'
  };
  aFields[idx++] = {
    label: getLabel('SuitId'),
    element: 'fldSuitId',
    field: 'suitId',
    rField: 'suitName',
    getLabel: true,
    isRequired: true,
    Value: '0',
    options: aSuit,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('TypeId'),
    element: 'fldTypeId',
    field: 'typeId',
    rField: 'typeName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aType,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('CourtId'),
    element: 'fldCourtId',
    field: 'courtId',
    rField: 'courtName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aCourt,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('CityId'),
    element: 'fldCityId',
    field: 'cityId',
    rField: 'cityName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aCity,
    tableWidth: '100px'
  };
  
  aFields[idx++] = {
    label: getLabel('Num'),
    element: 'fldBNum',
    field: 'bnum',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Subject'),
    element: 'fldSubject',
    field: 'subject',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('PlaintiffName'),
    element: 'fldPlaintiffName',
    field: 'plaintiffname',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('DefendantName'),
    element: 'fldDefendantName',
    field: 'defendantname',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('LawyerId'),
    element: 'fldLawyerId',
    field: 'lawyerId',
    rField: 'lawyerName',
    getLabel: true,
    isRequired: true,
    defValue: '',
    options: aLawyer,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Ddate'),
    element: 'fldDdate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Stage'),
    element: 'fldStage',
    field: 'stage',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Lawyor'),
    element: 'fldLawyor',
    field: 'lawyor',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Proccess'),
    element: 'fldProccess',
    field: 'proccess',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: '100px'
  };
  return aFields;
}

function initPhTableColumns() {
  let aColumns = [];
  let nIdx = 0;
  aColumns[nIdx++] = {
    title: '<i class="icon flaticon-delete p-0"></i>',
    field: 'delrow',
    width: '35px',
    component: 'button',
    enabled: true,
    classes: 'btn-danger',
    format: '<i class="bi bi-trash p-1"></i>',
    callback: {'event': 'click',
      'callback': deleteRow
    }
  };
  aColumns[nIdx++] = {
    title: 'id',
    field: 'id',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: 'MstId',
    field: 'mstId',
    visible: false,
    component: 'input',
    enabled: true,
    defValue: 0
  };
  aColumns[nIdx++] = {
    title: getLabel('Num'),
    field: 'num',
    width: '150px',
    datatype: 'integer',
    component: 'input',
    required: true,
    enabled: true,
    defValue: '',
    options: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Ddate'),
    field: 'ddate',
    datatype: 'date',
    width: '150px',
    component: 'input',
    componentType: 'date',
    enabled: true,
    required: true,
    defValue: currentDate()
  };
  aColumns[nIdx++] = {
    title: getLabel('Subject'),
    field: 'subject',
    width: '450px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Sutsresult'),
    field: 'sutsresult',
    width: '450px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Delayreason'),
    field: 'delayreason',
    width: '450px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  aColumns[nIdx++] = {
    title: getLabel('Rem'),
    field: 'rem',
    width: '450px',
    datatype: 'string',
    component: 'input',
    required: false,
    enabled: true,
    defValue: ''
  };
  return aColumns;
}

function deleteRow() {
  phForm.phTable.phT0.deleteRow(parseInt($(this).data('row')));
}

function getUserDeptUnits() {
  $.ajax({
    type: 'POST',
    url: PhSettings.apiURL + '/UC/Cpy/UserUnits/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify([{
        fieldName: 'userId',
        dataType: PhFC_Number,
        operation: '=',
        value1: userId
      }]),
    success: function (response) {
      if (response.status && response.code === 200) {
        aDepartment = response.data.List;
        getCheckList();
      }
    }
  });
}

function getCheckList() {
  let aQData = [];
  let nIdx = 0;
  aQData[nIdx] = {};
  aQData[nIdx].fieldName = 'deptId';
  aQData[nIdx].dataType = '2';
  aQData[nIdx].operation = 'IN';
  aQData[nIdx].values = [];
  for (let i = 0; i < aDepartment.length; i++) {
    aQData[nIdx].values[i] = aDepartment[i].deptId;
  }
  aQData[++nIdx] = {};
  aQData[nIdx].fieldName = 'unitId';
  aQData[nIdx].dataType = '2';
  aQData[nIdx].operation = 'IN';
  aQData[nIdx].values = [];
  for (let i = 0; i < aDepartment.length; i++) {
    aQData[nIdx].values[i] = aDepartment[i].unitId;
  }
  aQData[++nIdx] = {};
  aQData[nIdx].fieldName = 'mprgId';
  aQData[nIdx].dataType = '2';
  aQData[nIdx].operation = '=';
  aQData[nIdx].value1 = PhSettings.MPrg.id;

  $.ajax({
    type: 'POST',
    url: PhSettings.apiURL + '/UC/Lrg/CodeChecklist/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aCheckList = response.data.List;
        getMstCheckList();
      }
    }
  });
}

function getMstCheckList() {
  let aQData = [];
  aQData[0] = {};
  aQData[0].fieldName = 'id';
  aQData[0].dataType = '2';
  aQData[0].operation = 'IN';
  aQData[0].value1 = '';
  aQData[0].value2 = '';
  aQData[0].values = [];
  for (let i = 0; i < aDepartment.length; i++) {
    aQData[0].values[i] = aCheckList[i].checklistId;
  }
  $.ajax({
    type: 'POST',
    url: PhSettings.apiURL + '/UC/Lrg/CodeMchecklist/Search/0/0',
    headers: PhSettings.Headers,
    data: JSON.stringify(aQData),
    success: function (response) {
      if (response.status && response.code === 200) {
        aMstChecklist = response.data.List;
        renderMstChecklist();
      }
    }
  });
}

function renderMstChecklist() {
  let vHtml = "";
  let table="";
  for (let i = 0; i < aMstChecklist.length; i++) {
  vHtml+= '<li class="nav-item" >';
  vHtml+= `<span id=${aMstChecklist[i].id} class="nav-link "  data-bs-toggle="pill" data-bs-target=${"#"+aMstChecklist[i].name}> ${aMstChecklist[i].name} </span>`;
  vHtml+= '</li>';        
  console.log(aMstChecklist[i]);
  table+=`<div id=${aMstChecklist[i].name} class="tab-pane"  >`;
  table+= `<div class="col-12 mx-auto">`;
  table+=`<table class="table  caption-top" >`;
  table+=`<caption>${aMstChecklist[i].aList[0].groupName}</caption>`; 
  table+=`<tbody >`;
    for (let j = 0; j < aMstChecklist[i].aList.length; j++) {
    table+=`<tr >`;

    table+=`<td class="ps-5" style="background-color: transparent;" >${aMstChecklist[i].aList[j].itemName} </td>`;
    if (parseInt(aMstChecklist[i].aList[j].ischeckId) === 1) {
         table += `<td style="background-color: transparent;"> <input class="form-check-input border-secondary ok-tChickList" style="width:25px; height:25px;" type="checkbox" data-id="' + aMstChecklist[i].aList[j].id + '"> </td>`;
    }
    else{
       table += `<td style="background-color: transparent;"> <input id="" class="form-control form-control-sm ok-tChickList" type="text" value="" autocomplete="off" required="true" data-id="' + aMstChecklist[i].aList[j].id + '" ' + (aMstChecklist[i].aList[j].isRequiredId === 1 ? ' required' : '') + '/> </td>`;
    }
    table+=`<td style="background-color: transparent;">`;  
    if (parseInt(aMstChecklist[i].aList[j].isattachId) === 1) {
    table += `<button  id="" class="btn btn-sm btn-success toolbar-btn mx-1" type="button" data-bs-title="Upload" title="تحميل">`;
    table += `<i class="bi bi-upload"></i> `;
    table += `</button> `;
    }
    table += `</td>`;    
    
    table+=`</tr>`;
  }
  
  table+=`</tbody>`;
  table+=`</table>`;
  table+=`</div>`;      
  table+=`</div>`;      
    }
    $("#title-tab").append(vHtml);
  $(".tab-content").append(table);
}
