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

export default function App({ info }) {
  const { content, user } = info;

  return (
    <div className="flex items-center justify-between w-full">
      <Card className="w-full min-h-fit ">
        <CardHeader className="flex gap-3">
          <Avatar
            className="rounded-full"
            alt="nextui logo"
            height={40}
            radius="sm"
            src={user ? user.picture : ''}
            width={40}
          />
          <div className="flex flex-col min-h-fit w-10/12">
            <p className="text-md">{user ? `${user.name} ${user.lastname}` : ''}</p>
            <p className="text-small text-default-500">
              {content ? content : ''}
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
