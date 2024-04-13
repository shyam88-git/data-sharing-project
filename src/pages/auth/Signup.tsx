import { useForm } from "react-hook-form";
import AuthenticationLayout from "./AuthenticationLayout";
import {
  SignupI,
  useSignupUserMutation,
} from "../../store/modules/auth/authApi";
import LandingForm from "../../components/ui/form/Form";
import LandingFormInput from "../../components/ui/form/landing/LandingFormInput";
import Button from "../../components/ui/button/Button";
import { MdArrowOutward } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useToastHook from "../../utils/hooks/toast/useToastHook";

function isValidPhoneNumber(phoneNumber: number) {
  var nepalPhoneNumberRegex = /^98\d{8}$/;
  return !nepalPhoneNumberRegex.test(phoneNumber.toString());
}

function addCountryCode(phoneNumber: number) {
  return `+977${phoneNumber}`;
}

const Signup = () => {
  const { showToast } = useToastHook();
  const navigate = useNavigate();

  // STATE
  const {
    handleSubmit,
    register,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignupI>({
    defaultValues: {
      username: "",
      email: "",
      last_name: "",
      first_name: "",
      mobile_number: "",
      password: "",
      confirm_password: "",
    },
  });
  const [passwordNotMatchErr, setPasswordNotMatchErr] = useState<string | null>(
    null
  );
  const [mblNumberErr, setMblNumberErr] = useState<string | null>(null);
  const confirmPasswordInput = watch("confirm_password");
  const phoneNumberInput = watch("mobile_number");

  //REDUX
  const [signupUser, { isSuccess, isLoading, isError, error }] =
    useSignupUserMutation();

  // USEEFFECT
  useEffect(() => {
    const password = getValues("password");
    if (password !== confirmPasswordInput) {
      setPasswordNotMatchErr("Password do no match");
    } else setPasswordNotMatchErr(null);
    if (phoneNumberInput && isValidPhoneNumber(+phoneNumberInput)) {
      setMblNumberErr("Should be of 10 digits.");
    } else setMblNumberErr(null);
  }, [confirmPasswordInput, phoneNumberInput]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      showToast("Registered successfully.", { type: "success" });
      navigate("/login");
    }
    if (isError) {
      //@ts-ignore
      const errorMes = error.data.errors;

      errorMes.map((error: any) =>
        showToast(error?.message, { type: "error" })
      );
    }
  }, [isSuccess, isError]);

  // HELPER FUNCTION
  const onSubmitHandler = async (data: any) => {
    const { mobile_number } = data;
    if (!!mblNumberErr) return;

    const payload = {
      ...data,
      mobile_number: addCountryCode(mobile_number),
    };
    await signupUser({ data: payload });
  };

  return (
    <AuthenticationLayout title="Register to NepGIS">
      <div className="px-16 ">
        <LandingForm onSubmit={handleSubmit(onSubmitHandler)}>
          <LandingForm.FormGroup isRow={true}>
            <LandingFormInput
              label="First Name"
              bgColor="bg-primary-blue-600"
              {...register("first_name", {
                required: "Required field.",
              })}
              error={errors.first_name && errors.first_name.message}
            />{" "}
            <LandingFormInput
              label="Last Name"
              bgColor="bg-primary-blue-600"
              {...register("last_name", {
                required: "Required field.",
              })}
              error={errors.last_name && errors.last_name.message}
            />{" "}
          </LandingForm.FormGroup>
          <LandingForm.FormGroup isRow={true}>
            <LandingFormInput
              label="Username"
              bgColor="bg-primary-blue-600"
              {...register("username", {
                required: "Required field.",
              })}
              error={errors.username && errors.username.message}
            />
            <LandingFormInput
              label="Mobile number"
              type="number"
              bgColor="bg-primary-blue-600"
              {...register("mobile_number", {
                required: "Required field.",
              })}
              error={
                mblNumberErr ||
                (errors.mobile_number && errors.mobile_number.message)
              }
            />
          </LandingForm.FormGroup>
          <LandingFormInput
            label="Email"
            type="email"
            bgColor="bg-primary-blue-600"
            {...register("email", {
              required: "Required field.",
            })}
            error={errors.email && errors.email.message}
          />{" "}
          <LandingForm.FormGroup isRow={true}>
            <LandingFormInput
              label="Password"
              type="password"
              bgColor="bg-primary-blue-600"
              {...register("password", {
                required: "Required field.",
              })}
              error={errors.password && errors.password.message}
            />
            <LandingFormInput
              label="Confirm Password"
              type="password"
              bgColor="bg-primary-blue-600"
              {...register("confirm_password")}
              error={passwordNotMatchErr}
            />
          </LandingForm.FormGroup>
          <Button.Group margin="mt-12">
            <Button
              variant="ghost"
              rounded="rounded-full"
              type="submit"
              isLoading={isLoading}
            >
              Sign up <MdArrowOutward />
            </Button>
          </Button.Group>
          <p className="text-tiny mt-3">
            Already have account?{" "}
            <Link
              to="/login"
              className=" text-primary-gray-180 hover:text-primary-gray-50 font-semibold duration-100 ease-in-out"
            >
              Login
            </Link>
          </p>
        </LandingForm>
      </div>
    </AuthenticationLayout>
  );
};

export default Signup;
