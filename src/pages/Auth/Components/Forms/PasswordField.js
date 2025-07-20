import LoginForm from "./LoginForm";
function passwordField(){
  return(
    <div class="row py-1">
        <div class="col-12 col-sm-10 mx-auto">
            <LoginForm type={'password'} classs={"form-control form-control-sm"} id={"password"} placeholder={"كلمة السر"} required={""}></LoginForm>
            <div class="invalid-feedback">
              Please enter a password
            </div>
        </div>
    </div>
  );
}
export default passwordField