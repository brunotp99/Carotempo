"use client";

import { currentCity } from "@/lib/current-city";
import Image from "next/image"
import { useEffect, useState } from "react";

interface IPMAProps {
    tMed: string;
    idTipoTempo: number;
    hR: string;
    dataUpdate: string;
    utci: string;
    ffVento: string;
    globalIdLocal: number;
    probabilidadePrecipita: string;
    idPeriodo: number;
    dataPrev: string;
    ddVento: string;
}

interface TodayBannerProps {
    cityId: string;
    forecast: {
        nowInfo: IPMAProps | undefined;
        singleDayInfo: IPMAProps;
    }
}

export const TodayBanner = ({
    cityId, forecast
}: TodayBannerProps) => {

    const [cidade, setCidade] = useState("Cidade");

    useEffect(() => {
        const currCity = currentCity();
        setCidade(currCity.name);
    }, []);

    return (
        <div className="flex justify-between mx-10">
            <div className="w-2/3">
                <div className="flex flex-col gap-y-2">
                    <div className="text-[40px] font-[900] text-zinc-700 dark:text-white">
                        {cidade}
                    </div>
                    <div className="text-[14px] font-[300] text-zinc-700 dark:text-white">
                        Probabilidade de chuva: {Math.round(parseFloat((forecast.nowInfo?.probabilidadePrecipita ?? "0") === "-99.0" ? "0" : (forecast.nowInfo?.probabilidadePrecipita ?? "0")))}%
                    </div>
                    <div className="mt-auto text-[60px] font-[900] text-zinc-700 dark:text-white">
                        {Math.round(parseFloat(forecast.nowInfo?.tMed ?? "0"))}º
                    </div>
                </div>
            </div>
            <div className="ml-auto w-1/3 flex items-center justify-end">
                <Image 
                    src="/images/icons/w_ic_d_01anim.svg"
                    width={200}
                    height={200}
                    alt="Current Weather"
                />
            </div>
        </div>
    )

}