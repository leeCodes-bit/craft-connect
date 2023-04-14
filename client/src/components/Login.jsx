import { useState } from "react";
import {useFormik} from "formik";
import '../app.css'
import NavBar2 from "./NavBar2";
import axios from "axios";
import { useNavigate } from "react-router-dom" 

const url = process.env.REACT_APP_BASE_URL

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const { errors, touched } =
    useFormik({
      
    });

  console.log(errors);
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios.options(`${url}/artisans/login`,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': ' POST',
      },
      email,
      password
    }, {withCredentials: true})
    if(response.data){
      navigate("/");
    }
  }

  return (
    <div className="container-fluid">
      <NavBar2 />
    <div className="flex justify-center items-center  min-h-screen bg">
      <form
        onSubmit={handleSubmit}
        className="bg-[#fff] p-10 shadow shadow-[#040c16] w-96 md:w-2/6"
      >
        <div className="pb-10">
          <p className="text-3xl font-bold text-[#FCD12A]">Welcome!</p>
          <p>Enter login details </p>
        </div>
        <div className="pb-4">
          <label htmlFor="email"></label>
          <input
            value={email}
            onChange={handleEmailChange}
            name = "email"
            type="email"
            id="email"
            placeholder="Email"
            className={
              errors.email && touched.email
                ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
            }
          />
        </div>

        <div className="pb-4">
          <label htmlFor="password"></label>
          <input
            value={password}
            onChange={handlePasswordChange}
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            className={
              errors.password && touched.password
                ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
            }
          />
        </div>
        <div className="pb-4 text-[#39CDCC]">
          <p>
            <a href="/register">forget password?</a>
          </p>
        </div>
          <button
            type="submit"
            className="w-full bg-[#FCD12A] text-[#fff] p-4 rounded"
          >
            Login
          </button>
      </form>
    </div>
    </div>
  );
};
export default Login;
