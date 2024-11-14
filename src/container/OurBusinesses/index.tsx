import { StyleMainComponent } from "./style";
// import { Theme } from "../../App/theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/storeConfig/store";
import { useContext, useEffect } from "react";
import { getCompanyList } from "../../redux/slice/Slices/companySlice";
import PageLoader from "../../components/PageLoader";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../App/themeProvider";
import { message } from "antd";
// import slider_2 from "../../assets/sliderImages/slider-2.jpg";
const BASE_GROUP_ID: string = import.meta.env.VITE_GROUP_ID || "";
const OurBusinesses = () => {
  const { theme } = useContext(ThemeContext);
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, companyListData } = useSelector(
    (state: RootState) => state?.company
  );
  useEffect(() => {
    dispatch(getCompanyList(`?per_page=100&page=1`));
  }, [dispatch]);
  // console.log(params.id);

  return isLoading ? (
    <PageLoader />
  ) : (
    <StyleMainComponent theme={theme}>
      <div className="main_container">
        <div className="mt-[1rem] bg-[#f6f6f6]">
          <div className="max-w-[1199px] m-auto px-[12px] py-[1.5rem] sm:text-[40px] text-[25px] font-light text-[#535353]">
            Our Businesses
          </div>
        </div>
        <div className="mt-[1rem]">
          <div className="max-w-[1199px] m-auto px-[12px] mb-[1rem]">
            <div className="mt-[1rem] grid gap-x-8 gap-y-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {companyListData &&
                companyListData.map((a, i) =>
                  (params.id && a.id?.toString() === params.id) ||
                  (!params.id && a.id?.toString() === BASE_GROUP_ID) ? (
                    <></>
                  ) : (
                    <div
                      className="contentDiv_ourBusinesses md:w-full md:max-w-full max-w-[25rem] m-auto"
                      key={i}
                    >
                      <img
                        src={a?.document ? a?.document : ""}
                        className="w-full"
                      />
                      <div className="OverBgBlue2 h-[15rem] relative">
                        <div className="text-white text-[20px] font-semibold">
                          {a?.name}
                        </div>
                        <div className="content_ourBusinesses text-white text-[12px] font-normal mt-[0.5rem]">
                          {a?.document_description}
                        </div>
                        <div className="absolute" style={{ bottom: "18px" }}>
                          <div className="w-full mt-3 view-Button">
                            <div
                              className="flex w-[8rem] cursor-pointer"
                              onClick={() => {
                                if (a?.status === true) {
                                  BASE_GROUP_ID === a?.id?.toString()
                                    ? navigate(`/home`)
                                    : navigate(`/home/${a?.id}`);
                                } else {
                                  message.success("Company coming soon.....");
                                }
                              }}
                            >
                              <div
                                className={`h-[2.2rem] w-full flex items-center justify-center text-white text-[14px]`}
                                style={{ backgroundColor: theme.baseColor }}
                              >
                                More
                              </div>
                              <div
                                className={`h-[2.2rem] w-[3rem] pr-[3rem]`}
                                style={{ backgroundColor: theme.baseColor }}
                              >
                                <div className="round">
                                  <div id="cta">
                                    <span className="arrow primera next "></span>
                                    <span className="arrow segunda next "></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="OverBgBlue">
                        <div className="text-white text-[20px] font-semibold">
                          {a?.name}
                        </div>
                        <div className="content_ourBusinesses text-white text-[12px] font-normal mt-[0.5rem]">
                          {a?.document_description}
                        </div>
                        <div className="">
                          <div className="w-full mt-3 view-Button">
                            <div
                              className="flex w-[8rem] cursor-pointer"
                              onClick={() => {
                                BASE_GROUP_ID === a?.id?.toString()
                                  ? navigate(`/home`)
                                  : navigate(`/home/${a?.id}`);
                              }}
                            >
                              <div
                                className={`h-[2.2rem] w-full flex items-center justify-center text-white text-[14px]`}
                                style={{ backgroundColor: theme.baseColor }}
                              >
                                More
                              </div>
                              <div
                                className={`h-[2.2rem] w-[3rem] pr-[3rem]`}
                                style={{ backgroundColor: theme.baseColor }}
                              >
                                <div className="round">
                                  <div id="cta">
                                    <span className="arrow primera next "></span>
                                    <span className="arrow segunda next "></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  )
                )}
              {/* <div className="contentDiv_ourBusinesses md:w-full md:max-w-full max-w-[25rem] m-auto">
                <img src={slider_1} className="object-cover w-full h-[16rem]" />
                <div className="OverBgBlue">
                  <div className="text-white text-[20px] font-semibold ">
                    Slexo Packaging
                  </div>
                  <div className="content_ourBusinesses text-white text-[14px] font-normal mt-[0.5rem]">
                    Slexo Packaging, India's largest construction organisation
                    and ranked among the world's top contractors, has been over
                    the past seven decades transforming cityscapes and
                    landscapes with structures of immense size and grandeur.
                  </div>
                  <div className="">
                    <div className="w-full mt-3 view-Button">
                      <div
                        className="flex w-[8rem] cursor-pointer"
                        // onClick={() => {
                        //   navigate("/leadership/leadership-view");
                        // }}
                      >
                        <div
                          className={`h-[2.2rem] w-full flex items-center justify-center bg-[${Theme.baseColor}] text-white text-[14px]`}
                        >
                          More
                        </div>
                        <div
                          className={`h-[2.2rem] w-[3rem] bg-[${Theme.baseColor}] pr-[3rem]`}
                        >
                          <div className="round">
                            <div id="cta">
                              <span className="arrow primera next "></span>
                              <span className="arrow segunda next "></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="contentDiv_ourBusinesses md:w-full md:max-w-full max-w-[25rem] m-auto">
                <img src={slider_1} className="object-cover w-full h-[16rem]" />
                <div className="OverBgBlue">
                  <div className="text-white text-[20px] font-semibold ">
                    Slexo Packaging
                  </div>
                  <div className="content_ourBusinesses text-white text-[14px] font-normal mt-[0.5rem]">
                    Slexo Packaging, India's largest construction organisation
                    and ranked among the world's top contractors, has been over
                    the past seven decades transforming cityscapes and
                    landscapes with structures of immense size and grandeur.
                  </div>
                  <div className="">
                    <div className="w-full mt-3 view-Button">
                      <div
                        className="flex w-[8rem] cursor-pointer"
                        // onClick={() => {
                        //   navigate("/leadership/leadership-view");
                        // }}
                      >
                        <div
                          className={`h-[2.2rem] w-full flex items-center justify-center bg-[${Theme.baseColor}] text-white text-[14px]`}
                        >
                          More
                        </div>
                        <div
                          className={`h-[2.2rem] w-[3rem] bg-[${Theme.baseColor}] pr-[3rem]`}
                        >
                          <div className="round">
                            <div id="cta">
                              <span className="arrow primera next "></span>
                              <span className="arrow segunda next "></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className=" w-[24rem]">
                <img
                  src={slider_1}
                  className="object-cover w-[24rem] h-[16rem]"
                />

              </div>
              <div className=" w-[24rem]">
                <img
                  src={slider_1}
                  className="object-cover w-[24rem] h-[16rem]"
                />
              </div> */}
              {/* <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div>
              <div className="border border-black"></div> */}
            </div>
          </div>
        </div>
      </div>
    </StyleMainComponent>
  );
};
export default OurBusinesses;
