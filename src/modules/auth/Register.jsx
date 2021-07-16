import React, { useEffect } from 'react'
import { FastField, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import InputField from 'Templates/form/InputField'
import InputPassword from 'Templates/form/InputPassword'
import * as types from './store/action_types'
import { makeGetErrorsSignUp, makeGetIsAuthenticated } from './store/selector'

const initialDataUser = {
  fullName: '',
  username: '',
  password: '',
  passwordConfirm: '',
}

export default function Register() {
  const dispatch = useDispatch()
  const history = useHistory()

  const errors = makeGetErrorsSignUp()
  const isAuth = makeGetIsAuthenticated()

  useEffect(() => {
    if (isAuth) history.push('/')
  }, [isAuth])

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required('Vui lòng điền Họ tên')
      .min(3, 'Họ tên phải có ít nhất 6 ký tự')
      .max(60, 'Họ tên không vượt quá 60 ký tự'),

    username: Yup.string()
      .required('Vui lòng điền Tên đăng nhập')
      .min(3, 'Tên đăng nhập phải có ít nhất 6 ký tự')
      .max(20, 'Tên đăng nhập không vượt quá 20 ký tự'),

    password: Yup.string()
      .required('Vui lòng điền Mật khẩu')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(30, 'Mật khẩu không vượt quá 30 ký tự'),

    passwordConfirm: Yup.string()
      .required('Vui lòng xác nhận lại Mật khẩu')
      .oneOf([Yup.ref('password')], 'Mật khẩu không giống'),
  })

  const signIn = values => dispatch({ type: types.S_AUTH_SIGNUP_REQUEST, payload: values })

  return (
    <div>
      <div className="pt-5 mx-4 md:mx-0">
        <div className="m-auto md:max-w-md">
          <div>
            <div className="text-3xl text-green-500 m-auto text-center" style={{ fontFamily: 'Bangers, cursive' }}>
              Ly kafe
            </div>
            <div className="m-auto text-center text-gray-500 text-sm">Đăng ký tài khoản </div>
            <Formik initialValues={initialDataUser} onSubmit={signIn} validationSchema={validationSchema}>
              <Form>
                <div className="mb-1 flex flex-col">
                  <div className="flex items-center mt-6 border-gray-400 ">
                    <FastField
                      name="fullName"
                      component={InputField}
                      label="Họ và Tên"
                      placeholder="Họ và Tên"
                      helperText="Ít nhất 3 ký tự"
                      errorText={errors.fullName}
                      className="rounded w-full py-1 pr-1 font-roboto outline-none"
                    />
                  </div>
                  <div className="flex items-center mt-8 border-gray-400 ">
                    <FastField
                      name="username"
                      component={InputField}
                      label="Tên đăng nhập"
                      helperText="Viết liền không dấu, không ký tự đặc biệt(nickname)"
                      errorText={errors.username}
                      className="rounded w-full py-1 pr-1 font-roboto outline-none"
                    />
                  </div>
                  <div className="flex items-center mt-8 border-gray-600 ">
                    <FastField
                      name="password"
                      component={InputPassword}
                      label="Mật khẩu"
                      helperText="Ít nhất 6 ký tự"
                      className="flex-grow pr-1 py-1 font-roboto outline-none rounded-l"
                      errorText={errors.password}
                    />

                    <span className="text-gray-600 hover:text-black cursor-pointer mx-2">
                      <i className="fas fa-eye-slash " />
                    </span>
                  </div>
                  <div className="flex items-center mt-8 border-gray-400 ">
                    <FastField
                      name="passwordConfirm"
                      className="rounded flex-grow pr-1 py-1 font-roboto outline-none"
                      component={InputPassword}
                      label="Mật khẩu xác nhận"
                      helperText="Ít nhất 6 ký tự"
                      errorText={errors.passwordConfirm}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <Link
                    to="/login"
                    className="font-bold text-sm text-green-500 hover:text-green-700 underline text-center"
                  >
                    Đăng nhập
                  </Link>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded focus:outline-none text-sm"
                    type="submit"
                  >
                    Đăng ký
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
