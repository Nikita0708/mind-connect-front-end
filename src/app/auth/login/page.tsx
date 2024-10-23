"use client";

import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import InputForm from "@components/InputForm";
import { getAuthUserData, signIn } from "@lib/redux/slices/auth/authSlice";
import Vector from "@components/Vector";
import Title from "@components/Title";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.Auth.usersData);
  useEffect(() => {
    dispatch(getAuthUserData());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(user).length !== 0 && user !== undefined) {
      redirect("/dashboard");
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      captcha: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().trim().email().required(),
      password: Yup.string().trim().required(),
    }),
    onSubmit: (values) => {
      dispatch(signIn({ email: values.email, password: values.password }));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="max-w-[300px]">
          <div className="text-center mb-5">
            <Title>Log in</Title>
          </div>
          <div className={"mb-[10px]"}>
            <InputForm
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              InnerIconSrc="/email.svg"
              width="300px"
              height="40px"
            />
          </div>
          <div className={"mb-[10px]"}>
            <InputForm
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              InnerIconSrc="/password.svg"
              width="300px"
              height="40px"
            />
          </div>
          <div className="flex justify-start">
            <Checkbox color="success" size="sm">
              Remember me
            </Checkbox>
            <div className="ml-auto">
              <Link href="/auth/forgot-password" className="text-[13px]">
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <Button onClick={() => window.history.back()}>
            <Vector />
          </Button>
          <Button
            className="w-[220px] text-white font-semibold"
            color="success"
            type="submit"
          >
            Log in account
          </Button>
        </div>
        <div className="text-center mt-2">
          Dont have an account?{" "}
          <Link href="/auth/register" className={"font-simebold"}>
            Register
          </Link>
        </div>
      </form>
    </>
  );
}
