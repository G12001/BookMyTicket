import React from "react";

import AuthForm from "./AuthForm";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { adminActions } from "../../store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { errorActions } from "../../store";
import { useEffect } from "react";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, message } = useSelector((state) => state.error);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(errorActions.reset());
  }, [isError, message, dispatch]);

  const onResReceived = (data) => {
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };
  const getData = async (data) => {
    try {
      await sendAdminAuthRequest(data.inputs).then(onResReceived);
    } catch (error) {
      dispatch(errorActions.setMessage(error.message));
    }
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
