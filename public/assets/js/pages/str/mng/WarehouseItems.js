let phForm;
let aStore = [];
let aStatus = PhSettings.PhsCodes.PhsStatus;
let aLocation1 = PhSettings.UsrCodes.StrLocation1,
        aLocation2 = PhSettings.UsrCodes.StrLocation2,
        aLocation3 = PhSettings.UsrCodes.StrLocation3;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  getList();
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Str/StoresMateriales';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getaQFields(), phTable: '', beforSave: checkValue};
  phForm = new PhForm('StoreMaterials', metta, options);
});

function acParams() {
  return {storId: parseInt($('#fldStorId').val())};
}

function getList() {
  getStore();
}

function getStore() {
  $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Str/Stores/List',
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
          aStore[i] = {};
          aStore[i].id = response.data.List[i].id;
          aStore[i].name = response.data.List[i].name;
        }
      }
    }
  });
}

function getaQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('Store'),
    element: 'StorId',
    field: 'storId',
    component: PhFC_Select,
    defValue: -1,
    options: aStore,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Item'),
    element: 'Item',
    field: 'itemId',
    component: PhFC_Autocomplete,
    defValue: '',
    autoCompleteApi: '/UC/Str/Items/Autocomplete',
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Status'),
    element: 'StatusId',
    field: 'statusId',
    component: PhFC_Select,
    defValue: -1,
    options: aStatus,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Location') + ' 1',
    element: 'Loc1Id',
    field: 'loc1Id',
    component: PhFC_Select,
    defValue: -1,
    options: aLocation1,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Location') + ' 2',
    element: 'Loc2Id',
    field: 'loc2Id',
    component: PhFC_Select,
    defValue: -1,
    options: aLocation2,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Location') + ' 3',
    element: 'Loc3Id',
    field: 'loc3Id',
    component: PhFC_Select,
    defValue: -1,
    options: aLocation3,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Req.Limit'),
    element: 'ReqLimit',
    field: 'reqLimit',
    component: PhFC_Number,
    defValue: '',
    minValue: '0',
    step: '1',
    maxValue: '9999',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Min.Limit'),
    element: 'MinLimit',
    field: 'minLimit',
    component: PhFC_Number,
    defValue: '',
    minValue: '0',
    step: '1',
    maxValue: '9999',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Max.Limit'),
    element: 'MaxLimit',
    field: 'maxLimit',
    component: PhFC_Number,
    defValue: '',
    minValue: '0',
    step: '1',
    maxValue: '9999',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Quantity'),
    element: 'CQnt',
    field: 'cqnt',
    component: PhFC_Number,
    defValue: '',
    minValue: '0',
    step: '1',
    maxValue: '9999',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('Amount'),
    element: 'Camt',
    field: 'camt',
    component: PhFC_Number,
    defValue: '',
    minValue: '0',
    step: '1',
    maxValue: '9999',
    aOpers: aNOpers
  };
//  aQFields[idx++] = {
//    label: getLabel('Rem'),
//    element: 'Rem',
//    field: 'rem',
//    component: PhFC_Text,
//    defValue: '',
//    aOpers: [PhFOper_EQ, PhFOper_NE, PhFOper_ST, PhFOper_NST,
//      PhFOper_CT, PhFOper_NCT, PhFOper_ED, PhFOper_NED]
//  };
  return aQFields;
}

function getFields() {
  let aFields = [];
  let idx = 0;
  aFields[idx++] = {
    element: 'fldId',
    field: 'id',
    isRequired: false,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Store'),
    element: 'fldStorId',
    field: 'storId',
    rField: 'storName',
    isRequired: true,
    defValue: '',
    options: aStore,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Item'),
    element: 'fldItemId',
    rElement: 'fldItemName',
    field: 'itemId',
    rField: 'itemName',
    isRequired: true,
    defValue: '',
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    element: 'fldStatusId',
    field: 'statusId',
    rField: 'statusName',
    getLabel: true,
    isRequired: true,
    defValue: '1',
    options: aStatus,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Location') + ' 1',
    element: 'fldLoc1Id',
    field: 'loc1Id',
    rField: 'loc1Name',
    isRequired: true,
    defValue: 0,
    options: aLocation1,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Location') + ' 2',
    element: 'fldLoc2Id',
    field: 'loc2Id',
    rField: 'loc2Name',
    isRequired: true,
    defValue: 0,
    options: aLocation2,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Location') + ' 3',
    element: 'fldLoc3Id',
    field: 'loc3Id',
    rField: 'loc3Name',
    isRequired: true,
    defValue: 0,
    options: aLocation3,
    tableWidth: '150px'
  };
  aFields[idx++] = {
    label: getLabel('Min'),
    element: 'fldMinLimit',
    field: 'minLimit',
    isRequired: true,
    defValue: 0,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Request'),
    element: 'fldReqLimit',
    field: 'reqLimit',
    isRequired: true,
    defValue: 0,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Max'),
    element: 'fldMaxLimit',
    field: 'maxLimit',
    isRequired: true,
    defValue: 0,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Quantity'),
    element: 'fldCQnt',
    field: 'cqnt',
    isRequired: true,
    defValue: 0.0,
    tableWidth: '100px'
  };
  aFields[idx++] = {
    label: getLabel('Amount'),
    element: 'fldCAmt',
    field: 'camt',
    isRequired: true,
    defValue: 0.0,
    tableWidth: '100px'
  };
//  aFields[idx++] = {
//    label: getLabel('Rem'),
//    element: 'fldRem',
//    field: 'rem',
//    isRequired: true,
//    defValue: '',
//    tableWidth: 20
//  };
  return aFields;
}

function checkValue() {
  let nReqLimit = parseFloat($('#fldReqLimit').val());
  let nMinLimit = parseFloat($('#fldMinLimit').val());
  let nMaxLimit = parseFloat($('#fldMaxLimit').val());
  if (nMinLimit <= nReqLimit && nMaxLimit >= nReqLimit) {
    $('#fldReqLimit').removeClass('invalid');
    $('#fldMinLimit').removeClass('invalid');
    $('#fldMaxLimit').removeClass('invalid');
    phForm.validated = true;
  } else {
    $('#fldReqLimit').addClass('invalid');
    $('#fldMinLimit').addClass('invalid');
    $('#fldMaxLimit').addClass('invalid');
    phForm.validated = false;
    showToast(getLabel('Failed.To.Add'), 'DANGER', getLabel('Check the limits ( Min Limit < Required Limit < Max Limit)'));
    return 0;
  }
}

