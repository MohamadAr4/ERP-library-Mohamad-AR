import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/UserSlice";

const Login = (props) => {

  const [copyname, setCopyName] = useState("demo");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const isAuthenticated = useSelector(state => state.user.user !== null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginEvent = (e) => {
    e.preventDefault();
    let userCredential = {
      copyname,
      username,
      password,
    };

    dispatch(loginUser(userCredential)).then((result) => {
      if (result && result.payload && result.payload.status) {
        setCopyName("demo");
        setUserName("");
        setPassword("");
        navigate("/dashboard");
      } else {
        // Handle the case where the payload or status is not available
        console.error('Login failed:', result);
        // You can set an error message here if needed
      }
    }).catch((error) => {
      // Handle any errors that occur during the dispatch
      console.error('Error during login:', error);
      // You can set an error message here if needed
    });
  };

  return (
    <main>
      <div class="container-fluid">
        <div class="row pt-5">
          <div class="col-9 col-sm-7 mx-auto card-login-custom mb-5 p-5">
            <div class="row">
              <div class="col-8 mx-auto col-sm-5">
                <img
                  src="assets/media/img/Security21.png"
                  alt="Logo"
                  width="100%"
                />
              </div>
              <div class="col-12 col-sm-7">
                <div class="row">
                  <div class="col-12 pt-sm-4 text-center">
                    <h1>مرحبا بك في DEMO</h1>
                    <h6>يرجى إدخال اسم المستخدم وكلمة المرور</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-10 mx-sm-auto">
                    <form
                      id="login-form"
                      class="needs-validation"
                      noValidate=""
                      onSubmit={handleLoginEvent}
                    >
                      <div class="row py-1">
                        <div class="col-12 col-sm-10 mx-auto">
                          <input
                            type="hidden"
                            id="copy"
                            required=""
                            value="{copyname}"
                            onChange={(e) => setCopyName(e.target.value)}
                          />
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            id="username"
                            placeholder="اسم المستخدم"
                            required=""
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                          <div class="invalid-feedback">
                            Please enter a username.
                          </div>
                        </div>
                      </div>
                      <div class="row py-1">
                        <div class="col-12 col-sm-10 mx-auto">
                          <input
                            type="password"
                            class="form-control form-control-sm"
                            id="password"
                            placeholder="كلمة السر"
                            required=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div class="invalid-feedback">
                            Please enter a password
                          </div>
                        </div>
                      </div>
                      <div class="row py-1">
                        <div class="col-12 col-sm-10 mx-auto">
                          {loading ? (
                            <div className="d-flex justify-content-center">
                              <div
                                className="spinner-border text-primary"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          ) : (
                            <button
                              id="ph-login"
                              className="w-100 btn btn-sm btn-primary"
                              type="submit"
                            >
                               تسجيل الدخول
                            </button>
                          )}
                        </div>
                      </div>
                      <div class="row py-1">
                        <div class="col-12 col-sm-10 mx-auto text-center">
                          {error && (
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
