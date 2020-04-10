import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook.js";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", {
        ...form
      });
      message(data.message);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", {
        ...form
      });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s8 offset-s3">
        <h1>Shorten the link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Autorization</span>

            <div className="input-field">
              <input
                placeholder="Enter the email"
                id="email"
                type="text"
                name="email"
                className="yellow-input"
                value={form.email}
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
              <input
                placeholder="Enter the password"
                id="password"
                type="password"
                name="password"
                value={form.password}
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={loginHandler}
              className="btn yellow darken-4"
              style={{ marginRight: "10px" }}
              disabled={loading}
            >
              Login
            </button>
            <button
              onClick={registerHandler}
              disabled={loading}
              className="btn grey lighten-1 black-text"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
