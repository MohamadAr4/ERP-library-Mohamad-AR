let phForm;
let aPointersTrn = [],
        aClassificationData = [],
        aType = [],
        aTable = PhSettings.UsrCodes.LrgPointerTables,
        aCat = PhSettings.UsrCodes.LrgCategory;
jQuery(document).ready(function () {
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/RequestCategoryMst';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: '', beforSave: saveTrnData, afterEdit: afterEdit};
  phForm = new PhForm('CreditRating', metta, options);
  $('#fldBorrowerName').focusout(function () {
    getBorrowRequest();
  });
  $('#ph-executeK').click(function (e) {
    e.preventDefault();
    getClassificationData();
  });
});

function afterEdit() {
  $('#ph-delete').attr('disabled', true);
}
function getClassificationData() {
  let id = $('#fldReqId').val();
  $.ajax({
    type: 'Get',
    url: PhSettings.apiURL + '/CC/LRG/executeClassification/' + id,
    headers: PhSettings.Headers,
    success: function (response) {
      aClassificationData = response.data.Obj;
      renderClassificationData();
    }
  });
}

function renderClassificationData() {
  $('#fldSumWheight').val(aClassificationData.sumWheight);
  $('#fldCatId').val(aClassificationData.catId);
  $('#fldCatName').val(aClassificationData.catName);
  $('#fldPDval').val(aClassificationData.PDval);
  $('#fldDegreeId').val(aClassificationData.DegreeId);
  $('#fldDegreeName').val(aClassificationData.DegreeName);
  let vHtml = '';
  for (let index = 0; index < aClassificationData.pointers.length; index++) {
    vHtml += '<tr>';
    vHtml += '  <td style="width: 35px;">' + parseInt(index + 1) + '</td>';
    vHtml += '  <td>' + aClassificationData.pointers[index].tableName + '</td>';
    vHtml += '  <td>' + aClassificationData.pointers[index].typeName + '</td>';
    vHtml += '  <td>' + aClassificationData.pointers[index].value + '</td>';
    vHtml += '  <td>' + aClassificationData.pointers[index].weight + '</td>';
    if (aClassificationData.pointers[index].rem === null) {
      vHtml += '<td></td>';
    } else {
      vHtml += '<td>' + aClassificationData.pointers[index].rem + '</td>';
    }
    vHtml += '</tr>';
  }
  $("#tableBody").html(vHtml);
}

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
    label: getLabel('DDatee'),
    element: 'DDate',
    field: 'ddate',
    component: PhFC_DatePicker,
    defValue: '',
    aOpers: aDOpers
  };
  aQFields[idx++] = {
    label: getLabel('Opinion'),
    element: 'Opinion',
    field: 'opinion',
    component: PhFC_Text,
    defValue: '',
    aOpers: aTOpers
  };
  aQFields[idx++] = {
    label: getLabel('FootNote'),
    element: 'FootNote',
    field: 'footnote',
    component: PhFC_Text,
    defValue: '',
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
    label: getLabel('CatId'),
    element: 'fldCatId',
    field: 'catId',
    isRequired: false,
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('DegreeId'),
    element: 'fldDegreeId',
    field: 'degreeId',
    isRequired: false,
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('DDate'),
    element: 'fldDDate',
    field: 'ddate',
    isRequired: true,
    defValue: currentDate(),
    tableWidth: 10
  };

  aFields[idx++] = {
    label: getLabel('Opinion'),
    element: 'fldOpinion',
    field: 'opinion',
    isRequired: false,
    defValue: ''
  };

  aFields[idx++] = {
    label: getLabel('FootNote'),
    element: 'fldFootNote',
    field: 'footnote',
    isRequired: false,
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('PDval'),
    element: 'fldPDval',
    field: 'pdval',
    isRequired: false,
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('SumWheight'),
    element: 'fldSumWheight',
    field: 'sumWheight',
    isRequired: false,
    defValue: ''
  };

  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: false,
    defValue: ''
  };
  return aFields;
}

function saveTrnData() {
  phForm.aData.childs = {};
  phForm.aData.childs.child = {};
  phForm.aData.childs.child.aRows = [];
  for (let i = 0; i < aClassificationData.pointers.length; i++) {
    phForm.aData.childs.child.aRows[i] = {};
    phForm.aData.childs.child.aRows[i].id = aClassificationData.pointers[i].id;
    phForm.aData.childs.child.aRows[i].itemId = aClassificationData.pointers[i].itemId;
    phForm.aData.childs.child.aRows[i].remark = aClassificationData.pointers[i].remark;
    phForm.aData.childs.child.aRows[i].value = aClassificationData.pointers[i].value;
    phForm.aData.childs.child.aRows[i].weight = aClassificationData.pointers[i].weight;
  }
}
