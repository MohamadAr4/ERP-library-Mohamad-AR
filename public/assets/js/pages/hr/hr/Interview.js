/* global PhSettings */
let form;
let aRecruitment = [],
        aStatus = PhSettings.PhsCodes.PhsApproveStatus,
        aResult = PhSettings.UsrCodes.EmpAppresult,
        aGender = PhSettings.PhsCodes.PhsGender,
        aNationality = PhSettings.UsrCodes.EmpNationality,
        aMartial = PhSettings.PhsCodes.PhsMarital,
        aMilitary = PhSettings.PhsCodes.PhsMilitaryStatus;
jQuery(document).ready(function () {
  console.log(name);
  form = new PhsForm();
  form.addBlock("Application", getNewApplicationBlock());
//  form.addChildBlock()("Application1", getNewApplicationBlock());
  form.render();
});
function getNewApplicationBlock() {
  let oBlock = {};
  oBlock.Name = "Application";
  oBlock.Label = getLabel("Application");
  oBlock.DisplayType = PhF_Type_Form;
  oBlock.AttachedBlockName = "EMP_APPLICATION";
  oBlock.URL = {
    "New": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Emp/Application/New"},
    "Update": {"Method": "Put", "URL": PhSettings.apiURL + "/UC/Emp/Application/"},
    "Delete": {"Method": "Delete", "URL": PhSettings.apiURL + "/UC/Emp/Application/"},
    "Get": {"Method": "Get", "URL": PhSettings.apiURL + "/UC/Emp/Application/"},
    "List": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Emp/Application/List"},
    "Search": {"Method": "Post", "URL": PhSettings.apiURL + "/UC/Emp/Application/Search"},
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
  oBlock.CustomAction = {
    "Toolbar1": [
      {
        "Name": "Submit",
        "Component": submitButtom("Application"),
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
    "Field": "recrId",
    "RelField": "recrName",
    "isDB": true,
    "Enabled": true,
    "Required": false,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "",
    "Component": {
      "Type": PhFC_Select,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("Recruitment"),
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Recruitment"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": aRecrList
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-ddate",
    "Field": "ddate",
    "RelField": "",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "DATE",
    "Default": currentDate(),
    "Placeholder": "",
    "Component": {
      "Type": PhFC_DatePicker,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("Date"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_DatePicker,
      "Label": getLabel("Date"),
      "hasSecondField": true,
      "Operations": aDOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-num",
    "Field": "num",
    "RelField": "",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Text,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("Number"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("Number"),
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-name",
    "Field": "name",
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
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("Name"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("Name"),
      "Operations": aTOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-genderId",
    "Field": "genderId",
    "RelField": "genderName",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "1",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Select,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("Gender"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Gender"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": PhSettings.PhsCodes.PhsGender
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-natId",
    "Field": "natId",
    "RelField": "natName",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "0",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Select,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("Nationality"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Nationality"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": PhSettings.UsrCodes.EmpNationality
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-martialId",
    "Field": "martialId",
    "RelField": "martialName",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "1",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Select,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("martial"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Martial"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": PhSettings.PhsCodes.PhsMarital
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-militaryId",
    "Field": "militaryId",
    "RelField": "militaryName",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "1",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Select,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("military"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Military"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": PhSettings.PhsCodes.PhsMilitaryStatus
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-mobile",
    "Field": "mobile",
    "RelField": "",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "VARCHAR2",
    "Default": "",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Text,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("mobile"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("Mobile"),
      "Operations": aTOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-email",
    "Field": "email",
    "RelField": "",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "VARCHAR2",
    "Default": "",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Text,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("email"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("Email"),
      "Operations": aTOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-reqsal",
    "Field": "reqsal",
    "RelField": "",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "0",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Text,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("reqsal"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("reqsal"),
      "Operations": aNOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-rem",
    "Field": "rem",
    "RelField": "",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "VARCHAR2",
    "Default": "",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Text,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("rem"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Text,
      "Label": getLabel("Rem"),
      "Operations": aTOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-statusId",
    "Field": "statusId",
    "RelField": "statusName",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "0",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Select,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("status"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Order Status"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": PhSettings.PhsCodes.PhsApproveStatus
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-resultId",
    "Field": "resultId",
    "RelField": "resultName",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "0",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Select,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("result"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Result"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": PhSettings.UsrCodes.EmpAppresult
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-languageId",
    "Field": "languageId",
    "RelField": "languageName",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "0",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Select,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("language"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Language Mark"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": PhSettings.UsrCodes.EmpTestmarks
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-computerId",
    "Field": "computerId",
    "RelField": "computerName",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "0",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Select,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("computer"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Computer Mark"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": PhSettings.UsrCodes.EmpTestmarks
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-technicalId",
    "Field": "technicalId",
    "RelField": "technicalName",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "0",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Select,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("technical"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Technical Mark"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": PhSettings.UsrCodes.EmpTestmarks
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  oBlock.Fields[idx++] = {
    "Element": "fld-Application-interviewId",
    "Field": "interviewId",
    "RelField": "interviewName",
    "isDB": true,
    "Enabled": true,
    "Required": true,
    "Visible": true,
    "DataType": "NUMBER",
    "Default": "0",
    "Placeholder": "",
    "Component": {
      "Type": PhFC_Select,
      "isSysFld": false,
      "Width": 4,
      "ElementWidth": 12,
      "LabelWidth": 12,
      "Label": getLabel("interview"),
      "Classes": "",
      "Attributes": "",
      "Mask": {
        "Class": "",
        "Min": "",
        "Max": "",
        "Decimals": 2,
        "ThousandSeperator": ",",
        "Pattern": ""
      },
      "Formula": {
        "Status": false,
        "Function": ""
      },
      "Autocomplete": {
        "RelElement": ""
      },
      "Ajax": {
        "Status": false,
        "Type": "POST",
        "async": false,
        "URL": "",
        "Data": {

        }
      },
      "Options": {
        "Multiple": false,
        "Data": []
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    },
    "Filter": {
      "Status": true,
      "Type": PhFC_Select,
      "Required": false,
      "Label": getLabel("Interview Mark"),
      "hasSecondField": false,
      "Operations": aSAOpers,
      "Operation": "=",
      "Default1": "",
      "Default2": "",
      "Options": {
        "Multiple": false,
        "Data": PhSettings.UsrCodes.EmpTestmarks
      },
      "Autocomplete": {
        "URL": "",
        "RelElement": "",
        "Params": "",
        "Callback": ""
      },
      "Actions": {
        "onFocus": "",
        "onBlur": "",
        "onChange": "",
        "onClick": "",
        "onDblClick": ""
      }
    }
  };
  return oBlock;
}
