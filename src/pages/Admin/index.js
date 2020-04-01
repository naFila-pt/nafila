import WelcomePanel from "./WelcomePanel";
import SignUp from "./SignUp";
import Login from "./Login";
import RecoverPassword from "./RecoverPassword";
import RecoverPasswordChange from "./RecoverPassword/RecoverPasswordChange";
import Queue from "./Queue";
import AddConsumer from "./AddConsumer";
import EndQueue from "./EndQueue";

const Admin = {
  WelcomePanel,
  SignUp,
  Login,
  RecoverPassword,
  ChangePassword: RecoverPasswordChange,
  Queue,
  AddConsumer,
  EndQueue
};

export default Admin;
