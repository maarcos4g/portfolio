// "use client"

import { ShowFile } from "@/components/ShowFile";
import Image from "next/image";
// import { useState } from "react";

export const metadata = {
  title: 'Perfil',
}

interface ProfileDataProps {
  avatar_url: string;
  html_url: string;
  name: string;
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export default async function Profile() {
  const dataResponse = await fetch('https://api.github.com/users/maarcos4g', {
    cache: 'no-store'
  });
  const data = await dataResponse.json()

  // const [user, setUser] = useState({} as ProfileDataProps)

  // setUser({
  //   avatar_url: data.avatar_url,
  //   html_url: data.html_url,
  //   name: data.name,
  //   location: data.location,
  //   bio: data.bio,
  //   public_repos: data.public_repos,
  //   followers: data.followers,
  //   following: data.following
  // });

  return (
    <div className="w-full h-full">
      <ShowFile filename="profile.tsx" path="Profile" />

      <div className="w-full h-full flex justify-center py-20 px-10">
        <div className="flex flex-col px-4 py-2">
          <Image src={data.avatar_url}
            alt="Avatar" className="rounded-full border-[3px] border-blue-400"
            width={128} height={128}
          />
          <span className="text-zinc-50 font-bold text-xl mt-4">
            {data.name}, {data.public_repos} repositórios
          </span>
          <p className="text-zinc-100 font-medium text-base mt-2">
            {data.bio}
          </p>
          <span className="text-gray-300 font-normal text-base mt-3">
            {data.location}
          </span>
          <div className="mt-3 flex gap-3 text-gray-300">
            <span>{data.followers} seguidores</span>
            <span>•</span>
            <span>{data.following} conexões</span>
          </div>

          <div className="flex items-start justify-end mt-3">
            <a href={data.html_url}
              target="_blank"
              className="bg-blue-300 px-4 py-3 rounded-3xl font-bold text-gray-800 outline-none cursor-pointer">
              Ver perfil completo no github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}