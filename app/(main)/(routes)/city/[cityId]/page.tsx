import { SearchBar } from "@/components/search-bar";
import { TodayBanner } from "@/components/today/today-banner";

import { dailyForecasts } from "@/lib/forecasts";

const CityIdPage = async ({ params }: { params: { cityId: string } }) => {

    const forecast = await dailyForecasts({ cityId: params?.cityId });

    return (
        <div className="ml-10 mt-5 flex flex-col gap-y-5 w-1/2">
            <div>
                <SearchBar />
            </div>
            <div>
                <TodayBanner
                    cityId={params?.cityId}
                    forecast={forecast}
                />
            </div>
        </div>
    );
};

export default CityIdPage;