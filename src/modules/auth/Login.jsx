import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'

import InputField from 'Templates/form/InputField'
import InputPassword from 'Templates/form/InputPassword'
import { Link, useHistory } from 'react-router-dom'
import * as types from './store/action_types'
import { makeGetErrorsLogin, makeGetIsAuthenticated } from './store/selector'

const initialDataUser = {
  username: '',
  password: '',
}

export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()

  const errors = makeGetErrorsLogin()
  const isAuth = makeGetIsAuthenticated()

  useEffect(() => {
    if (isAuth) history.push('/')
  }, [isAuth])

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Vui lòng điền tên đăng nhập')
      .min(3, 'Tên đăng nhập phải có ít nhất 6 ký tự')
      .max(20, 'Tên đăng nhập không vượt quá 20 ký tự'),

    password: Yup.string()
      .required('Vui lòng điền mật khẩu')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(30, 'Mật khẩu không vượt quá 30 ký tự'),
  })

  const login = values => {
    console.log(values)
    dispatch({ type: types.S_AUTH_LOGIN_REQUEST, payload: values })
  }

  const resetErrorsServer = () => dispatch({ type: types.AUTH_RESET_ERRORS })

  return (
    <div>
      <div className="pt-5 mx-4 md:mx-0">
        <div className="m-auto md:max-w-md">
          <div className="flex flex-col">
            <div className="text-3xl text-green-500 m-auto text-center" style={{ fontFamily: 'Bangers, cursive' }}>
              Ly kafe
            </div>
            <div className="text-gray-500 text-sm m-auto text-center">Đăng nhập</div>
            <Formik initialValues={initialDataUser} onSubmit={login} validationSchema={validationSchema}>
              <Form>
                <div className="flex flex-col">
                  <div className="flex items-center mt-8 border-gray-400 ">
                    <div className="pr-2 text-gray-400">
                      <i className="fas fa-user-circle" />
                    </div>
                    <Field
                      name="username"
                      component={InputField}
                      label="Họ tên"
                      placeholder="Họ tên"
                      errorText={errors.username}
                      resetErrorsServer={resetErrorsServer}
                      className="flex-grow font-roboto py-1 pr-1 rounded-r outline-none"
                    />
                  </div>
                  <div className="flex items-center mt-8 border-gray-600 ">
                    <div className="pr-2 text-gray-400">
                      <i className="fas fa-lock" />
                    </div>
                    <Field
                      name="password"
                      component={InputPassword}
                      label="Mật khẩu"
                      errorText={errors.password}
                      resetErrorsServer={resetErrorsServer}
                      className="flex-grow font-roboto outline-none py-1 pr-1"
                    />
                    <span className="rounded mr-2 border-0 text-gray-600 hover:text-black cursor-pointer">
                      <i className="fas fa-eye-slash " />
                    </span>
                  </div>
                  {/* <Link
                    to="/forgotPassword"
                    className="mt-3 block self-end text-sm text-gray-900 hover:text-black hover:underline"
                  >
                    Bạn quên mật khẩu?
                  </Link> */}
                </div>
                <div className="flex items-center justify-between mt-10">
                  <Link
                    to="/register"
                    className="font-bold text-sm text-green-500 hover:text-green-700 underline text-center"
                  >
                    Tạo tài khoản mới
                  </Link>

                  <button
                    className=" bg-green-500 hover:bg-green-700 text-sm text-white py-1 px-4 rounded focus:outline-none"
                    type="submit"
                  >
                    Đăng nhập
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
