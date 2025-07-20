/* global swal */

jQuery(document).ready(function () {

  let oBlocks = {
    "MainBlock": {
      "Name": "Borrowers",
      "URL": {
        "New": {"Method": "Post", "URL": ""},
        "Update": {"Method": "Put", "URL": ""},
        "Delete": {"Method": "Delete", "URL": ""},
        "Get": {"Method": "Get", "URL": ""},
        "List": {"Method": "Post", "URL": ""},
        "Search": {"Method": "Post", "URL": ""}
      },
      "Fields": [
        {
          "Field": "id",
          "Default": "",
          "Required": true
        }, {
          "Field": "num",
          "Default": "1",
          "Required": true
        }, {
          "Field": "name",
          "Default": "",
          "Required": true
        }, {
          "Field": "statusId",
          "Default": "0",
          "Required": true
        }, {
          "Field": "address",
          "Default": "",
          "Required": true
        }, {
          "Field": "rem",
          "Default": "1",
          "Required": true
        }
      ]
    },
    "Childs": [
      {
        "Name": "Contacts",
        "URL": {
          "New": {"Method": "", "URL": ""},
          "Update": {"Method": "", "URL": ""},
          "Delete": {"Method": "", "URL": ""},
          "Get": {"Method": "", "URL": ""},
          "List": {"Method": "", "URL": ""},
          "Search": {"Method": "", "URL": ""}
        },
        "RelationType": 0, /* 0 One2Many, 1 One2One */
        "ParentId": "borrowerId",
        "Fields": [
          {
            "Field": "id",
            "Default": "",
            "Required": true
          }, {
            "Field": "borrowerId",
            "Default": "",
            "Required": true
          }, {
            "Field": "positionId",
            "Default": "0",
            "Required": true
          }
        ]
      },
      {
        "Name": "Partners",
        "URL": {
          "New": {"Method": "", "URL": ""},
          "Update": {"Method": "", "URL": ""},
          "Delete": {"Method": "", "URL": ""},
          "Get": {"Method": "", "URL": ""},
          "List": {"Method": "", "URL": ""},
          "Search": {"Method": "", "URL": ""}
        },
        "RelationType": 0, /* 0 One2Many, 1 One2One */
        "ParentId": "borrowerId",
        "Fields": [
          {
            "Field": "id",
            "Default": "",
            "Required": true
          }, {
            "Field": "num",
            "Default": "1",
            "Required": true
          }, {
            "Field": "name",
            "Default": "",
            "Required": true
          }, {
            "Field": "statusId",
            "Default": "0",
            "Required": true
          }, {
            "Field": "address",
            "Default": "",
            "Required": true
          }, {
            "Field": "rem",
            "Default": "1",
            "Required": true
          }
        ]
      }
    ]
  };

  //initForm(oBlocks);

});
