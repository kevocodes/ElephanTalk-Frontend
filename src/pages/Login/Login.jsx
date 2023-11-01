import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from '@nextui-org/react'
import EmailInput from './components/inputs/EmailInput'
import PasswordInput from './components/inputs/PasswordInput'
import LoginButton from './components/butttons/LoginButton'

export default function Login() {
  return (
    <main className='h-screen grid justify-items-center'> 
      <div className='flex flex-col justify-center '>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-full"
          shadow="sm"
        >
          <CardHeader className="flex gap-3">
            <div className="flex flex-col pl-2">
              <p className="text-md text-primary text-3xl font-bold mb-2  sm:text-lef ">
                ElephanTalk
              </p>
              <p className="text-small text-default-500 text-primary-50">
                Connect with phantastic people
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <EmailInput />
            <PasswordInput />
          </CardBody>

          <CardFooter>
            <div className="">
              <h1 className="">
                Need to create an account?{' '}
                <a href="" className="">
                  Sign up
                </a>
              </h1>
              <LoginButton/>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
