import { Children, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant={"danger"}
        className={`m-2 ${
          props.isSearchClicked || props.isGetDone ? "d-none" : ""
        }`}
        onClick={handleShow}
      >
        <i class="bi bi-filter"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            {props.vaFields.map((field, index) =>
              field.type !== "hidden" ? (
                <div key={index} className="row">
                  <input
                    id={"ch-" + index}
                    className="form-check col-1 p-1"
                    type="checkbox"
                    checked={field.isShown}
                    onChange={() => {
                      if (!field.isRequired) {
                        props.toggleFieldVisibility(field.element);
                      }
                    }}
                    disabled={field.isRequired}
                  />
                  <label for={"ch-" + index} className="form-label col-11 px-1">
                    {field.label}
                  </label>
                </div>
              ) : null
            )}
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

export default Example;
