"use client"

import { useRouter } from "next/navigation";

import { ActionToolTip } from "@/components/action-tooltip";

import { cn } from "@/lib/utils";

interface NavigationItemProps {
    active: boolean;
    title: string;
    href: string;
    children: React.ReactNode;
}

export const NavigationItem = ({
    active, title, href, children
}: NavigationItemProps) => {

    const router = useRouter();

    const onClick = () => {
        router.replace(href);
    }

    return (
        <ActionToolTip 
            label={title}
            side="left"
            align="center"
        >
            <button onClick={() => onClick()} className="group relative flex items-center py-2">
                <div>
                    <div className={cn(
                        "relative group flex items-center justify-center mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:bg-primary/10 group-hover:rounded-[16px] transition-all overflow-hidden",
                        active && "bg-primary/10 text-primary rounded-[16px]"
                    )}>
                        <div className="flex items-center justify-center text-center">
                            <div>{children}</div>
                        </div>
                    </div>
                </div>
            </button>
        </ActionToolTip>
    )
}