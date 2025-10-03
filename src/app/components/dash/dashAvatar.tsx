"use client";
import Avatar from "@/app/ui/avatar";

type Props = {
  username: string;
  avatar: string;
};

export default function DashAvatar({ username, avatar }: Props) {
  return (
    <div className="flex flex-col items-center justify-center m-2">
      <div className="flex flex-col items-center justify-center m-2">
        <Avatar name={username} avatar={avatar} />
        <h1 className="hidden md:block font-bold text-sm text-white">
          {username}
        </h1>
      </div>
    </div>
  );
}
