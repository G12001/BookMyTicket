import React, { useEffect } from "react";
import AuthForm from "./AuthForm";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch, useSelector } from "react-redux";
import { errorActions, userActions } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = () => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError === true) {
      toast.error(message);

      dispatch(errorActions.reset());
    }
  }, [isError, message, dispatch]);

  const onResReceived = (data) => {
    dispatch(userActions.login());
    localStorage.setItem("userId", data.id);
    navigate("/");
  };
  const getData = (data) => {
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((error) => dispatch(errorActions.setMessage(error.message)));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
