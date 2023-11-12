import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import EmailInput from "./components/inputs/EmailInput";
import PasswordInput from "./components/inputs/PasswordInput";
import LoginButton from "./components/butttons/LoginButton";
import logo from "../../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signIn, validateSession } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const [loading, setLoading] = useState(false);
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);
    try {
      setLoading(true);
      const token = await signIn(data);
      const userInfo = await validateSession({ token });
      setUser(userInfo);
      setToken(token);
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.error(error);
      logout();
      reset();
      setLoading(false);
    }
  };

  return (
    <main className="h-screen grid justify-items-center bg-login  bg-cover bg-center bg-no-repeat  ">
      <div className="flex flex-col justify-center  lg:h-full  md:w-96  sm:mx-2 md:m-auto sm:m-auto sm:my-8 sm:h-80">
        <Card
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
          <CardBody>
            <EmailInput
              {...register("username", {
                required: {
                  value: true,
                  message: "Username or Email is required",
                },
              })}
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
              isInvalid={Boolean(errors.password)}
              errorMessage={errors.password?.message}
            />
          </CardBody>

          <CardFooter>
            <div className="flex flex-col w-full pl-2 pr-2">
              <h1 className="text-sm pb-2 sm:mt-4">
                Need to create an account?{" "}
                <Link
                  to="/register"
                  className="text-foreground hover:text-primary-500"
                >
                  Sign up
                </Link>
              </h1>
              <LoginButton loading={loading} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
