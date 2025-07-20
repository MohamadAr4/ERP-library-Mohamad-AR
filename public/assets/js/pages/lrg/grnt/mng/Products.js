let form;
let aCurrency = [];
let aLoanExcemption = PhSettings.UsrCodes.LrgLoanExcemption;
let aProductKind = PhSettings.UsrCodes.LrgProductKind,
        aSize = PhSettings.UsrCodes.LrgCodeProjectSize,
        aSector = PhSettings.UsrCodes.LrgSector,
        aProjectType = PhSettings.UsrCodes.LrgProjectType,
        aAge = PhSettings.UsrCodes.LrgCodeAge,
        aYesNo = PhSettings.PhsCodes.PhsYesno,
        aLicense = PhSettings.UsrCodes.LrgLicense,
        aLoanType = PhSettings.UsrCodes.LrgLoanType,
        aNationality = PhSettings.UsrCodes.LrgNationality,
        aRiskMitigators = PhSettings.UsrCodes.LrgCodeRiskMitigators,
        aPeriodicInstallment = PhSettings.UsrCodes.LrgPeriodicInstallment,
        aProductPurpose = PhSettings.UsrCodes.LrgLoanPurpose;
jQuery(document).ready(function () {
  form = new PhsForm();
  initalFunctions();
  form.addBlock("Products", getNewProductsBlock());
  form.addChildBlock("Products", "Sizes", getNewProductsSizeBlock());
  form.addChildBlock("Products", "Sectors", getNewProductsSectorsBlock());
  form.addChildBlock("Products", "Type", getNewProductsTypeBlock());
  form.addChildBlock("Products", "Age", getNewProductsAgeBlock());
  form.addChildBlock("Products", "License", getNewProductsLicenseBlock());
  form.addChildBlock("Products", "LoanType", getNewProductsLoanTypeBlock());
  form.addChildBlock("Products", "LoanPeriodInstall", getNewProductsLoanPeriodInstallBlock());
  form.addChildBlock("Products", "LoanCurrency", getNewProductsLoanCurrencyBlock());
  form.addChildBlock("Products", "Nationalities", getNewProductsNationalitiesBlock());
  form.addChildBlock("Products", "RiskMitigators", getNewProductsRiskMitigatorsBlock());
  form.addChildBlock("Products", "Sponsors", getNewProductsSponsorsBlock());
  form.addChildBlock("Products", "Purpose", getNewProductsPurposeBlock());
  form.addChildBlock("Products", "Accounts", getNewProductsAccountsBlock());
  form.render();
  $('#fld-Products-exemptionId').change(function () {
    ifHasExemptionMonths();
  });
  $('#fld-Products-guaranteePeriod').change(function () {
    checkForGuaranteePeriod();
  });
  $('#fld-Products-loanAgeMax,#fld-Products-loanAgeMin').change(function () {
    checkForLoanAge();
  });
  $('#fld-Products-brwrSage,#fld-Products-brwrEage').change(function () {
    checkForBorrowerLoanAge();
  });
  $('#fld-Products-percStatusId').change(function () {
    ifHasPerc();
  });
  ifHasExemptionMonths();
  showHeaderSpinner(false);
});

function initalFunctions() {
  removeDash();
  changeCurrencyName();
}

function removeDash() {
  aProductKind = aProductKind.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aSize = aSize.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aSector = aSector.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aProjectType = aProjectType.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aAge = aAge.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aLicense = aLicense.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aLoanType = aLoanType.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aNationality = aNationality.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aRiskMitigators = aRiskMitigators.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aPeriodicInstallment = aPeriodicInstallment.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
  aProductPurpose = aProductPurpose.filter(function (el) {
    return parseInt(el.id) !== 0;
  });
}

function ifHasExemptionMonths() {
  if (parseInt($('#fld-Products-exemptionId').val()) === 1) {
    $('#fld-Products-excemptMonths').attr('disabled', false);
  } else {
    $('#fld-Products-excemptMonths').attr('disabled', true);
    $('#fld-Products-excemptMonths').val(0);
  }
}

