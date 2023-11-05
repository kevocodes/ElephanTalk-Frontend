import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Avatar,
} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex items-center justify-between w-full">
      <Card className="w-fullmin-h-fit ">
        <CardHeader className="flex gap-3">
          <Avatar
            className="rounded-full"
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            width={40}
          />
          <div className="flex flex-col min-h-fit w-10/12">
            <p className="text-md">Usuario</p>
            <p className="text-small text-default-500">
              Blah blah blah blah blah lah blah blalah blah blablah blah blah
              blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blahblah blah blah blah blah blah
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
