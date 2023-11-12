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
import { useState } from "react";
import { signIn, validateSession } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const createHandleInputChange = (key) => (e) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await signIn(formData);
      const userInfo = await validateSession({ token });
      setToken(token);
      setUser(userInfo);
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.error(error);
      logout();
      setLoading(false);
    }
  };

  return (
    <main className="h-screen grid justify-items-center bg-login  bg-cover bg-center bg-no-repeat  ">
      <div className="flex flex-col justify-center  lg:h-full  md:w-96  sm:mx-2 md:m-auto  sm:m-auto sm:my-8 sm:h-80">
        <Card
          as={"form"}
          onSubmit={handleSubmit}
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-full"
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
              onChange={createHandleInputChange("username")}
              value={formData.username}
            />
            <PasswordInput
              onChange={createHandleInputChange("password")}
              value={formData.password}
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
