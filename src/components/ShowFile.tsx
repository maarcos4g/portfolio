"use client"

import { CurlyBraces, X } from "lucide-react";
import colors from 'tailwindcss/colors'

import { useRouter } from 'next/navigation'

interface FileProps {
  filename: string;
  path: string;
}

export function ShowFile({ filename, path }: FileProps) {
  const { back } = useRouter()
  
  return (
    <div className="w-full h-10 flex">
      <div className="px-4 py-2 bg-[#2a273f] flex items-center justify-center gap-2 border-b border-zinc-900">
        <CurlyBraces size={18} color="#c4c4c4" />
        <span className="text-[#C1C1C1] font-medium text-sm">
          {filename}
        </span>
        <span className="text-xs font-normal text-red-400/30">
          {path}
        </span>
        <X size={18}
          color={colors.zinc[200]}
          className="cursor-pointer hover:bg-black/20"
          onClick={() => back()} />
      </div>
    </div>
  );
}