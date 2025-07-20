import axios from "axios";
import { Children, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

function AttachModal(props) {
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState("");
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileId, setFileId] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  function handleUpload() {
    const headers = {
      periodId: 2022,
      Authorization: `Bearer ${PhToken}`,
      "Content-Type": "application/json",
    };
    if (!file) {
      console.log("No file selected");
      return;
    }
    const reader = new FileReader(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      console.log(base64String);
      axios
        .post(
          "http://localhost:9090/phs/api/CC/attached/new",
          {
            file: base64String,
            rid: props.insertedId,
            newName: newName,
            oldName: file.name,
            MPrg: { id: parseFloat(props.aFields.id) },
          },
          {
            headers: headers,
          },
          {
            onUploadProgress: (progressEvent) => {
              setProgress((prevState) => {
                return { ...prevState, pc: progressEvent.progress * 100 };
              });
            },
          }
        )
        .then((res) => {
          console.log(res);
          setFileId(res.data.data.InsertedId);
          handleGetFile();
        });
    };
    reader.readAsDataURL(file);
  }
  function handleDownLoad(fileId) {
    console.log(fileId);
    const headers = {
      periodId: 2022,
      Authorization: `Bearer ${PhToken}`,
      "Content-Type": "application/json",
    };
    axios
      .get(`http://localhost:9090/phs/api/CC/attached/${fileId}`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data);
        
        downloadFile(
          res.data.data.vFile,
          res.data.data.ext,
          res.data.data.name
        );
      });
  }

  function handleGetFile() {
    const headers = {
      periodId: 2022,
      Authorization: `Bearer ${PhToken}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        `http://localhost:9090/phs/api/UC/Cpy/AttachedFiles/Search/0/0`,
        [
          {
            fieldName: "rid",
            dataType: 2,
            operation: "=",
            value1: parseFloat(props.insertedId),
            value2: "",
          },
          {
            fieldName: "MPrgId",
            dataType: 2,
            operation: "=",
            value1: parseFloat(props.aFields.id),
            value2: "",
          },
        ],
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        setFiles(res.data.data.List);
      });
  }

  function downloadFile(base64Data, contentType, fileName) {
    let vFile;
    let downloadLink;
    vFile = new Blob(["\uFEFF" + base64Data], { type: contentType });
    downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.href = base64Data;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }



  function handleDeleteFile(fileId) {
    const headers = {
      periodId: 2022,
      Authorization: `Bearer ${PhToken}`,
      "Content-Type": "application/json",
    };
    axios
      .delete(
        `http://localhost:9090/phs/api/CC/attached/${fileId}`,
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res.data);
        handleGetFile();
      });
  }
  return (
    <>
      <Button
        id="ph-attache"
        className={`btn btn-success mx-1 ${
          props.isAddDone || props.isGetDone ? "" : "d-none"
        }`}
        title="إرفاق ملف"
        data-bs-title="إرفاق ملف"
        data-bs-toggle="popover"
        data-bs-placement="bottom"
        data-bs-trigger="hover focus"
        onClick={() => {
          handleShow(); handleGetFile();
        }}
      >
        <i class="bi bi-folder2-open"></i>
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Attach file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="modal-body">
            <form id="StoreAttacheForm">
              <div class="row d-flex align-items-center">
                <div class="col-sm-4">
                  <input
                    id="fldStoreFile"
                    class="form-control form-control-sm"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    // style={{ display: "none" }}
                  />
                  <input
                    id="filenameDisplay"
                    class="form-control form-control-sm"
                    type="hidden"
                    value={file}
                    disabled={true}
                  />
                  <input id="fldStoreAttacheFile" type="hidden" />
                  <input id="fldStoreONameFile" type="hidden" value="" />
                </div>
                <label
                  for="fldStoreNNameFile"
                  class="col-sm-1 form-label ph-label text-start text-sm-end"
                  data-label="Name"
                >
                  الاسم
                </label>
                <div class="col-sm-6">
                  <input
                    id="fldStoreNNameFile"
                    class="form-control form-control-sm"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div class="col-sm-1">
                  <button
                    id="fldStoreUploadFile"
                    class="btn btn-success toolbar-btn mx-1"
                    type="button"
                    data-bs-title="Upload"
                    title="تحميل"
                    onClick={()=>handleUpload()}
                  >
                    <i class="bi bi-upload"></i>
                  </button>
                </div>
              </div>
            </form>
            {progress.started && (
              <progress max={100} value={progress.pc}></progress>
            )}
            {msg && <span>{msg}</span>}
            <div id="StoreAttacheTable" class="row d-flex align-items-center">
              <table class="table table-bordered table-striped table-details mt-2">
                <thead>
                  <tr>
                    <td style={{ width: "5%" }}></td>{" "}
                    <td style={{ width: "5%" }}>#</td>
                    <td style={{ width: "5%" }}></td> <td>الاسم الأساسي</td>
                    <td>الاسم</td>
                  </tr>
                </thead>
                {files &&
                  files.map((file, fileIndex) => {
                    return (
                      <tbody>
                        <tr>
                          <td>
                            <a
                              class="nav-link"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="bi bi-three-dots-vertical nav-item"></i>
                            </a>
                            <ul class="dropdown-menu">
                              <li id="fileAttach0">
                                <a
                                  class="dropdown-item download-item"
                                  href="javascript:;"
                                  data-index="0"
                                  onClick={()=>handleDownLoad(file.id)}
                                >
                                  تنزيل
                                </a>
                              </li>
                              <li>
                                <a
                                  class="dropdown-item delete-item"
                                  href="javascript:;"
                                  data-index="0"
                                  onClick={()=> handleDeleteFile(file.id)}
                                >
                                  حذف
                                </a>
                              </li>
                            </ul>
                          </td>
                          <td>{fileIndex + 1}</td>
                          <td>
                            <i class="bi bi-filetype-pdf fs-5"></i>
                          </td>
                          <td>{file.oname}</td>
                          <td>{file.name + "." + file.ext}</td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AttachModal;
