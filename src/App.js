// App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import SignupForm from './component/signupform';
import SigninForm from './component/signin';
import Home from "./Home";
import Mainapge from "./component/mainpage";
import ForgotPassword from "./component/forgetpassword";
import AccountDetails from "./component/accountdetails";
import NewPasswordForm from "./component/newpassword";
import FileUpload from "./component/imageup";
import EmailVerification from './component/emailverifiction';
import Imageupload from "./component/imageup";
import PY from "./component/python";
import LandingPage from "./component/landingpage";
import About from "./component/about"

  function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />}/>
        <Route path="/signin" element={<SigninForm />}/>
        <Route path="/signup" element={<SignupForm />}/>
        <Route path="/main" element={<Mainapge />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/accountdetails" element={<AccountDetails />} />
        <Route path="/verify/:uuid" element={<EmailVerification />} />
        <Route path="/newpassword" element={<NewPasswordForm />}/>
        <Route path="/acountdetails" element={<AccountDetails />}/>
        <Route path="/imageup" element={<Imageupload />}/>
        <Route path="/py" element={<PY />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

