import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import logo from "../../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";
import TextInput from "../../components/TextInput/TextInput";
import EmailInput from "../../components/EmailInput/EmailInput";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

function Register() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const [loading, setLoading] = useState(false);
  const {
    reset,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    console.log(data);
    e.preventDefault();
    try {
      console.log("entro");
    } catch (error) {
      console.error(error);
      reset();
      setLoading(false);
    }
  };

  return (
    <main className="h-screen grid justify-items-center bg-login  bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col justify-center lg:h-full md:w-96 sm:mx-2 md:m-auto sm:m-auto sm:my-8 sm:h-80">
        <Card
          isBlurred
          className="border-none w-full"
          shadow="sm"
          as={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <CardHeader className="flex gap-3 flex-col">
            <img alt="logo" height={80} src={logo} width={220} />
            <div className="flex flex-col pl-2">
              <p className="text-small text-foreground">
                Connect with phantastic people
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-col gap-3">
              <div className="flex md:flex-row flex-col gap-3 md:gap-2">
                <TextInput
                  {...register("name", {
                    required: {
                      value: true,
                      message: "First Name is required",
                    },
                  })}
                  label="First name"
                  isInvalid={Boolean(errors.name)}
                  errorMessage={errors.name?.message}
                />
                <TextInput
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "Last Name is required",
                    },
                  })}
                  label="Last name"
                  isInvalid={Boolean(errors.lastname)}
                  errorMessage={errors.lastname?.message}
                />
              </div>
              <TextInput
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                  minLength: {
                    value: 4,
                    message: "Username must have at least 4 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Username must have at most 15 characters",
                  }
                })}
                label="Username"
                isInvalid={Boolean(errors.username)}
                errorMessage={errors.username?.message}
              />
              <EmailInput
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                isInvalid={Boolean(errors.email)}
                errorMessage={errors.email?.message}
              />
              <PasswordInput
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  }
                })}
                label="Password"
                isInvalid={Boolean(errors.password)}
                errorMessage={errors.password?.message}
              />
              <PasswordInput
                {...register("confirmedPassword", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  validate: (value) => {
                    if (value !== getValues("password")) {
                      return "Passwords do not match";
                  } }
                })}
                label="Confirm password"
                isInvalid={Boolean(errors.confirmedPassword)}
                errorMessage={errors.confirmedPassword?.message}
              />
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex flex-col gap-2 w-full px-2">
              <h1 className="text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-foreground hover:text-primary-500 font-semibold"
                >
                  Log in
                </Link>
              </h1>
              <SubmitButton text="Sign Up" loading={loading} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default Register;
