export const currentCity = () => {
    try {
      const serializedData = sessionStorage.getItem('city');
      if (serializedData) {
        const data = JSON.parse(serializedData);
        return data;
      }
    } catch (error) {
      console.error('[CURRENT_CITY_GETITEM]', error);
      return { name: "Undefined", cityId: "Undefined" };
    }
  };
  

export const setCity = ({
    name, cityId
}: { name: string, cityId: string }) => {
    try {
        const data = { name: name, cityId: cityId };
        const serializedData = JSON.stringify(data);
        sessionStorage.setItem('city', serializedData);
    } catch (error) {
        console.error('[SET_CITY_SETITEM]', error);
        return null;
    }
}