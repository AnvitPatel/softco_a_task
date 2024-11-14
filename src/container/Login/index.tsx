import { Checkbox, Input } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/storeConfig/store";
import { useDispatch, useSelector } from "react-redux";
import { LoginRequest } from "../../redux/slice/Slices/authSlice";
import { useEffect } from "react";
type TFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { rememberMe } = useSelector((state: RootState) => state?.auth);
  const defaultValues: TFormData = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    // reset,
  } = useForm<TFormData>({ defaultValues });
  useEffect(() => {
    if (rememberMe) {
      setValue("email", rememberMe?.email);
      setValue("password", rememberMe?.password);
      setValue("rememberMe", rememberMe?.rememberMe);
    }
  }, [rememberMe]);
  const onSubmit: SubmitHandler<TFormData> = async (_data) => {
    let sendData = {
      email: _data?.email,
      password: _data?.password,
      rememberMe: _data?.rememberMe,
    };
    dispatch(LoginRequest(sendData));
  };
  return (
    <div
      className="flex h-screen w-full bg-[#4880FF]"
      style={{
        backgroundImage: `url("/assets/loginImage/Shape.png")`,
        backgroundPosition: `center`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-full items-center justify-center">
        <div className="flex w-[29rem] flex-col justify-center p-8 max-[1024px]:px-5 bg-white rounded-xl">
          <div className="mb-6 flex flex-col justify-center text-center">
            <p className="text-3xl font-semibold text-[#545454]">
              Login to Account
            </p>
            <p className="text-md mt-1 font-normal text-[#969696]">
              Please enter your email and password to continue
            </p>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <label className="mb-[0.5rem]">{"Email Address"}</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    name="email"
                    size="large"
                    placeholder="Enter Email Address"
                    value={field.value}
                    className={errors["email"] ? "errorBorder errorShadow" : ""}
                  />
                )}
              />
              {errors["email"] && (
                <div className="errorText">{errors["email"].message}</div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <label className="mb-[0.5rem]">{"Password"}</label>
                <p className="cursor-pointer text-sm font-semibold text-[#3E97FF] hover:underline ml-auto">
                  Forgot Password?
                </p>
              </div>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    size="large"
                    value={field.value}
                    className={
                      errors["password"] ? "errorBorder errorShadow" : ""
                    }
                  />
                )}
              />
              {errors["email"] && (
                <div className="errorText">{errors["email"].message}</div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                        }}
                      >
                        {" "}
                        Remember Password
                      </Checkbox>
                    )}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded bg-[#3E97FF] px-5 py-2 font-bold text-white transition-colors hover:bg-blue-500"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-2 text-center text-sm text-[#969696]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#3E97FF] hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
