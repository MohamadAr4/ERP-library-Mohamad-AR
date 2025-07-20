function userNameField(){
  return(
    <div class="row py-1">
                      <div class="col-12 col-sm-10 mx-auto">
                        {/* <!--<label for="username">Username</label>--> */}
                        <input type="hidden" id="copy" value="Demo" required=""/>
                        <input type="text" class="form-control form-control-sm" id="username" placeholder="اسم المستخدم" required=""/>
                        <div class="invalid-feedback">
                          Please enter a username.
                        </div>
                      </div>
                    </div>
  );
}
export default userNameField