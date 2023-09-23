'use client';

import { usePathname } from 'next/navigation';

import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = ({
    children
}: { children: React.ReactNode }) => {

    const pathname = usePathname();

    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0 m-5">
                <NavigationSidebar
                    pathname={pathname}
                />
            </div>
            <div className="md:pl-[72px] h-full">
                {children}
            </div>
        </div>
     );
}
 
export default MainLayout;