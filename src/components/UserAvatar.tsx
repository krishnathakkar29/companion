"use client";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";

type Props = {};

const UserAvatar = (props: Props) => {
  const { user } = useUser();
  
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={user?.imageUrl} />
    </Avatar>
  );
};

export default UserAvatar;
