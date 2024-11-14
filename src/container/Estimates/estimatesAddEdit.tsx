import { Button, Col, Input, InputNumber, Row, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/storeConfig/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { projectGet } from "../../redux/slice/Slices/projectSlice";
import { Minus, Plus } from "lucide-react";
import { message } from "antd";
import moment from "moment";
import {
  estimateGet,
  estimateRequest,
  estimateUpdate,
  sendData,
} from "../../redux/slice/Slices/estimateSlice";
interface IFormValues {
  id?: string | null;
  userID?: string | null;
  project: string | null;
  client: string;
  status: string | null;
  createdDate: string | null;
}
interface ITemsArray {
  id: string;
  mainItemName: string;
  mainTotalPrice: number | null;
  items: [
    {
      itemsId: string;
      item: string;
      desc: string;
      unit: string;
      quantity: number | null;
      price: number | null;
      margin: number | null;
      mainPrice: number | null;
    }
  ];
}
const EstimatesAddEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state?.auth);
  const { projects } = useSelector((state: RootState) => state?.project);
  const { isCreated, estimateList } = useSelector(
    (state: RootState) => state?.estimate
  );
  const [projectDropDown, setProjectDropDown] = useState<
    { value: string; label: string }[]
  >([]);
  const [mainEstimate, setMainEstimate] = useState<ITemsArray[]>([
    {
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      mainItemName: "",
      mainTotalPrice: null,
      items: [
        {
          itemsId: `IT-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          item: "",
          desc: "",
          unit: "",
          quantity: null,
          price: null,
          margin: null,
          mainPrice: null,
        },
      ],
    },
  ]);
  useEffect(() => {
    dispatch(projectGet(userData?.id ? userData?.id : ""));
  }, [dispatch]);
  useEffect(() => {
    if (params.id) {
      dispatch(estimateGet(userData?.id ? userData?.id : ""));
    }
  }, [params.id]);
  useEffect(() => {
    if (isCreated) {
      navigate("/estimates");
    }
  }, [isCreated]);
  useEffect(() => {
    if (projects) {
      const setDropDown: { value: string; label: string }[] = [];
      projects.forEach((x) => {
        setDropDown.push({ value: x.projectName, label: x.projectName });
      });
      setProjectDropDown(setDropDown);
    }
  }, [projects]);
  useEffect(() => {
    if (estimateList && params.id) {
      const collect: sendData | undefined = estimateList.find(
        (x) => x.id === params.id
      );
      if (collect) {
        setValue("id", collect?.id);
        setValue("project", collect?.project);
        setValue("client", collect?.client);
        setValue("status", collect?.status);
        setValue("createdDate", collect?.createdDate);
        setMainEstimate(collect?.mainItemsDetail);
      }
    }
  }, [estimateList]);
  const defaultValues = {
    id: null,
    project: null,
    client: "",
    status: null,
    createdDate: null,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormValues>({ defaultValues });
  const onSubmit = (_data: IFormValues) => {
    const collectAllData = [...mainEstimate];

    const firstCheck = collectAllData.findIndex(
      (x) => x.mainItemName === "" || x.mainTotalPrice === null
    );
    if (firstCheck === -1) {
      const secondCheck = collectAllData.every((entry) =>
        entry.items.every(
          (item) =>
            item.mainPrice !== null &&
            item.item !== null &&
            item.item !== "" &&
            item.desc !== null &&
            item.desc !== "" &&
            item.unit !== null &&
            item.unit !== ""
        )
      );
      if (secondCheck) {
        const sendData = {
          id: _data.id
            ? _data.id
            : `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          client: _data?.client,
          project: _data?.project,
          status: _data?.status,
          userID: userData?.id,
          createdDate: _data?.createdDate
            ? _data?.createdDate
            : moment().format("DD MMM YYYY"),
          updatedDate: moment().format("DD MMM YYYY"),
          mainItemsDetail: collectAllData,
        };
        _data?.id === null && dispatch(estimateRequest(sendData));
        _data?.id !== null && dispatch(estimateUpdate(sendData));
      } else {
        message.error("please fill all details");
      }
    } else {
      message.error("please fill sample section or price is empty");
    }
    // let sendData = {
    //   ..._data,
    //   id: _data.id
    //     ? _data.id
    //     : `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    //   userID: userData?.id,
    // };
    // _data.id === null && dispatch(projectRequest(sendData));
    // _data.id !== null && dispatch(projectUpdate(sendData));
    // setSubmitted(true);
    // setTimeout(() => {
    //   setSubmitted(false);
    // }, 5000);
  };
  const subtotalCalculate = (data: ITemsArray[]) => {
    const totalMainTotalPrice = data.reduce((total, item) => {
      // Sum up each mainTotalPrice if it’s not null or undefined
      if (item.mainTotalPrice != null) {
        const collectSub = item.items.reduce((mtotal, mitem) => {
          if (mitem.quantity && mitem.price) {
            const totalQuantity = mitem.quantity || 0;
            const totalPrice = mitem.price || 0;
            const mul = totalQuantity * totalPrice;

            return mtotal + mul;
          }
          return mtotal;
        }, 0);

        return total + parseFloat(collectSub.toFixed(2));
      }
      return total;
    }, 0);
    const formattedTotal = Number(totalMainTotalPrice.toFixed(2));
    return formattedTotal;
  };

  const marginTotalCalculate = (data: ITemsArray[]) => {
    const totalMainTotalPrice = data.reduce((total, item) => {
      const collectSub = item.items.reduce((mtotal, mitem) => {
        if (mitem.quantity && mitem.price) {
          const totalQuantity = mitem.quantity || 0;
          const totalPrice = mitem.price || 0; // Corrected to mitem.price
          const mul = totalQuantity * totalPrice;

          // Calculate margin, capping at 100
          const mar = mitem.margin != null ? Math.min(mitem.margin, 100) : 0;
          const margin = (mar / 100) * mul;

          return mtotal + margin; // Accumulate margin
        }
        return mtotal;
      }, 0);

      return total + parseFloat(collectSub.toFixed(2)); // Accumulate collectSub with rounding
    }, 0);

    const formattedTotal = Number(totalMainTotalPrice.toFixed(2));
    return formattedTotal;
  };

  return (
    <div className="p-5">
      <h1 className="font-semibold text-3xl">
        {params.id ? "Edit Estimate" : "Add New Estimate"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 mt-3 p-3 rounded-xl">
          <Row gutter={20}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
              <div className="my-[0.5rem]">
                <label>{"Customer"}</label>
                <Controller
                  name="project"
                  control={control}
                  rules={{
                    required: "Please select project.",
                  }}
                  render={({ field }) => (
                    <Select
                      showSearch
                      value={field.value}
                      placeholder="Select Project"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      options={projectDropDown}
                      className={` ${
                        errors["project"]
                          ? "errorBorderSelect errorShadowSelect"
                          : ""
                      } w-full mt-[0.3rem]`}
                      status="error"
                      size="large"
                    />
                  )}
                />
                {errors["project"] && (
                  <div className="errorText">{errors["project"].message}</div>
                )}
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
              <div className="my-[0.5rem]">
                <label>{"Client"}</label>
                <Controller
                  name="client"
                  control={control}
                  rules={{
                    required: "Please enter client.",
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="client"
                      name="client"
                      placeholder="Enter Client"
                      value={field.value}
                      className={` ${
                        errors["client"] ? "errorBorder errorShadow" : ""
                      } mt-[0.3rem]`}
                      size="large"
                    />
                  )}
                />
                {errors["client"] && (
                  <div className="errorText">{errors["client"].message}</div>
                )}
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
              <div className="my-[0.5rem]">
                <label>{"Status"}</label>
                <Controller
                  name="status"
                  control={control}
                  rules={{
                    required: "Please select status.",
                  }}
                  render={({ field }) => (
                    <Select
                      showSearch
                      value={field.value}
                      placeholder="Select Status"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      options={[
                        { value: "Created", label: "Created" },
                        { value: "Processing", label: "Processing" },
                        { value: "Rejected", label: "Rejected" },
                        { value: "In Transit", label: "In Transit" },
                        { value: "On Hold", label: "On Hold" },
                      ]}
                      className={` ${
                        errors["status"]
                          ? "errorBorderSelect errorShadowSelect"
                          : ""
                      } w-full mt-[0.3rem]`}
                      status="error"
                      size="large"
                    />
                  )}
                />
                {errors["status"] && (
                  <div className="errorText">{errors["status"].message}</div>
                )}
              </div>
            </Col>
          </Row>
        </div>
        <div className="py-5 bg-[#ffff] border mt-1 rounded-xl">
          <div className="flex border-b pb-3">
            <div className="w-full text-center">ITEM</div>
            <div className="w-full text-center">DESCRIPTION</div>
            <div className="w-full text-center">UNIT</div>
            <div className="w-full text-center">QUANTITY</div>
            <div className="w-full text-center">{"PRICE ($)"}</div>
            <div className="w-full text-center">{"MARGIN (+/-)"}</div>
          </div>
          <div className="px-3 py-4">
            {mainEstimate.map((x, i) => (
              <>
                <div className="border border-black mt-5" key={i + "div"}></div>
                <div
                  className="flex items-center w-full mb-4"
                  style={{ marginTop: "-1.4rem" }}
                >
                  <div
                    className="bg-black text-white rounded-full cursor-pointer"
                    onClick={() => {
                      const dataCollect = [...mainEstimate];
                      dataCollect.push({
                        id: `${Date.now()}-${Math.floor(
                          Math.random() * 10000
                        )}`,
                        mainItemName: "",
                        mainTotalPrice: null,
                        items: [
                          {
                            itemsId: `IT-${Date.now()}-${Math.floor(
                              Math.random() * 10000
                            )}`,
                            item: "",
                            desc: "",
                            unit: "",
                            quantity: null,
                            price: null,
                            margin: null,
                            mainPrice: null,
                          },
                        ],
                      });
                      setMainEstimate(dataCollect);
                    }}
                  >
                    <Plus />
                  </div>
                  <div className="w-[13rem] ml-[2.5rem]">
                    <Input
                      value={x.mainItemName}
                      size="large"
                      placeholder="Sample section"
                      onChange={(e) => {
                        const dataCollect = [...mainEstimate];
                        const checkIndex = dataCollect.findIndex(
                          (a) => a.id === x.id
                        );
                        dataCollect[checkIndex].mainItemName = e.target.value;
                        setMainEstimate(dataCollect);
                      }}
                    />
                  </div>
                  <div className=" w-[13rem]  ml-auto">
                    <InputNumber
                      value={x.mainTotalPrice}
                      size="large"
                      className="w-full dollar_input"
                      controls={false}
                      addonAfter="$"
                    />
                  </div>
                </div>
                {x.items.map((y, j) => (
                  <div
                    className="flex items-center pl-[4rem] gap-3 py-2"
                    key={j + "flexDiv"}
                  >
                    <div className="w-[10rem]">
                      <Input
                        value={y.item}
                        size="large"
                        placeholder="Item Name"
                        onChange={(e) => {
                          const dataCollect = [...mainEstimate];
                          const checkIndex = dataCollect.findIndex(
                            (a) => a.id === x.id
                          );
                          const checkIndex2 = dataCollect[
                            checkIndex
                          ]?.items.findIndex((a) => a.itemsId === y.itemsId);
                          dataCollect[checkIndex].items[checkIndex2].item =
                            e.target.value;
                          setMainEstimate(dataCollect);
                        }}
                      />
                    </div>
                    <div className="w-[10rem]">
                      <Input
                        value={y.desc}
                        size="large"
                        placeholder="Item Description"
                        onChange={(e) => {
                          const dataCollect = [...mainEstimate];
                          const checkIndex = dataCollect.findIndex(
                            (a) => a.id === x.id
                          );
                          const checkIndex2 = dataCollect[
                            checkIndex
                          ]?.items.findIndex((a) => a.itemsId === y.itemsId);
                          dataCollect[checkIndex].items[checkIndex2].desc =
                            e.target.value;
                          setMainEstimate(dataCollect);
                        }}
                      />
                    </div>
                    <div className="w-[7rem]">
                      <Input
                        value={y.unit}
                        size="large"
                        placeholder="Unit"
                        onChange={(e) => {
                          const dataCollect = [...mainEstimate];
                          const checkIndex = dataCollect.findIndex(
                            (a) => a.id === x.id
                          );
                          const checkIndex2 = dataCollect[
                            checkIndex
                          ]?.items.findIndex((a) => a.itemsId === y.itemsId);
                          dataCollect[checkIndex].items[checkIndex2].unit =
                            e.target.value;
                          setMainEstimate(dataCollect);
                        }}
                      />
                    </div>
                    <div className="w-[7rem]">
                      <InputNumber
                        value={y.quantity}
                        size="large"
                        placeholder="Quantity"
                        controls={false}
                        className="w-full"
                        onChange={(e) => {
                          const dataCollect = [...mainEstimate];
                          const checkIndex = dataCollect.findIndex(
                            (a) => a.id === x.id
                          );
                          const checkIndex2 = dataCollect[
                            checkIndex
                          ]?.items.findIndex((a) => a.itemsId === y.itemsId);
                          dataCollect[checkIndex].items[checkIndex2].quantity =
                            e;
                          if (y.price && y.price > 0 && e && e > 0) {
                            let mul = e * y.price;
                            let margin =
                              ((y.margin ? y.margin : 0) / 100) * mul;
                            dataCollect[checkIndex].items[
                              checkIndex2
                            ].mainPrice = Number((mul + margin).toFixed(2));
                          } else {
                            dataCollect[checkIndex].items[
                              checkIndex2
                            ].mainPrice = null;
                          }
                          dataCollect[checkIndex].mainTotalPrice = parseFloat(
                            dataCollect[checkIndex].items
                              .reduce((total, item) => {
                                if (item.mainPrice != null) {
                                  total += item.mainPrice;
                                }
                                return total;
                              }, 0)
                              .toFixed(2)
                          );
                          setMainEstimate(dataCollect);
                        }}
                      />
                    </div>
                    <div className="w-[9rem]">
                      <InputNumber
                        value={y.price}
                        size="large"
                        placeholder="Price"
                        className="w-full"
                        controls={false}
                        onChange={(e) => {
                          const dataCollect = [...mainEstimate];
                          const checkIndex = dataCollect.findIndex(
                            (a) => a.id === x.id
                          );
                          const checkIndex2 = dataCollect[
                            checkIndex
                          ]?.items.findIndex((a) => a.itemsId === y.itemsId);
                          dataCollect[checkIndex].items[checkIndex2].price = e;
                          if (y.quantity && y.quantity > 0 && e && e > 0) {
                            let mul = y.quantity * e;
                            let margin =
                              ((y.margin ? y.margin : 0) / 100) * mul;
                            dataCollect[checkIndex].items[
                              checkIndex2
                            ].mainPrice = Number((mul + margin).toFixed(2));
                          } else {
                            dataCollect[checkIndex].items[
                              checkIndex2
                            ].mainPrice = null;
                          }
                          dataCollect[checkIndex].mainTotalPrice = parseFloat(
                            dataCollect[checkIndex].items
                              .reduce((total, item) => {
                                if (item.mainPrice != null) {
                                  total += item.mainPrice;
                                }
                                return total;
                              }, 0)
                              .toFixed(2)
                          );
                          setMainEstimate(dataCollect);
                        }}
                      />
                    </div>
                    <div className="w-[9rem]">
                      <InputNumber
                        value={y.margin}
                        size="large"
                        placeholder="Margin"
                        step="0.00"
                        className="w-full dollar_input"
                        onChange={(e) => {
                          const dataCollect = [...mainEstimate];
                          const checkIndex = dataCollect.findIndex(
                            (a) => a.id === x.id
                          );
                          const checkIndex2 = dataCollect[
                            checkIndex
                          ]?.items.findIndex((a) => a.itemsId === y.itemsId);
                          dataCollect[checkIndex].items[checkIndex2].margin =
                            e && e > 100 ? 100.0 : e;

                          if (
                            y.quantity &&
                            y.quantity > 0 &&
                            y.price &&
                            y.price > 0
                          ) {
                            let mul = y.quantity * y.price;
                            let mar = e && e > 100 ? 100.0 : e ? e : 0;
                            let margin = (mar / 100) * mul;
                            dataCollect[checkIndex].items[
                              checkIndex2
                            ].mainPrice = Number((mul + margin).toFixed(2));
                          } else {
                            dataCollect[checkIndex].items[
                              checkIndex2
                            ].mainPrice = null;
                          }
                          dataCollect[checkIndex].mainTotalPrice = parseFloat(
                            dataCollect[checkIndex].items
                              .reduce((total, item) => {
                                if (item.mainPrice != null) {
                                  total += item.mainPrice;
                                }
                                return total;
                              }, 0)
                              .toFixed(2)
                          );
                          setMainEstimate(dataCollect);
                        }}
                        controls={false}
                        addonAfter="%"
                      />
                    </div>
                    <div className="w-[10rem]">
                      <InputNumber
                        value={y.mainPrice}
                        step="0.00"
                        size="large"
                        placeholder="Total"
                        className="w-full"
                        controls={false}
                      />
                    </div>
                    <div className="flex items-center gap-5">
                      <div
                        className="bg-black text-white rounded-full cursor-pointer"
                        onClick={() => {
                          const dataCollect = [...mainEstimate];
                          if (dataCollect[i].items.length - 1 === j) {
                            if (
                              y.desc &&
                              y.item &&
                              y.mainPrice &&
                              y.price &&
                              y.quantity &&
                              y.unit
                            ) {
                              dataCollect[i].items.push({
                                itemsId: `IT-${Date.now()}-${Math.floor(
                                  Math.random() * 10000
                                )}`,
                                item: "",
                                desc: "",
                                unit: "",
                                quantity: null,
                                price: null,
                                margin: null,
                                mainPrice: null,
                              });
                              setMainEstimate(dataCollect);
                            } else {
                              message.error("please fill all fields");
                            }
                          }
                        }}
                      >
                        <Plus />
                      </div>
                      <div
                        className="bg-slate-300 text-black rounded-full cursor-pointer"
                        onClick={() => {
                          const dataCollect = [...mainEstimate];
                          if (
                            dataCollect.length === 1 &&
                            dataCollect[i].items.length === 1
                          ) {
                            message.error("Ablest one row is compulsory");
                          } else {
                            dataCollect[i].items.splice(j, 1);
                            let leg = dataCollect[i]?.items.length ?? 0;

                            if (leg <= 0) {
                              dataCollect.splice(i, 1);
                            }
                            if (dataCollect[i]) {
                              dataCollect[i].mainTotalPrice = parseFloat(
                                dataCollect[i].items
                                  .reduce((total, item) => {
                                    if (item.mainPrice != null) {
                                      total += item.mainPrice;
                                    }
                                    return total;
                                  }, 0)
                                  .toFixed(2)
                              );
                            }
                            setMainEstimate(dataCollect);
                          }
                        }}
                      >
                        <Minus />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ))}
          </div>
          <div className="w-[25rem]  ml-auto px-3">
            <div className="flex items-center p-[10px] border-t border-gray-500">
              <div className="w-15rem">sub Total</div>
              <div className="w-15rem ml-auto">
                $ {subtotalCalculate(mainEstimate).toFixed(2)}
              </div>
            </div>
            <div className="flex items-center p-[10px] border-t border-gray-500">
              <div className="w-15rem">Total margin</div>
              <div className="w-15rem ml-auto">
                $ {marginTotalCalculate(mainEstimate).toFixed(2)}
              </div>
            </div>
            <div className="flex items-center p-[10px] border-t border-gray-500">
              <div className="w-15rem">Total amount</div>
              <div className="w-15rem ml-auto">
                ${" "}
                {(
                  subtotalCalculate(mainEstimate) +
                  marginTotalCalculate(mainEstimate)
                ).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex gap-4 my-4 px-3 justify-end">
            <Button
              htmlType="submit"
              size={"large"}
              onClick={() => navigate("/estimates")}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              size={"large"}
              type="primary"
              className=""
            >
              {"Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EstimatesAddEdit;
