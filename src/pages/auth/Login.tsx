import { useForm } from "react-hook-form";
import LandingForm from "../../components/ui/form/Form";
import LandingFormInput from "../../components/ui/form/landing/LandingFormInput";
import Button from "../../components/ui/button/Button";
import { MdArrowOutward } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { LoginI, useLoginUserMutation } from "../../store/modules/auth/authApi";
import { useEffect } from "react";
import useToastHook from "../../utils/hooks/toast/useToastHook";
import { IBucketKeyEnums, bucket } from "../../utils/helpers/storage";
import AuthenticationLayout from "./AuthenticationLayout";
import { notEmptyObject } from "../../utils/helpers/validator";

const Login = () => {
  const { showToast } = useToastHook();
  const navigate = useNavigate();

  // STATE
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginI>();

  // REDUX
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isLoading: isLoginLoading,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  // USEEFFECT
  useEffect(() => {
    if (isLoginSuccess) {
      reset();
      navigate("/dashboard");
    }
    if (isLoginError) {
      //@ts-expect-error login error message
      const responseError = loginError?.data?.errors;
      responseError?.length &&
        responseError.map((error: any) =>
          showToast(error.message, {
            type: "error",
          })
        );
    }
  }, [isLoginSuccess, isLoginError, loginError]);

  useEffect(() => {
    if (loginData && notEmptyObject(loginData)) {
      bucket.set(IBucketKeyEnums.TOKEN, loginData.data.access);
      bucket.set(IBucketKeyEnums.REFRESH_TOKEN, loginData.data.refresh);
      bucket.set(IBucketKeyEnums.ID, loginData.user.id);
      bucket.set(IBucketKeyEnums.ACTIVE_USER_EMAIL, loginData.user.email);
      bucket.set(
        IBucketKeyEnums.ACTIVE_USER,
        `${loginData.user.first_name} ${loginData.user.middle_name || ""} ${
          loginData.user.last_name
        }`
      );
    }
  }, [loginData]);

  // HELPER FUNCTION
  const onSubmitHandler = async (data: any) => {
    await loginUser({ data });
  };

  return (
    <AuthenticationLayout title="Login to NepGIS">
      <div className="w-[417px] px-16 ">
        <LandingForm onSubmit={handleSubmit(onSubmitHandler)}>
          <LandingFormInput
            label="Username/Email"
            bgColor="bg-primary-blue-600"
            {...register("username_or_phone", {
              required: "Username  field shouldn't be empty.",
            })}
            error={errors.username_or_phone && errors.username_or_phone.message}
          />
          <LandingFormInput
            label="Password"
            type="password"
            bgColor="bg-primary-blue-600"
            {...register("password", {
              required: "Password shouldn't be empty.",
            })}
            error={errors.password && errors.password.message}
          />

          <Button.Group margin="mt-12">
            <Button
              variant="ghost"
              rounded="rounded-full"
              type="submit"
              isLoading={isLoginLoading}
            >
              Login <MdArrowOutward />
            </Button>
          </Button.Group>
          <p className="text-tiny mt-3">
            Don't have account?{" "}
            <Link
              to="/signup"
              className=" text-primary-gray-180 hover:text-primary-gray-50 font-semibold duration-100 ease-in-out"
            >
              Register here
            </Link>
          </p>
        </LandingForm>
      </div>
    </AuthenticationLayout>
  );
};

export default Login;
