import React, { createContext, useState, useEffect } from "react";
import { RootState } from "../redux/storeConfig/store";
import { useSelector } from "react-redux";
// const BASE_URL_API: string = import.meta.env.VITE_API_BASE_URL || "";
// const BASE_GROUP_ID: string = import.meta.env.VITE_GROUP_ID || "";
// Define your theme type
type ThemeType = {
  mainColor: string;
  baseColor: string;
  adColor: string;
  red: string;
  green: string;
};

// Initial theme object
const defaultTheme: ThemeType = {
  mainColor: "#3b55a3",
  baseColor: "#008dd2",
  adColor: "#0061a6",
  red: "#EA4335",
  green: "#34A853",
};

// Create Theme Context
export const ThemeContext = createContext<{
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
}>({
  theme: defaultTheme,
  setTheme: () => {},
});

// ThemeProvider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);
  const { infoDataID } = useSelector((state: RootState) => state?.company);
  useEffect(() => {
    if (infoDataID && infoDataID[0]?.id) {
      setTheme({
        ...theme,
        mainColor: infoDataID[0].main_color
          ? infoDataID[0].main_color
          : "#3b55a3",
        baseColor: infoDataID[0].base_color
          ? infoDataID[0].base_color
          : "#008dd2",
      });
    }
    // Simulate API call to fetch theme
    // const fetchTheme = async () => {
    //   const response = await fetch(
    //     `${BASE_URL_API}/list/color?company_id=${BASE_GROUP_ID}`
    //   ); // Replace with actual API
    //   debugger;
    //   const data = await response.json();
    //   setTheme(data); // Set theme dynamically from API response
    // // };
    // fetchTheme();
  }, [infoDataID]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
