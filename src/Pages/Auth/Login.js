import React, { useState } from 'react'
import { toast } from 'react-toastify';
import ROUTES from '../../Configs/Routes';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { saveUserData } from '../../Configs/redux/action';

const Login = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter valid email address!")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Password must be more than 8 characters")
      .required("Password is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission
      try {
        if (values?.email !== userData?.email) {
          console.log("User not found!")
          toast.error("User not found!")
          // return false;
        } else if (values?.password !== userData?.password) {
          console.log("Incorrect password!")
          toast.error("Incorrect password!")
          // return false;
        } else {
          console.log(values);
          dispatch(saveUserData(values));
          localStorage.setItem('token', 'apiToken');
          navigate(ROUTES.DASHBOARD);
        }
      } catch (error) {
        console.error("res====>", error);
      }
    },
  });

  return (
    <>
      <div className='authFormDiv'>
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-group mb-3'>
            <label>Email</label>
            <input
              type='email'
              className='form-control'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='error'>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className='form-group mb-3'>
            <label>Password</label>
            <div class="input-group mb-3">
              <input
                type={showPwd ? 'text' : 'password'}
                className='form-control'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span class="input-group-text" id="basic-addon2" onClick={() => setShowPwd(!showPwd)}>{showPwd ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className='error'>{formik.errors.password}</div>
            ) : null}
          </div>

          <Button type='submit' className='authBtn'>
            Login
          </Button>

          <div className='text-center mt-3'>
            Don't have an Account? <Link to={ROUTES.SIGNUP}>Signup</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login