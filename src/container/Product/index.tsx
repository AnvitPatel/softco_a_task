import { useParams } from "react-router-dom";
import { StyleMainComponent } from "./style";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/storeConfig/store";
// import PageLoader from "../../components/PageLoader";
// import { getProductList } from "../../redux/slice/Slices/companySlice";
import { Modal } from "antd";
import dummy_user from "../../assets/leadership/dummy_user.jpeg";
import { ThemeContext } from "../../App/themeProvider";
import axios, { AxiosError } from "axios";
import PageLoader from "../../components/PageLoader";
const BASE_URL_API: string = import.meta.env.VITE_API_BASE_URL || "";
const ProductPage = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { theme } = useContext(ThemeContext);
  const params = useParams();
  const { access_token } = useSelector((state: RootState) => state?.auth);
  // const { productList } = useSelector((state: RootState) => state?.company);
  const [isLoading, setIsLoading] = useState(false);
  const [callStop, setCallStop] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [resolutionsPageData, setResolutionsPageData] = useState<{
    resolutions: {
      id?: number;
      company_id?: number;
      product_name: string;
      product_desc: string;
      product_image?: string | File | null | undefined;
    }[];
  }>({
    resolutions: [],
  });

  const loaderRef = useRef(null);

  const [modal, setModal] = useState<null | {
    id?: number;
    company_id?: number;
    product_name: string;
    product_desc: string;
    product_image?: string | File | null | undefined;
  }>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (page === 1) {
      apiCall1();
    }
  }, []);
  useEffect(() => {
    if (page > 1 && callStop === false) {
      apiCall();
    }
  }, [page]);
  const apiCall1 = async () => {
    if (!hasMore || isLoading) return;
    try {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            typeof access_token === "string" ? `Bearer ${access_token}` : "",
        },
      };
      const { data } = await axios.get(
        `${BASE_URL_API}/list/serve${`?search=${
          params.id
        }&per_page=${20}&page=${page}`}`,
        config
      );
      if (data?.count !== null) {
        const newResolutions = data?.results;

        if (newResolutions?.length > 0) {
          setResolutionsPageData((prevData) => ({
            ...prevData,
            resolutions: [...newResolutions], // Append new notifications
          }));

          // If the fetched notifications are less than the limit, stop further fetching
          if (newResolutions.length < 10) {
            setHasMore(false);
          }
        } else {
          setHasMore(false); // No more notifications to fetch
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };
  const apiCall = async () => {
    if (!hasMore || isLoading) return;
    try {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            typeof access_token === "string" ? `Bearer ${access_token}` : "",
        },
      };
      const { data } = await axios.get(
        `${BASE_URL_API}/list/serve${`?search=${
          params.id
        }&per_page=${20}&page=${page}`}`,
        config
      );
      if (data?.count !== null) {
        const newResolutions = data?.results;

        if (newResolutions?.length > 0) {
          setResolutionsPageData((prevData) => ({
            ...prevData,
            resolutions: [...prevData.resolutions, ...newResolutions], // Append new notifications
          }));

          // If the fetched notifications are less than the limit, stop further fetching
          if (newResolutions.length < 10) {
            setHasMore(false);
          }
        } else {
          setHasMore(false); // No more notifications to fetch
        }
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof AxiosError && error?.response?.status === 404) {
        setCallStop(true);
      }
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1); // Increment the page number to fetch the next set
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current); // Observe the loader div
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, isLoading]);
  // useEffect(() => {
  //   dispatch(getProductList(`?search=${params.id}&per_page=${200}&page=${1}`));
  // }, [dispatch, params.id]);

  return isLoading ? (
    <PageLoader />
  ) : (
    <StyleMainComponent theme={theme}>
      <div className="main_container">
        <div className="max-w-[1199px] m-auto px-[12px] mb-[1rem]">
          <div className="mt-[1rem]">
            <div className="flex flex-wrap gap-4">
              {resolutionsPageData.resolutions &&
                resolutionsPageData.resolutions.map((x, i) => (
                  <div>
                    <div
                      className="rounded-3xl h-[17.5rem] w-[17.5rem] cursor-pointer"
                      style={{
                        backgroundImage: `url(${x.product_image})`,
                        backgroundPosition: `center`,
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                      }}
                      key={i}
                      onClick={() => {
                        setModal(x);
                      }}
                    >
                      <div className="cardlinear h-full w-full flex justify-center items-end rounded-3xl">
                        <div className="py-[1rem] font-bold text-[1.5rem] text-white text-center select-none">
                          {x.product_name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div ref={loaderRef} className="flex justify-content-center mt-4">
            {isLoading && <div className="loader"></div>}
            {!hasMore && <p>No More Products</p>}
          </div>
        </div>
      </div>
      <Modal
        title="Product Details"
        centered
        open={modal !== null}
        footer={null}
        // onOk={() => setModal(false)}
        onCancel={() => setModal(null)}
        width={1000}
      >
        <div className="mt-[2rem]">
          <div className="imgBlock ">
            <img
              src={
                modal?.product_image
                  ? typeof modal.product_image === "string"
                    ? modal.product_image
                    : URL.createObjectURL(modal.product_image) // Create object URL if it's a File
                  : dummy_user
              }
              alt="A. M. Naik"
              className="w-[18rem] h-[18rem]"
            />
          </div>
          <div className="mt-[2rem] font-medium text-[16px]">
            {"Product Name: "}
            <span className="font-medium text-[20px]">
              {modal?.product_name}
            </span>
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: modal?.product_desc ?? "" }}
            className="text-[14px] mt-[0.5rem] text-justify"
          ></p>
        </div>
      </Modal>
    </StyleMainComponent>
  );
};
export default ProductPage;
