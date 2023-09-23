import Image from "next/image"

import { CloudMoon, BadgeInfo } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"

import { NavigationItem } from "./navigation-item"

export const NavigationSidebar = ({
    pathname
}: { pathname: string }) => {

    const isActive = (href: string) => {
        console.log(pathname, href)
        return pathname.includes(href);
    }

    return (
        <div className="space-y-4 flex flex-col items-center h-[95.5%] text-primary w-full dark:bg-[#202B3B] bg-[#e3e5e8] py-3 rounded-[20px]">
            <Image 
                src="/images/app/logo_green.png"
                height={45}
                width={45}
                alt="Carotempo"
            />
            <Separator className="h-2px bg-blue-400 dark:bg-blue-200 rounded-md w-10 mx-auto" />
            <div className="pt-4 flex-1 w-full">
                <NavigationItem 
                    active={isActive("/city")}
                    title="Meteorologia"
                    href="/"
                >
                    <CloudMoon />
                </NavigationItem>
                <NavigationItem 
                    active={isActive("/about-us")}
                    title="Sobre Nós"
                    href="/about-us"
                >
                    <BadgeInfo />
                </NavigationItem>
                <NavigationItem 
                    active={false}
                    title="Tema"
                    href=""
                >
                    <ModeToggle />
                </NavigationItem>
            </div>
        </div>
    )

}