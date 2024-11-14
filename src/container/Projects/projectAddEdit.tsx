import { Controller, useForm } from "react-hook-form";
import { StyleMainComponent } from "./style";
import { Button, Col, DatePicker, Input, InputNumber, Row, Select } from "antd";
// import moment from "moment";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/storeConfig/store";
import {
  projectGet,
  projectRequest,
  projectUpdate,
} from "../../redux/slice/Slices/projectSlice";
import { useEffect } from "react";
interface IFormValues {
  id?: string | null;
  userID?: string | null;
  customer: string | null;
  referenceNumber: string;
  projectName: string;
  projectNumber: string;
  areaLocation: string;
  address: string;
  dueDate: string;
  contact: string | null;
  manager: string;
  staff: string;
  status: string;
  email: string;
}
const ProjectsAddEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state?.auth);
  const { isCreated, projects } = useSelector(
    (state: RootState) => state?.project
  );
  useEffect(() => {
    if (params.id) {
      dispatch(projectGet(userData?.id ? userData?.id : ""));
    }
  }, [params.id]);
  useEffect(() => {
    if (projects && params.id) {
      const collect:
        | {
            id?: string | null;
            userID?: string | null;
            customer: string | null;
            referenceNumber: string;
            projectName: string;
            projectNumber: string;
            areaLocation: string;
            address: string;
            dueDate: string;
            contact: string | null;
            manager: string;
            staff: string;
            status: string;
            email: string;
          }
        | undefined = projects.find((x) => x.id === params.id);
      if (collect) {
        setValue("id", collect?.id);
        setValue("customer", collect?.customer);
        setValue("referenceNumber", collect?.referenceNumber);
        setValue("projectName", collect?.projectName);
        setValue("projectNumber", collect?.projectNumber);
        setValue("areaLocation", collect?.areaLocation);
        setValue("address", collect?.address);
        setValue("dueDate", collect?.dueDate);
        setValue("contact", collect?.contact);
        setValue("manager", collect?.manager);
        setValue("staff", collect?.staff);
        setValue("status", collect?.status);
        setValue("email", collect?.email);
      }
    }
  }, [projects]);
  const defaultValues = {
    id: null,
    customer: null,
    referenceNumber: "",
    projectName: "",
    projectNumber: "",
    areaLocation: "",
    address: "",
    dueDate: "",
    contact: "",
    manager: "",
    staff: "",
    status: "",
    email: "",
  };
  useEffect(() => {
    if (isCreated) {
      navigate("/projects");
    }
  }, [isCreated]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormValues>({ defaultValues });
  const onSubmit = (_data: IFormValues) => {
    let sendData = {
      ..._data,
      id: _data.id
        ? _data.id
        : `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      userID: userData?.id,
    };

    _data.id === null && dispatch(projectRequest(sendData));
    _data.id !== null && dispatch(projectUpdate(sendData));
    // setSubmitted(true);
    // setTimeout(() => {
    //   setSubmitted(false);
    // }, 5000);
  };
  return (
    <StyleMainComponent>
      <div className="p-5">
        <h1 className="font-semibold text-3xl">
          {params.id ? "Edit Project" : "Add New Project"}
        </h1>
        <div className="p-5 bg-[#ffff] border mt-3 p-3 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={20}>
              <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
                <div className="my-[0.5rem]">
                  <label>{"Customer"}</label>
                  <Controller
                    name="customer"
                    control={control}
                    rules={{
                      required: "Please select customer.",
                    }}
                    render={({ field }) => (
                      <Select
                        showSearch
                        value={field.value}
                        placeholder="Search to Select"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        options={[
                          { value: "olivia martin", label: "olivia martin" },
                          { value: "michael jones", label: "michael jones" },
                          { value: "john doe", label: "john doe" },
                          { value: "ella lewis", label: "ella lewis" },
                          {
                            value: "james rodriguez",
                            label: "james rodriguez",
                          },
                          {
                            value: "isabella anderson",
                            label: "isabella anderson",
                          },
                          { value: "sarah williams", label: "sarah williams" },
                          {
                            value: "sophia hernandez",
                            label: "sophia hernandez",
                          },
                          { value: "sarah williams", label: "sarah williams" },
                          {
                            value: "sophia hernandez",
                            label: "sophia hernandez",
                          },
                        ]}
                        className={` ${
                          errors["customer"]
                            ? "errorBorderSelect errorShadowSelect"
                            : ""
                        } w-full mt-[0.3rem]`}
                        status="error"
                        size="large"
                      />
                    )}
                  />
                  {errors["customer"] && (
                    <div className="errorText">
                      {errors["customer"].message}
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
                <div className="my-[0.5rem]">
                  <label>{"Reference Number"}</label>
                  <Controller
                    name="referenceNumber"
                    control={control}
                    rules={{
                      required: "Please enter Reference Number.",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="referenceNumber"
                        name="referenceNumber"
                        placeholder="Enter Your Reference Number"
                        value={field.value}
                        className={` ${
                          errors["referenceNumber"]
                            ? "errorBorder errorShadow"
                            : ""
                        } mt-[0.3rem]`}
                        size="large"
                      />
                    )}
                  />
                  {errors["referenceNumber"] && (
                    <div className="errorText">
                      {errors["referenceNumber"].message}
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
                <div className="my-[0.5rem]">
                  <label>{"Project Name"}</label>
                  <Controller
                    name="projectName"
                    control={control}
                    rules={{
                      required: "Please enter Project Name.",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="projectName"
                        name="projectName"
                        placeholder="Enter Your Project Name"
                        value={field.value}
                        className={` ${
                          errors["projectName"] ? "errorBorder errorShadow" : ""
                        } mt-[0.3rem]`}
                        size="large"
                      />
                    )}
                  />
                  {errors["projectName"] && (
                    <div className="errorText">
                      {errors["projectName"].message}
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
                <div className="my-[0.5rem]">
                  <label>{"Project Number"}</label>
                  <Controller
                    name="projectNumber"
                    control={control}
                    rules={{
                      required: "Please enter Project Number.",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="projectNumber"
                        name="projectNumber"
                        placeholder="Enter Your Project Number"
                        value={field.value}
                        className={` ${
                          errors["projectNumber"]
                            ? "errorBorder errorShadow"
                            : ""
                        } mt-[0.3rem]`}
                        size="large"
                      />
                    )}
                  />
                  {errors["projectNumber"] && (
                    <div className="errorText">
                      {errors["projectNumber"].message}
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
                <div className="my-[0.5rem]">
                  <label>{"Area Location"}</label>
                  <Controller
                    name="areaLocation"
                    control={control}
                    rules={{
                      required: "Please enter Area Location.",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="areaLocation"
                        name="areaLocation"
                        placeholder="Enter Your Area Location"
                        value={field.value}
                        className={` ${
                          errors["areaLocation"]
                            ? "errorBorder errorShadow"
                            : ""
                        } mt-[0.3rem]`}
                        size="large"
                      />
                    )}
                  />
                  {errors["areaLocation"] && (
                    <div className="errorText">
                      {errors["areaLocation"].message}
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
                <div className="my-[0.5rem]">
                  <label>{"Address"}</label>
                  <Controller
                    name="address"
                    control={control}
                    rules={{
                      required: "Please enter address.",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="address"
                        name="address"
                        placeholder="Enter Your Address"
                        value={field.value}
                        className={` ${
                          errors["address"] ? "errorBorder errorShadow" : ""
                        } mt-[0.3rem]`}
                        size="large"
                      />
                    )}
                  />
                  {errors["address"] && (
                    <div className="errorText">{errors["address"].message}</div>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
                <div className="my-[0.5rem]">
                  <label>{"Due Date"}</label>
                  <Controller
                    name="dueDate"
                    control={control}
                    rules={{
                      required: "Please enter address.",
                    }}
                    render={({ field }) => (
                      <DatePicker
                        // defaultValue={dayjs('01/01/2015', dateFormatList[0])}
                        onChange={(date) => {
                          field.onChange(
                            date ? dayjs(date).format("DD/MM/YYYY") : null
                          );
                        }}
                        value={
                          field.value ? dayjs(field.value, "DD/MM/YYYY") : null
                        }
                        format={"DD/MM/YYYY"}
                        size="large"
                        className={` ${
                          errors["customer"] ? "errorBorder errorShadow" : ""
                        } w-full mt-[0.3rem]`}
                      />
                    )}
                  />
                  {errors["address"] && (
                    <div className="errorText">{errors["address"].message}</div>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
                <div className="my-[0.5rem]">
                  <label>{"Contact"}</label>
                  <Controller
                    name="contact"
                    control={control}
                    rules={{
                      required: "Please enter contact number.",
                      minLength: {
                        value: 10,
                        message: "Please enter valid mobile number.",
                      },
                      maxLength: {
                        value: 10,
                        message: "Please enter valid mobile number.",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value ? field.value : ""}
                        placeholder="Enter Your Contact Number"
                        style={{ width: "100%" }}
                        size="large"
                        type="number"
                        className={` ${
                          errors["contact"] ? "errorBorder errorShadow" : ""
                        } mt-[0.3rem]`}
                      />
                    )}
                  />
                  {errors["contact"] && (
                    <div className="errorText">{errors["contact"].message}</div>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
                <div className="my-[0.5rem]">
                  <label>{"Manager"}</label>
                  <Controller
                    name="manager"
                    control={control}
                    rules={{
                      required: "Please enter manager name.",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="manager"
                        name="manager"
                        placeholder="Enter Your Manager Name"
                        value={field.value}
                        className={` ${
                          errors["manager"] ? "errorBorder errorShadow" : ""
                        } mt-[0.3rem]`}
                        size="large"
                      />
                    )}
                  />
                  {errors["manager"] && (
                    <div className="errorText">{errors["manager"].message}</div>
                  )}
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
                <div className="my-[0.5rem]">
                  <label>{"Staff"}</label>
                  <Controller
                    name="staff"
                    control={control}
                    rules={{
                      required: "Please enter staff name.",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="staff"
                        name="staff"
                        placeholder="Enter staff name"
                        value={field.value}
                        className={` ${
                          errors["staff"] ? "errorBorder errorShadow" : ""
                        } mt-[0.3rem]`}
                        size="large"
                      />
                    )}
                  />
                  {errors["staff"] && (
                    <div className="errorText">{errors["staff"].message}</div>
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
                        placeholder="Search to Select"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        options={[
                          { value: "Completed", label: "Completed" },
                          { value: "Processing", label: "Processing" },
                          { value: "Rejected", label: "Rejected" },
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
              <Col xs={24} sm={12} md={8} lg={8} xl={8} className="">
                <div className="my-[0.5rem]">
                  <label>{"Email"}</label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="email"
                        name="email"
                        size="large"
                        placeholder="Enter Email Address"
                        value={field.value}
                        className={` ${
                          errors["staff"] ? "errorBorder errorShadow" : ""
                        } mt-[0.3rem]`}
                      />
                    )}
                  />
                  {errors["email"] && (
                    <div className="errorText">{errors["email"].message}</div>
                  )}
                </div>
              </Col>
            </Row>
            <div className="flex gap-4 my-4">
              <Button
                htmlType="submit"
                size={"large"}
                type="primary"
                className=""
              >
                {params.id ? "Update Now" : "Add Now"}
              </Button>
              <Button
                htmlType="submit"
                size={"large"}
                onClick={() => navigate("/projects")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </StyleMainComponent>
  );
};
export default ProjectsAddEdit;
