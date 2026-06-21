
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { loginUser } from "../../store/slices/authSlice";

import FormGrid from "../form/FormGrid";
import InputField from "../form/form-input/InputField";
import Button from "../ui/button/Button";

import toast from "react-hot-toast";
import { EyeClosed, EyeOffIcon } from "lucide-react";
import AppConfig from "../../utils/appConfig";

/* ---------------- Schema ---------------- */

const loginSchema = z.object({
  Email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  Password: z.string().min(1, "Password is required"),
});

/* ---------------- Component ---------------- */

export default function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  /* Handle submit */


  const onSubmit = (data) => {
    dispatch(
      loginUser({
        ...data,
        appType: AppConfig.appType,
      })
    );
  };

  /* Success login */

  useEffect(() => {
    if (user) {
      toast.success("Login successful");
      navigate("/home");
    }
  }, [user, navigate]);

  /* Error */

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 w-full px-2 pb-4 ">
          <img
            src="/images/logo/logo.jpeg"
            alt={AppConfig.companyName}
            className="object-contain flex-shrink-0 w-15 h-15 rounded-full"
          />
          <div>
            <h2 className="text-sm font-bold tracking-wide text-gray-900 dark:text-white uppercase">
              {AppConfig.companyName}
            </h2>

            <p className="text-[11px] text-gray-500 uppercase tracking-wider">
              {AppConfig.companySubName}
            </p>
          </div>

        </div>


        {/* Heading */}

        <div className="mb-6">
          <h1 className="mb-2 font-semibold text-gray-800 text-2xl dark:text-white">
            Sign In
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email and password to sign in!
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit(onSubmit)}>

          <FormGrid cols={1}>

            {/* Email */}

            <InputField
              name="Email"
              label="Email"
              type="email"
              placeholder="info@gmail.com"
              control={control}
              error={errors.Email}
              required
            />

            {/* Password */}

            <div className="relative">

              <InputField
                name="Password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                control={control}
                error={errors.Password}
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] cursor-pointer"
              >
                {showPassword ? (
                  <EyeOffIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeClosed className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>

            </div>

          </FormGrid>

          {/* Button */}

          <Button
            type="submit"
            className="w-full mt-6"
            size="sm"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

        </form>

      </div>
    </div>
  );
}