function ifHasPerc() {
  if (parseInt($('#fld-Products-percStatusId').val()) === 1) {
    $('#fld-Products-equityRatio').attr('disabled', false);
    $('#fld-Products-debitEquity').attr('disabled', false);
    $('#fld-Products-equityRatio').attr('required', true);
    $('#fld-Products-debitEquity').attr('required', true);
  } else {
    $('#fld-Products-equityRatio').attr('disabled', true);
    $('#fld-Products-debitEquity').attr('disabled', true);
    $('#fld-Products-equityRatio').attr('required', false);
    $('#fld-Products-debitEquity').attr('required', false);
    $('#fld-Products-equityRatio').removeClass('invalid');
    $('#fld-Products-debitEquity').removeClass('invalid');
  }
}

function checkForGuaranteePeriod() {
  let isOK = true;
  $('#fld-Products-guaranteePeriod').removeClass('invalid');
  if (parseFloat($('#fld-Products-guaranteePeriod').val()) > parseFloat($('#fld-Products-loanAgeMax').val())) {
    $('#fld-Products-guaranteePeriod').addClass('invalid');
    isOK = false;
  }
  return isOK;
}

function checkForLoanAge() {
  let isOK = true;
  $('#fld-Products-loanAgeMin').removeClass('invalid');
  $('#fld-Products-loanAgeMax').removeClass('invalid');
  if (parseFloat($('#fld-Products-loanAgeMin').val()) > parseFloat($('#fld-Products-loanAgeMax').val())) {
    $('#fld-Products-loanAgeMin').addClass('invalid');
    $('#fld-Products-loanAgeMax').addClass('invalid');
    isOK = false;
  }
  return isOK;
}

function checkForBorrowerLoanAge() {
  let isOK = true;
  $('#fld-Products-brwrSage').removeClass('invalid');
  $('#fld-Products-brwrEage').removeClass('invalid');
  if (parseFloat($('#fld-Products-brwrSage').val()) > parseFloat($('#fld-Products-brwrEage').val())) {
    $('#fld-Products-brwrSage').addClass('invalid');
    $('#fld-Products-brwrEage').addClass('invalid');
    isOK = false;
  }
  return isOK;
}

function disabledProductKind() {
  if (parseInt($('#fld-Products-id').val()) > 0) {
    $('#fld-Products-kindId').attr('disabled', true);
  } else {
    $('#fld-Products-kindId').attr('disabled', false);
  }
}

function showSponserBlock() {
  if (parseInt($('#fld-Products-kindId').val()) === 1) {
    $('#Sponsors-block').removeClass('d-none');
  } else {
    $('#Sponsors-block').addClass('d-none');
  }
}

function changeCurrencyName() {
  for (let i = 0; i < PhSettings.UsrCodes.MngCurrency.length; i++) {
    if (parseInt(PhSettings.UsrCodes.MngCurrency[i].id) === 1) {
      aCurrency[i] = {};
      aCurrency[i].id = PhSettings.UsrCodes.MngCurrency[i].id;
      aCurrency[i].name = PhSettings.UsrCodes.MngCurrency[i].code;
    }
  }
}

function acParams() {
  return {systemId: SystemLRG};
}

function afterGet() {
  ifHasExemptionMonths();
  ifHasPerc();
  disabledProductKind();
  showSponserBlock();
}

function beforeProductSave() {
  let isOK = true;
  if (!checkForGuaranteePeriod()) {
    showToast(getLabel('Failed.To.Add') + ' - ' + getLabel(form.oBlocks.Products.Label), 'DANGER', prepareErrorMessage('Guarantee Period Grater Than Guarantee Age'));
    $('#fld-Products-guaranteePeriod').addClass('invalid');
    return checkForGuaranteePeriod();
  }
  if (!checkForLoanAge()) {
    showToast(getLabel('Failed.To.Add') + ' - ' + getLabel(form.oBlocks.Products.Label), 'DANGER', prepareErrorMessage('Check For loan Age'));
    $('#fld-Products-loanAgeMin').addClass('invalid');
    $('#fld-Products-loanAgeMax').addClass('invalid');
    return checkForLoanAge();
  }
  if (!checkForBorrowerLoanAge()) {
    showToast(getLabel('Failed.To.Add') + ' - ' + getLabel(form.oBlocks.Products.Label), 'DANGER', prepareErrorMessage('Check For Borrower Age'));
    $('#fld-Products-brwrSage').addClass('invalid');
    $('#fld-Products-brwrEage').addClass('invalid');
    return checkForBorrowerLoanAge();
  }
  return isOK;
}

