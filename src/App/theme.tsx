const Theme = {
  mainColor: "#3b55a3",
  // mainColor: "#fbc02d",
  baseColor: "#008dd2",
  adColor: "#0061a6",
  red: "#EA4335",
  green: "#34A853",
};

export { Theme };

// import axios from "axios";

// const BASE_URL_API: string = import.meta.env.VITE_API_BASE_URL || "";
// const BASE_GROUP_ID: string = import.meta.env.VITE_GROUP_ID || "";

// let mainColor = "#3b55a3";
// let baseColor = "#008dd2";

// const getColorApi = async () => {
//   try {
//     const { data } = await axios.get(
//       `${BASE_URL_API}/list/color?company_id=${BASE_GROUP_ID}`
//     );
//     if (data?.statusCode === 200) {
//       return data?.main_color;
//     }
//     return null;
//   } catch (error) {
//     console.log(error);
//     return null; // Return null in case of error
//   }
// };
// const getColorApi2 = async () => {
//   try {
//     const { data } = await axios.get(
//       `${BASE_URL_API}/list/color?company_id=${BASE_GROUP_ID}`
//     );
//     if (data?.statusCode === 200) {
//       return data?.base_color;
//     }
//     return null;
//   } catch (error) {
//     console.log(error);
//     return null; // Return null in case of error
//   }
// };

// const initializeColor = async () => {
//   const color = await getColorApi();
//   mainColor = color || "#3b55a3";
// };
// const initializeColorBase = async () => {
//   const color = await getColorApi2();
//   baseColor = color || "#008dd2";
// };

// initializeColor();
// initializeColorBase();
// console.log(mainColor, "mainColor");

// const Theme = {
//   mainColor,
//   baseColor,
//   adColor: "#0061a6",
//   red: "#EA4335",
//   green: "#34A853",
// };

// export { Theme, initializeColor, initializeColorBase };
