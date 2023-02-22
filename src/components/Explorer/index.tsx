"use client"

import { useEffect, useState } from "react";
import { Github, MoreHorizontal, Terminal, User } from "lucide-react";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { File } from "./File";
import { Folder } from "./Folder";

interface Repo {
  name: string;
  description: string;
}

export function Explorer() {
  const [repos, setRepos] = useState<Repo[]>([])

  async function getDataInGithub() {
    const dataResponse = await fetch("https://api.github.com/users/maarcos4g/repos", {
      cache: "no-store"
    });

    const data = await dataResponse.json();
    setRepos(data)
  }

  useEffect(() => {
    getDataInGithub();
  }, [])

  return (
    <div className="py-2 px-4 text-[#8F8CA8]">
      <strong className="font-medium text-xs pl-2 flex items-center justify-between">
        EXPLORER
        <MoreHorizontal size={16} strokeWidth={1.5} />
      </strong>

      <nav className="mt-4 flex flex-col overflow-auto">
        <Folder defaultOpen title="Perfil">
          <File href="/maarcos4g/profile">
            <User size={16} />
            profile.tsx
          </File>
        </Folder>

        <Folder title="Repositórios">
          <ScrollArea.Root className=" w-full h-[520px] overflow-hidden bg-transparent">
            <ScrollArea.Viewport className="w-full h-full">
              {repos.map((repo, index) => (
                <File href={`/repo/${repo.name}`} key={repo.name}>
                  <Github size={16} />
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {repo.name}
                  </span>
                </File>
              ))}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="flex select-none touch-none p-2 bg-transparent" orientation="vertical">
              <ScrollArea.Thumb className="flex-1 bg-black rounded-lg relative" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-gray-300" />
          </ScrollArea.Root>

        </Folder>

      </nav>
    </div >
  );
}