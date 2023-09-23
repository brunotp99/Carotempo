import axios from "axios";
import { format } from "date-fns";

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

interface weeklyForecastProps {
    tMin: string;
    tMax: string;
    idTipoTempo: number;
    ffVento: string;
    probabilidadePrecipita: string;
    dataPrev: string;
}


interface ForecastsProps {
    cityId: string;
}

export const dailyForecasts = async ({ cityId }: ForecastsProps) => {
    try {
        const response = await axios.get(`https://api.ipma.pt/public-data/forecast/aggregate/${1090100}.json`);
        const forecastData = Object.values(response.data) as IPMAProps[];

        const currentDateTime = `${format(new Date(), 'yyyy-MM-dd')}T${format(new Date(), 'HH:00:00')}`;

        const nowInfo = forecastData.find(item => item.dataPrev === currentDateTime);
        const singleDayInfo = forecastData.filter(item => format(new Date(item.dataPrev), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'))[0];

        return {
            nowInfo,
            singleDayInfo
        };
    } catch (error) {
      console.error('[DAILY_FORECASTS_GET]:', error);
      throw error;
    }
};

export const weeklyForecast = async ({ cityId }: ForecastsProps) => {
    try {
        const forecast = await axios.get(`https://api.ipma.pt/public-data/forecast/aggregate/${cityId}.json`);
        const forecastToObject = Object.values(forecast);
        const extractedArray = forecastToObject.filter(item => Array.isArray(item))[0] as IPMAProps[];
        
        let currentWeek = extractedArray.filter((item: IPMAProps) => format(new Date(item.dataPrev), "yyyy-MM-dd") !== format(new Date(), "yyyy-MM-dd"));
        
        let dateAvarage: weeklyForecastProps[] = [];
        let datesAnalysed: Array<string> = [];
    
        currentWeek.map((data) => {
    
            if(!datesAnalysed.includes(format(new Date(data.dataPrev), "yyyy-MM-dd"))){
    
                const analyseDate = currentWeek.filter((item: IPMAProps) => format(new Date(item.dataPrev), "yyyy-MM-dd") === format(new Date(data.dataPrev), "yyyy-MM-dd"));
    
                // Calculate the sum and count of valid values
                let tMin = 99;
                let tMax = 0;
                let countTMed = 0;
                let sumIdTipoTempo = 0;
                let countIdTipoTempo = 0;
                let sumFFVento = 0;
                let countFFVento = 0;
                let sumProbabilidadePrecipita = 0;
                let countProbabilidadePrecipita = 0;
            
                analyseDate.forEach((item: IPMAProps) => {
    
                    if(item.tMed !== undefined){
                        if(parseFloat(item.tMed) > tMax){
                            tMax = parseFloat(item.tMed);
                        }
                        if(parseFloat(item.tMed) < tMin){
                            tMin = parseFloat(item.tMed);
                        }
                    }
    
                    if(item.idTipoTempo !== undefined){
                        console.log(item.idTipoTempo, item.dataPrev)
                        sumIdTipoTempo += item.idTipoTempo;
                        countIdTipoTempo++;
                    }
    
                    if(item.ffVento !== undefined){
                        sumFFVento += parseFloat(item.ffVento);
                        countFFVento++;
                    }
    
                    if (item.probabilidadePrecipita !== "-99.0") {
                        sumProbabilidadePrecipita += parseFloat(item.probabilidadePrecipita);
                        countProbabilidadePrecipita++;
                    }
                });
            
                // Calculate the averages
                const averageIdTipoTempo = sumIdTipoTempo / countIdTipoTempo;
                const averageFFVento = sumFFVento / countFFVento;
                const averageProbabilidadePrecipita = sumProbabilidadePrecipita / countProbabilidadePrecipita;
            
                // Store the averages in a different variable or perform further operations
                dateAvarage.push({
                    tMin: Math.round(tMin).toString(),
                    tMax: Math.round(tMax).toString(),
                    idTipoTempo: Math.round(averageIdTipoTempo),
                    ffVento: averageFFVento.toString(),
                    probabilidadePrecipita: Math.round(averageProbabilidadePrecipita).toString(),
                    dataPrev: data.dataPrev,
                });
            
                datesAnalysed.push(format(new Date(data.dataPrev), "yyyy-MM-dd"));
    
            }
    
        });

        return dateAvarage;

      } catch (error) {
        console.error('[WEEKLY_FORECASTS_GET]:', error);
        throw error;
      }
}