var phForm;
jQuery(document).ready(function () {
  var options = { type: PhF_Type_Tree };
  var idx = 0;
  var metta = {};
  var aURL = {};
  var QFields = [];
  var aFields = [];

  aURL.Url = 'http://Eng-Radwan:9090/ERP/api';
  aURL.Api = '/Acc/CostCenters';
  aURL.New = { Method: 'POST', URL: '/New' };
  aURL.Update = { Method: 'PUT', URL: '/' };
  aURL.Delete = { Method: 'DELETE', URL: '/' };
  aURL.Get = { Method: 'GET', URL: '/' };
  aURL.Tree = { Method: 'GET', URL: '/tree/0' };

  idx = 0;
  aFields[idx++] = {
    field: 'fldId',
    dbName: 'id',
    isRequired: false,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Num'),
    field: 'fldNum',
    dbName: 'num',
    isRequired: true,
    defValue: '0'
  };
  aFields[idx++] = {
    label: getLabel('Name'),
    field: 'fldName',
    dbName: 'name',
    isRequired: true,
    defValue: ''
  };
  aFields[idx++] = {
    label: getLabel('Status'),
    field: 'fldStatusId',
    dbName: 'statusId',
    isRequired: true,
    defValue: '1',
    options: []
  };
  aFields[idx++] = {
    label: getLabel('Type'),
    field: 'fldTypeId',
    dbName: 'typeId',
    isRequired: true,
    defValue: '1',
  };
  aFields[idx++] = {
    label: getLabel('Rem'),
    field: 'fldRem',
    dbName: 'rem',
    isRequired: true,
    defValue: ''
  };
  metta = { aURL: aURL, aFields: aFields, QFields: QFields };
  phForm = new PhForm('fixItem', metta, options); 
});