function getNewProductsBlock() {
  let oBlock = {};
  oBlock.Name = "Products";
  oBlock.Label = getLabel("Products");
  oBlock.Filter = {
    Cols: 2,
    LabelCols: 3
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.AttachedBlockName = "LRG_PRODUCTS";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/Products/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/Products/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/Products/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/Products/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/Products/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/Products/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": beforeProductSave,
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": afterGet,
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.CustomAction = {
    "Toolbar1": [
      {
        "Name": "",
        "Component": submitButtom(""),
        "Before": "",
        "Action": form.formSave,
        "After": ""
      }
    ]
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 0
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-num",
    "Field": "num",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("Number")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("Number"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-name",
    "Field": "name",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("Name")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("Name"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-pdate",
    "Field": "pdate",
    "RelField": "",
    "Default": currentDate(),
    "Component": {
      "Type": PhFC_DatePicker,
      "Label": getLabel("Product.Date")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_DatePicker,
      "Label": getLabel("Product.Date"),
      "hasSecondField": true,
      "Operations": aDOpers,
      "Operation": ">=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-statusId",
    "Field": "statusId",
    "RelField": "statusName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Status"),
      "TranslateLabel": true
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Status"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": PhSettings.PhsCodes.PhsStatus
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-kindId",
    "Field": "kindId",
    "RelField": "kindName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("kind")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("kind"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aProductKind
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-exemptionId",
    "Field": "exemptionId",
    "RelField": "exemptionName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("exemption")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Label": getLabel("Exemption"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aLoanExcemption
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-loanAgeMin",
    "Field": "loanAgeMin",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("loanAgeMin")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("loanAgeMin"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-loanAgeMax",
    "Field": "loanAgeMax",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("loanAgeMax"),
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("loanAgeMax"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-guaranteePeriod",
    "Field": "guaranteePeriod",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("guaranteePeriod")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("guaranteePeriod"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-excemptMonths",
    "Field": "excemptMonths",
    "RelField": "",
    "Default": "0",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("excemptMonths")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("excemptMonths"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-brwrSage",
    "Field": "brwrSage",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("brwrSage")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("brwrSage"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-brwrEage",
    "Field": "brwrEage",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("brwrEage")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("brwrEage"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-brwrEage",
    "Field": "brwrEage",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("brwrEage")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("brwrEage"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-equityRatio",
    "Field": "equityRatio",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("equityRatio")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("equityRatio"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-debitEquity",
    "Field": "debitEquity",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("debitEquity"),
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("debitEquity"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-experinces",
    "Field": "experinces",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("experinces")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("experinces"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-percStatusId",
    "Field": "percStatusId",
    "RelField": "percStatusName",
    "Default": "1",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("percStatus")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("PercStatus"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aYesNo
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-guaranteeComm",
    "Field": "guaranteeComm",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("guaranteeComm")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("guaranteeComm"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-commLimit",
    "Field": "commLimit",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("commLimit")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("commLimit"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-guaranteeFee",
    "Field": "guaranteeFee",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("guaranteeFee")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("guaranteeFee"),
      "hasSecondField": true,
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-description",
    "Field": "description",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("product.description")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("product.description"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Products-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  }
  ;
  return oBlock;
}

function getNewProductsSizeBlock() {
  let oBlock = {};
  oBlock.Name = "Sizes";
  oBlock.Label = getLabel("Products-Sizes");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PRODUCT_PROJECT_SIZES";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectSizes/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectSizes/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectSizes/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectSizes/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectSizes/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectSizes/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child1'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Sizes-sizeId",
    "Field": "sizeId",
    "RelField": "sizeName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Size")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Size"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aSize
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Sizes-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsSectorsBlock() {
  let oBlock = {};
  oBlock.Name = "Sectors";
  oBlock.Label = getLabel("Products-Sectors");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PRODUCT_SECTORS";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductSectors/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProductSectors/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProductSectors/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProductSectors/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductSectors/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductSectors/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child2'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Sectors-sectorId",
    "Field": "sectorId",
    "RelField": "sectorName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Sector")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Sector"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aSector
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Sectors-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsTypeBlock() {
  let oBlock = {};
  oBlock.Name = "Type";
  oBlock.Label = getLabel("Products.Type");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PRODUCT_PROJECT_TYPE";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectType/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectType/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectType/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectType/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectType/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectType/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child3'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Type-typeId",
    "Field": "typeId",
    "RelField": "typeName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Type")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Type"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aProjectType
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Type-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsAgeBlock() {
  let oBlock = {};
  oBlock.Name = "Age";
  oBlock.Label = getLabel("Products.Age");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PRODUCT_PROJECT_AGE";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectAge/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectAge/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectAge/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectAge/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectAge/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectAge/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child4'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Age-ageId",
    "Field": "ageId",
    "RelField": "ageName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Products.Age")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Products.Age"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aAge
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Age-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsLicenseBlock() {
  let oBlock = {};
  oBlock.Name = "License";
  oBlock.Label = getLabel("Products.License");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PRODUCT_PROJECT_LICENSE";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectLicense/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectLicense/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectLicense/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectLicense/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectLicense/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductProjectLicense/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child5'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-License-licenseId",
    "Field": "licenseId",
    "RelField": "licenseName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Products.License")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Products.License"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aLicense
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-License-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsLoanTypeBlock() {
  let oBlock = {};
  oBlock.Name = "LoanType";
  oBlock.Label = getLabel("Products.LoanType");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PRODUCT_LOAN_TYPE";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductLoanType/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProductLoanType/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProductLoanType/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProductLoanType/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductLoanType/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductLoanType/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child6'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-LoanType-typeId",
    "Field": "typeId",
    "RelField": "typeName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Products.LoanType")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Products.LoanType"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aLoanType
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-LoanType-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsLoanPeriodInstallBlock() {
  let oBlock = {};
  oBlock.Name = "LoanPeriodInstall";
  oBlock.Label = getLabel("Products.LoanPeriodInstall");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PROD_LOAN_PERIOD_INSTALL";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanPeriodInstall/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanPeriodInstall/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanPeriodInstall/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanPeriodInstall/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanPeriodInstall/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanPeriodInstall/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child7'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-LoanPeriodInstall-periodicId",
    "Field": "periodicId",
    "RelField": "periodicName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Products.LoanPeriodInstall")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Products.LoanPeriodInstall"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aPeriodicInstallment
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-LoanPeriodInstall-rem",
    "Field": "rem",
    "RelField": "",
    "isDB": true,
    "Enabled": true,
    "Required": false,
    "Visible": true,
    "DataType": "VARCHAR2",
    "Default": "",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsLoanCurrencyBlock() {
  let oBlock = {};
  oBlock.Name = "LoanCurrency";
  oBlock.Label = getLabel("Products.LoanCurrency");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PROD_LOAN_CURRENCY";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanCurrency/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanCurrency/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanCurrency/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanCurrency/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanCurrency/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdLoanCurrency/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child8'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-LoanCurrency-curnId",
    "Field": "curnId",
    "RelField": "curnName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Currency")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Currency"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aCurrency
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-LoanCurrency-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsNationalitiesBlock() {
  let oBlock = {};
  oBlock.Name = "Nationalities";
  oBlock.Label = getLabel("Products.Nationalities");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PROD_NATIONALITIES";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdNationalities/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProdNationalities/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProdNationalities/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProdNationalities/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdNationalities/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdNationalities/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child9'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Nationalities-natId",
    "Field": "natId",
    "RelField": "natName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Nationalities")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Nationalities"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aNationality
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Nationalities-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsRiskMitigatorsBlock() {
  let oBlock = {};
  oBlock.Name = "RiskMitigators";
  oBlock.Label = getLabel("Products.RiskMitigators");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PROD_RISK_MITIGATORS";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdRiskMitigators/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProdRiskMitigators/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProdRiskMitigators/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProdRiskMitigators/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdRiskMitigators/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdRiskMitigators/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child10'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-RiskMitigators-mitigId",
    "Field": "mitigId",
    "RelField": "mitigName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("RiskMitigators")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("RiskMitigators"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aRiskMitigators
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-RiskMitigators-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsSponsorsBlock() {
  let oBlock = {};
  oBlock.Name = "Sponsors";
  oBlock.Label = getLabel("Products.Sponsors");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PROD_SPONSORS";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdSponsors/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProdSponsors/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProdSponsors/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProdSponsors/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdSponsors/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdSponsors/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child11'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Sponsors-sponsorId",
    "Field": "sponsorId",
    "RelField": "sponsorName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Sponsors")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Sponsors"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aSponser
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Sponsors-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsPurposeBlock() {
  let oBlock = {};
  oBlock.Name = "Purpose";
  oBlock.Label = getLabel("Products.Purpose");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PROD_NATIONALITIES";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductPurpose/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProductPurpose/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProductPurpose/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProductPurpose/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductPurpose/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProductPurpose/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child9'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Purpose-purposeId",
    "Field": "purposeId",
    "RelField": "purposeName",
    "Default": "",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Purpose")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Purpose"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aProductPurpose
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Purpose-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}

function getNewProductsAccountsBlock() {
  let oBlock = {};
  oBlock.Name = "Accounts";
  oBlock.Label = getLabel("Products.Accounts");
  oBlock.Filter = {
    Cols: 1
  };
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.DefaultMode = PhF_Mode_Execute;
  oBlock.AttachedBlockName = "LRG_PROD_ACCOUNTS";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdAccounts/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Lrg/ProdAccounts/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Lrg/ProdAccounts/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Lrg/ProdAccounts/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdAccounts/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Lrg/ProdAccounts/Search"},
    "Attache": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Cpy/AttachedFiles/Search"}
  };
  oBlock.Action = {
    "Delete": true,
    "Add": true,
    "Query": true,
    "Edit": true,
    "Export": true,
    "Import": true,
    "Attache": true,
    "Table-P": true,
    "BeforeNew": "",
    "AfterNew": "",
    "BeforeQuery": "",
    "AfterQuery": "",
    "BeforeSave": "",
    "AfterSave": "",
    "BeforeGet": "",
    "AfterGet": "",
    "BeforeDelete": "",
    "AfterDelete": ""
  };
  oBlock.TablePager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Count": true,
    "Description": true,
    "Size": 10,
    "aSize": [10, 25, 50, 75, 100],
    "Page": 1
  };
  oBlock.Pager = {
    "Visible": true,
    "First": true,
    "Previous": true,
    "Current": true,
    "All": true,
    "Next": true,
    "Last": true,
    "Page": 1,
    "Pages": 10
  };
  oBlock.Relation = {
    hasRelation: true,
    parentSave: false,
    parentBlock: "Products",
    parentKey: 'id',
    key: 'prodId',
    getArray: 'aList',
    saveArray: 'child12'
  };
  let idx = 0;
  oBlock.Fields = [];
  oBlock.Fields[idx++] = {
    "Element": "id",
    "Field": "id",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "prodId",
    "Field": "prodId",
    "Default": "0",
    "Required": true
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Accounts-lenderId",
    "Field": "lenderId",
    "RelField": "lenderName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Select,
      "Label": getLabel("Lender")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Lender"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aLenders
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Accounts-accAllocId",
    "Field": "accAllocId",
    "RelField": "accallocName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Autocomplete,
      "Label": getLabel("Products.AccAlloc")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Autocomplete,
      "Required": false,
      "Label": getLabel("Products.AccAlloc"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Autocomplete": {
        "URL": PhSettings.apiURL + "/UC/Acc/GrantedAccount/Autocomplete",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Accounts-accCommId",
    "Field": "accCommId",
    "RelField": "acccommName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Autocomplete,
      "Label": getLabel("Products.AccComm")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Autocomplete,
      "Required": false,
      "Label": getLabel("Products.AccComm"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Autocomplete": {
        "URL": PhSettings.apiURL + "/UC/Acc/GrantedAccount/Autocomplete",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Accounts-accCompId",
    "Field": "accCompId",
    "RelField": "acccompName",
    "Default": "1",
    "Component": {
      "Type": PhFC_Autocomplete,
      "Label": getLabel("Products.AccComp")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Autocomplete,
      "Required": false,
      "Label": getLabel("Products.AccComp"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Autocomplete": {
        "URL": PhSettings.apiURL + "/UC/Acc/GrantedAccount/Autocomplete",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Accounts-rem",
    "Field": "rem",
    "RelField": "",
    "Default": "",
    "Component": {
      "Type": PhFC_Text,
      "Label": getLabel("rem")
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("rem"),
      "Operations": aTOpers,
      "Operation": "%",
      "Default1": "",
      "Default2": ""
    }
  };
  return oBlock;
}
