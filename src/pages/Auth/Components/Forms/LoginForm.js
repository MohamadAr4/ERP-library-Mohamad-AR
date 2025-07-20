import { Row } from "react-bootstrap";

function loginForm({ type, classs, id, placeholder, required }) {
  return (
    <>
      <input
        type={type}
        class={classs}
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </>
  );
}
export default loginForm;
