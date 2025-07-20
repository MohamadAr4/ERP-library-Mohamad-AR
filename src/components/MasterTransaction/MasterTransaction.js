import EntryForm from "../../components/EntryForm/EntryForm";
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";

function MasterTransaction(props, ref) {
  useImperativeHandle(ref, () => ({
    setRows: EF.current?.setRows,
  }));
  const meta = props.meta;
  const EF = useRef(null);
  const [vaFields, setvAFields] = useState(meta.Fields);

  const userMenu = useSelector((state) => state.user.userMenu);

  const phsMenu = useSelector((state) => state.user.PhsMenu);

  const toggleFieldVisibility = (fieldd) => {
    setvAFields((prevFields) =>
      prevFields.map((field) => {
        if (field.element === fieldd) {
          return { ...field, isShown: !field.isShown };
        }
        return field;
      })
    );
  };
  return (
    <>
      <main id="main" class="main">
        <Header userMenu={userMenu} phsMenu={phsMenu}></Header>
        <EntryForm
          inputs={props.inputs}
          setInputs={props.setInputs}
          preInsert = {props.preInsert}
          preUpdate = {props.preUpdate}
          afterGet = {props.afterGet}
          ref={EF}
          sectionOptions={props.sectionOptions}
          aFields={meta}
          vaFields={vaFields}
          toggleFieldVisibility={toggleFieldVisibility}
          rate={props.rate}
          setRate={props.setRate}
          resetCorrespondingField={props.resetCorrespondingField}
        ></EntryForm>
      </main>
    </>
  );
}
export default forwardRef(MasterTransaction);
