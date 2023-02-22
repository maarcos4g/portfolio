"use client"

import { ShowFile } from "@/components/ShowFile";
import dayjs from "dayjs";
import { GitFork, Star } from "lucide-react";
import { useEffect, useState } from "react";

export const metadata = {
  title: 'Perfil',
}

interface ProfileProps {
  params: {
    repo: string;
  }
}

interface Repo {
  name: string;
  description: string;
  created_at: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    login: string;
    avatar_url: string;
    url: string;
  },
  topics: string[]
}

export default function Repository({ params }: ProfileProps) {
  const [repo, setRepo] = useState<Repo>()
  const [ownerName, setOwnerName] = useState("")

  async function getDataInGithub() {
    const dataResponse = await fetch(`https://api.github.com/repos/maarcos4g/${params.repo}`, {
      cache: "no-store"
    });

    const data = await dataResponse.json();
    setRepo(data);

    const ownerResponse = await fetch("https://api.github.com/users/maarcos4g", {
      cache: "no-store"
    })
    const owner = await ownerResponse.json()
    setOwnerName(owner.name);
  }

  useEffect(() => {
    getDataInGithub();
  }, [])

  const date = dayjs(repo?.created_at).format('DD/MM/YYYY');

  return (
    <div className="w-full h-full">
      <ShowFile filename={`${params.repo}.tsx`} path="Profile" />

      <div className="w-full h-full flex justify-center py-20 px-10">

        <div className="flex flex-col px-4 py-2">

          <div className="bg-white p-2 border-[3px] rounded-sm border-gray-200 flex flex-col items-center gap-3 max-w-xl">

            <div className="flex items-start">
              <img src={repo?.owner.avatar_url} alt="" className="w-16 h-16 rounded-full" />

              <div className="ml-4 items-start justify-start">
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex gap-2 items-center">
                    <span className="text-zinc-800 font-bold text-sm">{ownerName}</span>
                    <span className="text-zinc-400 text-xs">•</span>
                    <span className="text-zinc-500 font-light text-xs">@{repo?.owner.login}</span>
                    <span className="text-zinc-400 text-xs">•</span>
                    <p className="text-zinc-500 font-light text-xs">{date}</p>
                  </div>
                  <span>
                    {repo?.description || "Sem descrição"}
                  </span>

                  <div className="w-full flex gap-2">
                    {repo?.topics.map((topic) => (
                      <span className="bg-blue-800/30 text-blue-800 text-xs font-bold px-2 py-1 rounded-2xl">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 justify-between">
                    <div className="flex gap-1 items-center text-zinc-500 ">
                      <Star size={16} />
                      <span className="font-medium">{repo?.stargazers_count}</span>
                    </div>
                    <div className="flex gap-1 items-center text-zinc-500">
                      <GitFork size={16} />
                      <span className="font-medium">{repo?.forks_count}</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}