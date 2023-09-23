"use client"

import { cities } from "@/data/original";
export default function Home() {

  const changeId = ({cityId, level}: { cityId: string, level: string }) => {
    let newCode =  cityId;

    if ( level === "2" && cityId.length === 3){
        newCode = "10" + newCode + "00";
    }

    if ( level === "2" && cityId.length === 4){
        newCode = "1" + newCode + "00";
    }

    if ( level === "3" && cityId.length === 5){
        newCode = "10" + newCode.slice(0, -2) + "00";
    }

    if ( level === "3" && cityId.length === 6){
        newCode = "1" + newCode.slice(0, -2) + "00";
    }

    return newCode;
}


  // Filter and modify the data
  const modifiedCities = cities
    .filter((city) => city.level !== 1)
    .map((city) => ({
      ...city,
      code: changeId({cityId: city.code.toString(), level: city.level.toString()}),
    }))
    .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

  // Convert the modified data back to JSON
  const modifiedData = JSON.stringify(modifiedCities, null, 2);

  console.log(modifiedData);

  return (
    <div>
      Hello!
    </div>
  )
}
