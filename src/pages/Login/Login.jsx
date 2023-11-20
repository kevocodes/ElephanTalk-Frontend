import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import logo from "../../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signIn, validateSession } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { showAlert } from "../../utils/toastify.util";

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await signIn(data);
      const userInfo = await validateSession({ token });
      setUser(userInfo);
      setToken(token);
      navigate("/");
      setLoading(false);
    } catch (error) {
      logout();
      showAlert(error.message, "error");
      setLoading(false);
    }
  };

  return (
    <main className="h-screen grid justify-items-center bg-login  bg-cover bg-center bg-no-repeat  ">
      <div className="flex flex-col justify-center  lg:h-full  md:w-96  sm:mx-2 md:m-auto sm:m-auto sm:my-8 sm:h-80">
        <Card
          data-testid="login-form"
          isBlurred
          as={"form"}
          onSubmit={handleSubmit(onSubmit)}
          className="border-none w-full"
          shadow="sm"
        >
          <CardHeader className="flex gap-3 flex-col">
            <img alt="logo logo" height={80} src={logo} width={220} />
            <div className="flex flex-col pl-2">
              <p className="text-small text-foreground">
                Connect with phantastic people
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="gap-4">
            <TextInput
              {...register("username", {
                required: {
                  value: true,
                  message: "Username or Email is required",
                },
              })}
              label="Username or Email"
              isInvalid={Boolean(errors.username)}
              errorMessage={errors.username?.message}
            />
            <PasswordInput
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              label="Password"
              isInvalid={Boolean(errors.password)}
              errorMessage={errors.password?.message}
            />
          </CardBody>

          <CardFooter className="pt-0">
            <div className="flex flex-col w-full pl-2 pr-2">
              <h1 className="text-sm pb-2">
                Need to create an account?{" "}
                <Link
                  to="/register"
                  className="text-foreground hover:text-primary-500"
                >
                  Sign up
                </Link>
              </h1>
              <SubmitButton loading={loading} text="Sign In"/>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
