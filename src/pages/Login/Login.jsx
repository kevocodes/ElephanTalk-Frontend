import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from '@nextui-org/react'

export default function Login() {
  return (
    <main>
      <div>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-full"
          shadow="sm"
        >
          <CardHeader className="flex gap-3"></CardHeader>
          <Divider />
          <CardBody></CardBody>

          <CardFooter></CardFooter>
        </Card>
      </div>
    </main>
  )
}
