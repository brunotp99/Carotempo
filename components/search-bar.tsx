"use client";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"; 
import axios from "axios";

import { Search } from "lucide-react"
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import { cities } from "@/data/cities"

import { currentCity, setCity } from "@/lib/current-city";

export function SearchBar () {
    const [open, setOpen] = useState(false);
    const [cidade, setCidade] = useState("Cidade");
    const router = useRouter();

    const data = cities;

    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, []);

    useEffect(() => {
        const currCity = currentCity();
        setCidade(currCity.name ?? "Cidade")
    }, [])

    const onClick = ({ level, code, name }: { level: number, code: number | string, name: string }) => {
        setOpen(false);
        setCidade(name);
        setCity({ name: name, cityId: code.toString() });
        return router.replace(`/city/${code}`)
    }
   
    return (
        <>
            <button 
                onClick={() => setOpen(true)}
                className="group px-2 py-2 rounded-[15px] flex items-center gap-x-2 w-full hover:bg-zinc-700/10 transition border-0 bg-[#e3e5e8] text-zinc-700 dark:bg-[#202B3B] dark:text-white"
            >
                <Search className="w-4 h-4 dark:text-zinc-200" />
                <p className="font-semibold text-xs dark:text-zinc-200 group-hover:text-zinc-500 transition py-2" >
                    {cidade}
                </p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-mute-foreground ml-auto">
                    <span className="text-xs">CTRL</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Selecione uma cidade..." />
                <CommandList>
                    <CommandEmpty>Cidade não encontrada.</CommandEmpty>
                    {data.map(({level, code, name}) => {
                        if(!data?.length) return null;

                        return (
                            <CommandItem key={code} onSelect={() => onClick({ level, code, name })}>
                                <span>{name}</span>
                            </CommandItem>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}