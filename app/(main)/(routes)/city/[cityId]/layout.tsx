const CityIdLayout = ({
    children,
    params
}: { children: React.ReactNode, params: { cityId: string }}) => {
    return ( 
        <div>
            {children}
        </div>
     );
}
 
export default CityIdLayout;