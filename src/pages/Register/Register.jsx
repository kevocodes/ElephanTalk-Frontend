import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import logo from "../../assets/logo.webp";
import FirstNameInput from "./components/inputs/FirstNameInput";
import LastNameInput from "./components/inputs/LastNameInput";
import EmailInput from "./components/inputs/EmailInput";
import PasswordInput from "./components/inputs/PasswordInput";
import PasswordConfirmInput from "./components/inputs/PasswordConfirmationInput";
import { Link } from "react-router-dom";
import RegisterButton from "./components/buttons/RegisterButton";
import UsernameInput from "./components/inputs/UsernameInput";

function Register() {
  return (
    <main className="h-screen grid justify-items-center bg-login  bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col justify-center lg:h-full md:w-96 sm:mx-2 md:m-auto sm:m-auto sm:my-8 sm:h-80">
        <Card
          isBlurred
          className="border-none w-full"
          shadow="sm"
        >
          <CardHeader className="flex gap-3 flex-col">
            <img
              alt="logo"
              height={80}
              src={logo}
              width={220}
            />
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
                <FirstNameInput />
                <LastNameInput />
              </div>
              <UsernameInput />
              <EmailInput />
              <PasswordInput />
              <PasswordConfirmInput />
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
              <RegisterButton />
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default Register;
