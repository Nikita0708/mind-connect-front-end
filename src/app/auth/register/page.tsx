"use client";

import Icon from "@components/Icon";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { Button, Input, Link, Tooltip } from "@nextui-org/react";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import InputForm from "@components/InputForm";
import InputCheckBox from "@components/InputCheckBox";
import { signUp } from "@lib/redux/slices/auth/authSlice";
import Vector from "@components/Vector";
import Title from "@components/Title";

export default function Register() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      isDoctor: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().trim().email().required(),
      firstName: Yup.string().trim().required(),
      password: Yup.string().trim().required().min(8),
      username: Yup.string().trim().required().min(4),
      repeatPassword: Yup.string()
        .trim()
        .required()
        .oneOf([Yup.ref("password")], "Passwords must match"),
      isDoctor: Yup.boolean(),
    }),
    onSubmit: (values: FormikValues) => {
      const { firstName, email, password, username, isDoctor } = values;
      dispatch(signUp({ firstName, email, password, username, isDoctor }));
      setTimeout(() => {
        window.open("/auth/login", "_self");
      }, 1000);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex h-[10vh] items-center">
        <Icon
          path="/icon/auth/logo-sm.svg"
          color="#aaaaaa"
          height="30px"
          width="190px"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center max-w-[80%] mb-7">
          <Title>Registration</Title>
          <div className="text-[14px]">
            Testing details are found while hover a mouse on the element
          </div>
        </div>
        <div>
          <Tooltip
            content="Setup a name, it may not be your real one for the test"
            placement="right"
          >
            <div className={"mb-[10px]"}>
              <InputForm
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                placeholder="Full name"
                type="text"
                InnerIconSrc="/user.svg"
                height="50px"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="error">{formik.errors.firstName as any}</div>
              )}
            </div>
          </Tooltip>
          <Tooltip
            content="Setup username, create some that never existed"
            placement="right"
          >
            <div className={"mb-[10px]"}>
              <InputForm
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="username"
                type="text"
                InnerIconSrc="/user.svg"
                height="50px"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error">{formik.errors.username as any}</div>
              )}
            </div>
          </Tooltip>
          <Tooltip
            content="Setup email, it may not be your real one or even existing"
            placement="right"
          >
            <div className={"mb-[10px]"}>
              <InputForm
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email"
                type="email"
                InnerIconSrc="/email.svg"
                height="50px"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email as any}</div>
              )}
            </div>
          </Tooltip>
          <Tooltip content="min 8 symbols password" placement="right">
            <div className={"mb-[10px]"}>
              <InputForm
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Password"
                type="password"
                InnerIconSrc="/password.svg"
                height="50px"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password as any}</div>
              )}
            </div>
          </Tooltip>
          <div className="mb-[10px]">
            <InputForm
              name="repeatPassword"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              placeholder="Repeat password"
              type="password"
              InnerIconSrc="/password.svg"
              height="50px"
            />
            {formik.touched.repeatPassword && formik.errors.repeatPassword && (
              <div className="error">{formik.errors.repeatPassword as any}</div>
            )}
          </div>
          <Tooltip
            content="make sure to set this to active if you want to test all functionality"
            placement="right"
          >
            <div className="mb-[10px]">
              <InputCheckBox
                name="isDoctor" // Link this checkbox to formik's state
                checked={formik.values.isDoctor}
                onChange={formik.handleChange}
                color="success"
              >
                <span className="text-sm">Are you a doctor?</span>
              </InputCheckBox>
            </div>
          </Tooltip>
          <div className="mb-[10px]">
            <InputCheckBox color="success">
              <span className="text-sm">I agree to the </span>
              <a
                href="#"
                className="underline text-sm decoration-green-600 text-green-600"
              >
                privacy policy
              </a>
            </InputCheckBox>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => window.history.back()}>
              <Vector />
            </Button>
            <Button
              className="w-[225px] text-white font-bold border-green-600 border-1"
              color="success"
              type="submit"
            >
              Create an account
            </Button>
          </div>
          <div className="text-center mt-2">
            Already have an account?{" "}
            <Link href="/auth/login" className={"font-simebold"}>
              {" "}
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
