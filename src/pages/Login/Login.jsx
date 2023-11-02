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
import './Login.css'


export default function Login() {
  return (
    <main className='h-screen grid justify-items-center bg-image  bg-cover bg-center bg-no-repeat  '
    > 
      <div className='flex flex-col justify-center  lg:h-full  md:w-96  sm:mx-2 md:m-auto  sm:m-auto sm:my-8 sm:h-80'>
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
            <div className='flex flex-col w-full pl-2 pr-2'>
              <h1 className='text-sm pb-2 sm:mt-4'>
                Need to create an account?{' '}
                <a href="" className='text-primary-400 hover:text-primary'>
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
