import React, { useState } from 'react'
import { toast } from 'react-toastify';
import ROUTES from '../../Configs/Routes';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const Signup = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const validationSchema = Yup.object({
    fName: Yup.string().required("First Name is required.").min(1, 'Minimum 1 charecter is required'),
    lName: Yup.string().required("Last Name is required.").min(1, 'Minimum 1 charecter is required'),
    email: Yup.string()
      .email("Please enter valid email address!")
      .required("Email is required."),
    address: Yup.string().required("Address is required."),
    country: Yup.string().required("Country is required."),
    gender: Yup.string().required("Gender is required."),
    phoneNumber: Yup.string()
      .required("Phone Number is required.")
      .matches(/^\d{10}$/, "Must be exactly 10 digits"),
    password: Yup.string()
      .min(8, "Password must be more than 8 characters")
      .required("Password is required."),
    confirmPwd: Yup.string()
      .required("Confirm Password is required.")
      .oneOf([Yup.ref("password"), null], "Confirm Password should be same as Password"),
  });

  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      address: "",
      country: "",
      gender: "",
      phoneNumber: "",
      password: "",
      confirmPwd: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission
      try {
        console.log(values);
        // localStorage.setItem('token', 'apiToken');
        localStorage.setItem('userData', JSON.stringify(values));
        navigate(ROUTES.LOGIN);
      } catch (error) {
        console.error("res====>", error);
      }
    },
  });

  return (
    <>
      <div className='authFormDiv'>
        <h2>Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-group mb-3'>
            <label>First Name</label>
            <input
              type='text'
              className='form-control'
              name='fName'
              value={formik.values.fName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fName && formik.errors.fName ? (
              <div className='error'>{formik.errors.fName}</div>
            ) : null}
          </div>
          <div className='form-group mb-3'>
            <label>Last Name</label>
            <input
              type='text'
              className='form-control'
              name='lName'
              value={formik.values.lName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lName && formik.errors.lName ? (
              <div className='error'>{formik.errors.lName}</div>
            ) : null}
          </div>
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
            <label>Address</label>
            <textarea
              rows={3}
              className='form-control'
              name='address'
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className='error'>{formik.errors.address}</div>
            ) : null}
          </div>
          <div className='form-group mb-3'>
            <label>Country</label>
            <select
              className='form-select'
              name='country'
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Country</option>
              <option value="IND">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
            {formik.touched.country && formik.errors.country ? (
              <div className='error'>{formik.errors.country}</div>
            ) : null}
          </div>
          <div className='form-group mb-3'>
            <label>Gender</label>
            <div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='gender'
                  id='male'
                  value='Male'
                  checked={formik.values.gender === 'Male'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className='form-check-label' htmlFor='male'>
                  Male
                </label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='gender'
                  id='female'
                  value='Female'
                  checked={formik.values.gender === 'Female'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className='form-check-label' htmlFor='female'>
                  Female
                </label>
              </div>
            </div>
            {formik.touched.gender && formik.errors.gender ? (
              <div className='error'>{formik.errors.gender}</div>
            ) : null}
          </div>
          <div className='form-group mb-3'>
            <label>Phone Number</label>
            <input
              type='number'
              className='form-control'
              name='phoneNumber'
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className='error'>{formik.errors.phoneNumber}</div>
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
          <div className='form-group mb-3'>
            <label>Confirm Password</label>
            <div class="input-group mb-3">
              <input
                type={showPwd2 ? 'text' : 'password'}
                className='form-control'
                name='confirmPwd'
                value={formik.values.confirmPwd}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span class="input-group-text" id="basic-addon2" onClick={() => setShowPwd2(!showPwd2)}>{showPwd2 ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
            {formik.touched.confirmPwd && formik.errors.confirmPwd ? (
              <div className='error'>{formik.errors.confirmPwd}</div>
            ) : null}
          </div>

          <Button type='submit' className='authBtn'>
            Sign Up
          </Button>

          <div className='text-center mt-3'>
            Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup