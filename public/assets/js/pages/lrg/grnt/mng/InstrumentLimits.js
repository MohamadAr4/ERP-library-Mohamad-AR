let phForm;
let aInstrument=[];
jQuery(document).ready(function () {
  getInstrument();
  let options = {cols: 2, mode: PhF_Mode_Enter, type: PhF_Type_Form};
  let metta = {};
  let aURL = {};
  aURL.Url = PhSettings.apiURL;
  aURL.Api = '/UC/Lrg/InstrumentIssueLimits';
  aURL.New = {Method: 'POST', URL: '/New'};
  aURL.Update = {Method: 'PUT', URL: '/'};
  aURL.List = {Method: 'GET', URL: '/List'};
  aURL.Search = {Method: 'POST', URL: '/Search'};
  aURL.Delete = {Method: 'DELETE', URL: '/'};
  aURL.Get = {Method: 'GET', URL: '/'};
  metta = {aURL: aURL, aFields: getFields(), aQFields: getQFields(), phTable: ''};
  phForm = new PhForm('InstrumentLimits', metta, options);
  
});

function getQFields() {
  let aQFields = [];
  let idx = 0;
  aQFields[idx++] = {
    label: getLabel('IssueId'),
    element: 'fldIssueId',
    field: 'issueId',
    component: PhFC_Select,
    defValue: '',
    options: aInstrument,
    aOpers: aSAOpers
  };
  aQFields[idx++] = {
    label: getLabel('Start.From'),
    element: 'NStart',
    field: 'nstart',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
  };
  aQFields[idx++] = {
    label: getLabel('End.To'),
    element: 'NEnd',
    field: 'nend',
    component: PhFC_Text,
    defValue: '',
    aOpers: aNOpers
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
    label: getLabel('IssueId'),
    element: 'fldIssueId',
    field: 'issueId',
    rField:"issueName",
    isRequired: true,
    defValue: '',
    options:aInstrument,
    tableWidth: 40
  };
  
  aFields[idx++] = {
    label: getLabel('Start'),
    element: 'fldNStart',
    field: 'nstart',
    isRequired: false,
    defValue: '',
    tableWidth: 8
  };
  aFields[idx++] = {
    label: getLabel('n.End'),
    element: 'fldNEnd',
    field: 'nend',
    isRequired: false,
    defValue: '',
    tableWidth: 8
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    element: 'fldRem',
    field: 'rem',
    isRequired: true,
    defValue: '',
    tableWidth: 40
  };
  return aFields;
}

function getInstrument(){
   $.ajax({
    type: 'POST',
    async: false,
    url: PhSettings.apiURL + '/UC/Lrg/CodeInstrumentIssue/List',
    headers: PhSettings.Headers,
    success: function (response) {
      if (response.status) {
        for (let i = 0; i < response.data.List.length; i++) {
          aInstrument[i] = {};
          aInstrument[i].id = response.data.List[i].id;
          aInstrument[i].name = response.data.List[i].name;
        }
        renderRequest();
      }
    }
  });
}

function renderRequest() {
  let vHtml = '';
  for (let i = 0; i < aInstrument.length; i++) {
    vHtml += '<option value="' + aInstrument[i].id + '">' + aInstrument[i].name+ '</option>';
  }
  $('#fldIssueId').html(vHtml);
}
