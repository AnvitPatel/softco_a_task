import { StyleComponent } from "./style";

// import LoadingPage from "../../assets/loadingpage.gif";
import Slexo_group_of_Company_Loader from "../../assets/Slexo_group_of_Company_Loader.gif";
import { RootState } from "../../redux/storeConfig/store";
import { useSelector } from "react-redux";
const PageLoader = () => {
  const { login } = useSelector((state: RootState) => state?.auth);
  const { infoDataID } = useSelector((state: RootState) => state?.company);
  return (
    // <div className="max-w-[1199px] md:flex items-center m-auto px-[12px]">
    <StyleComponent>
      <img
        src={
          infoDataID && infoDataID[0]?.company_loader && login === false
            ? infoDataID[0]?.company_loader
            : Slexo_group_of_Company_Loader
        }
        alt="load"
        style={{ height: "30rem" }}
      />
    </StyleComponent>
    // </div>
  );
};
export default PageLoader;
