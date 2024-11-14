import { Checkbox, Input } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/storeConfig/store";
import { RegisterRequest } from "../../redux/slice/Slices/registerSlice";
import { useEffect } from "react";
type TFormData = {
  email: string;
  password: string;
  username?: string;
  iaccept?: boolean;
};

function Register() {
  const { isRegister } = useSelector((state: RootState) => state?.register);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const defaultValues: TFormData = {
    email: "",
    password: "",
    username: "",
    iaccept: false,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({ defaultValues });

  const onSubmit: SubmitHandler<TFormData> = async (_data) => {
    let sendData = {
      email: _data.email,
      password: _data.password,
      username: _data.username,
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    };
    dispatch(RegisterRequest(sendData));
  };
  useEffect(() => {
    if (isRegister) {
      navigate("/login");
    }
  }, [isRegister]);
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
              Create an Account
            </p>
            <p className="text-md mt-1 font-normal text-[#969696]">
              Create a account to continue
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
              <label className="mb-[0.5rem]">{"Username"}</label>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Username is required",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="username"
                    name="username"
                    size="large"
                    placeholder="Enter Username Address"
                    value={field.value}
                    className={
                      errors["username"] ? "errorBorder errorShadow" : ""
                    }
                  />
                )}
              />
              {errors["username"] && (
                <div className="errorText">{errors["username"].message}</div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <label className="mb-[0.5rem]">{"Password"}</label>
              </div>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
                    message:
                      "Password must be at least 8 characters, include 1 uppercase character, 1 special character, and 1 number",
                  },
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
              {errors["password"] && (
                <div className="errorText">{errors["password"].message}</div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Controller
                    name="iaccept"
                    control={control}
                    rules={{
                      required: "I accept  is required",
                    }}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                        }}
                      >
                        {" "}
                        I accept terms and conditions
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
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-2 text-center text-sm text-[#969696]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#3E97FF] hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
