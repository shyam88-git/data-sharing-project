import { useForm } from "react-hook-form";
import Form from "../../components/ui/form/Form";
import LandingFormInput from "../../components/ui/form/landing/LandingFormInput";
import Button from "../../components/ui/button/Button";
import { MdArrowOutward } from "react-icons/md";
import LandingFormTextArea from "../../components/ui/form/landing/LandingFromTextArea";
import useToastHook from "../../utils/hooks/toast/useToastHook";

const LandingFormSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  const { showToast } = useToastHook();

  const onSubmitHandler = (data: any) => {
    showToast(
      `Successfully submitted.
      Your data: ${JSON.stringify(data)}`,
      {
        type: "success",
      }
    );
    reset();
  };
  return (
    <div
      id="getInTouchForm"
      className="w-[517px] h-[664px] bg-primary-blue-200 text-white py-8 px-16"
    >
      <p className="text-center text-[32px] leading-3xl mb-16">Get In Touch</p>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <LandingFormInput
          label="Your Name"
          {...register("name", { required: "Please enter your name" })}
          error={errors.name && errors.name.message}
        />
        <LandingFormInput
          label="Your Email"
          {...register("email", { required: "Please enter your email" })}
          error={errors.email && errors.email.message}
        />
        <LandingFormInput
          label="Subject"
          {...register("subject", { required: "Subject is required" })}
          error={errors.subject && errors.subject.message}
        />
        <div className="mb-24"></div>
        <LandingFormTextArea
          label="Your Message (Optional)"
          {...register("message")}
        />
        <Button.Group margin="mt-12">
          <Button variant="ghost" rounded="rounded-full" type="submit">
            Send Message <MdArrowOutward />
          </Button>
        </Button.Group>
      </Form>
    </div>
  );
};

export default LandingFormSection;
