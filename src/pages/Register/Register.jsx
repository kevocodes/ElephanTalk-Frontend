import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
} from '@nextui-org/react'
import logo from "../../assets/logo.webp"
import FirstNameInput from './components/inputs/FirstNameInput'
import LastNameInput from './components/inputs/LastNameInput'
import EmailInput from './components/inputs/EmailInput'
import PasswordInput from './components/inputs/PasswordInput'
import PasswordConfirmInput from './components/inputs/PasswordConfirmationInput'
import { Link } from 'react-router-dom'
import RegisterButton from './components/buttons/RegisterButton'

function Register() {
    return (
        <main className='h-screen grid justify-items-center bg-login  bg-cover bg-center bg-no-repeat'>
            <div className='flex flex-col justify-center lg:h-full md:w-96 sm:mx-2 md:m-auto sm:m-auto sm:my-8 sm:h-80'>
                <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 w-full"
                    shadow="sm">
                    <CardHeader className="flex gap-3 flex-col">
                        <img
                            alt="logo logo"
                            height={80}
                            radius="sm"
                            src={logo}
                            width={220}
                        />
                        <div className="flex flex-col pl-2">
                            <p className="text-small text-default-500 text-foreground">
                                Connect with phantastic people
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className='flex flex-col gap-3'>
                            <div className='flex md:flex-row flex-col gap-3 md:gap-2'>
                                
                            </div>
                            
                        </div>
                    </CardBody>
                    
                </Card>
            </div>
        </main>
    )
}

export default Register