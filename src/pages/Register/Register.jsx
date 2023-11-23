import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import EmailInput from "../../components/EmailInput/EmailInput";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import TextInput from "../../components/TextInput/TextInput";
import { signUp } from "../../services/auth.service";
import { showAlert } from "../../utils/toastify.util";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setLoading(true);
      delete data.confirmedPassword;
      const { username } = await signUp(data);
      showAlert(`Welcome ${username}!`);
      navigate("/login");
      setLoading(false);
    } catch (error) {
      const userError = error.message.toLowerCase().includes("username");
      const emailError = error.message.toLowerCase().includes("email");
      if (userError || emailError) {
        userError &&
          setError("username", {
            type: "manual",
            message: "Username already exists",
          });

        emailError &&
          setError("email", {
            type: "manual",
            message: "Email already exists",
          });
      } else {
        showAlert("Something went wrong, try again later", "error");
      }
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100vh] p-4 grid justify-items-center items-center bg-light-login bg-cover bg-center bg-no-repeat dark:bg-dark-login">
        <Card
          className="border-none flex flex-col justify-center sm:w-96 sm:mx-2 md:m-auto sm:m-auto sm:my-8"
          shadow="sm"
          as={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <CardHeader className="flex justify-center items-center py-6">
            <img alt="logo" height={80} src={logo} width={220} />
          </CardHeader>

          <Divider />

          <CardBody>
            <div className="flex flex-col gap-4">
              <div className="flex sm:flex-row flex-col gap-4 sm:gap-2">
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
                  },
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
                  },
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
                    }
                  },
                })}
                label="Confirm password"
                isInvalid={Boolean(errors.confirmedPassword)}
                errorMessage={errors.confirmedPassword?.message}
              />
            </div>
          </CardBody>

          <CardFooter>
            <div className="flex flex-col w-full pl-2 pr-2 gap-4">
              <h1 className="text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary-500 font-extrabold"
                >
                  Log in
                </Link>
              </h1>

              <SubmitButton text="Sign Up" loading={loading} />
            </div>
          </CardFooter>
        </Card>
    </main>
  );
}

export default Register;
