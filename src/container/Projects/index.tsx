import { useNavigate } from "react-router-dom";
import { StyleMainComponent } from "./style";
import { Button, DatePicker, Select, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/storeConfig/store";
import {
  projectDelete,
  projectGet,
} from "../../redux/slice/Slices/projectSlice";
import { Filter, RotateCcw } from "lucide-react";
import dayjs from "dayjs";
const { Column, ColumnGroup } = Table;
interface DataType {
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

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state?.auth);
  const { isCreated, isDeleted, projects } = useSelector(
    (state: RootState) => state?.project
  );
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [columnsGroup, setColumns] = useState<string[]>([]);
  const [status, setStatus] = useState([]);
  useEffect(() => {
    dispatch(projectGet(userData?.id ? userData?.id : ""));
  }, [dispatch, isCreated, isDeleted]);
  const filterData = () => {
    const data: DataType[] = projects ? [...projects] : [];
    const date = dueDate;
    const status2: string[] = status ? [...status] : [];
    const filteredData1 =
      data.length && date ? data.filter((item) => item.dueDate === date) : data;

    let setData: DataType[] = filteredData1.length > 0 ? filteredData1 : [];

    if (filteredData1.length > 0 && status2.length > 0) {
      setData = filteredData1.filter((item) => status2.includes(item.status));
    } else if (status2.length > 0) {
      setData = data.filter((item) => status2.includes(item.status));
    }
    return setData;
  };
  return (
    <StyleMainComponent>
      <div className="p-5">
        <h1 className="font-semibold text-3xl">Projects</h1>
        <div className="flex mt-3 items-center">
          <div className="flex bg-[#ffff]">
            <div className="border border-slate-400 w-[10rem] flex items-center p-[10px] rounded-l-lg">
              <Filter />
              <div className="ml-auto">Filter By</div>
            </div>
            <div className="border border-slate-400 w-[10rem] flex items-center p-[10px]">
              <DatePicker
                // defaultValue={dayjs('01/01/2015', dateFormatList[0])}
                onChange={(date) => {
                  setDueDate(date ? dayjs(date).format("DD/MM/YYYY") : null);
                }}
                value={dueDate ? dayjs(dueDate, "DD/MM/YYYY") : null}
                placeholder="Date"
                format={"DD/MM/YYYY"}
                className={`w-full border-0`}
              />
            </div>
            <div className="border border-slate-400 w-[10rem] flex items-center p-[10px]">
              <Select
                mode="multiple"
                placeholder="Hide Columns"
                value={columnsGroup}
                className={`w-full mt-[0.3rem] selectBorderNone`}
                onChange={(e) => setColumns(e)}
                options={[
                  { value: "CUSTOMER", label: "CUSTOMER" },
                  { value: "REF NUMBER", label: "REF NUMBER" },
                  { value: "PROJECT NAME", label: "PROJECT NAME" },
                  { value: "PROJECT NUMBER", label: "PROJECT NUMBER" },
                  { value: "AREA LOCATION", label: "AREA LOCATION" },
                  { value: "ADDRESS", label: "ADDRESS" },
                  { value: "CONTACT", label: "CONTACT" },
                  { value: "MANAGER", label: "MANAGER" },
                  { value: "STAFF", label: "STAFF" },
                  { value: "STATUS", label: "STATUS" },
                ]}
              />
            </div>
            <div className="border border-slate-400 w-[10rem] flex items-center p-[10px]">
              <Select
                mode="multiple"
                placeholder="status"
                value={status}
                className={`w-full mt-[0.3rem] selectBorderNone`}
                onChange={(e) => setStatus(e)}
                options={[
                  { value: "Completed", label: "Completed" },
                  { value: "Processing", label: "Processing" },
                  { value: "Rejected", label: "Rejected" },
                ]}
              />
            </div>
            <div
              className="border border-slate-400 w-[10rem] rounded-r-lg flex items-center p-[10px] text-red-400 cursor-pointer"
              onClick={() => {
                setDueDate(null);
                setColumns([]);
                setStatus([]);
              }}
            >
              <RotateCcw />
              <div className="ml-4">Reset Filter</div>
            </div>
          </div>
          <Button
            type="primary"
            size={"large"}
            className="ml-auto"
            onClick={() => navigate("/projects/add")}
          >
            Add Project
          </Button>
        </div>
        <div className="overflow-auto mt-5">
          <Table<DataType>
            dataSource={
              dueDate || status.length > 0 ? filterData() : projects || []
            }
            pagination={{
              pageSize: 10,
            }}
            className="min-w-[130rem]"
            //   scroll={{ y: 300 }}
          >
            {columnsGroup.includes("CUSTOMER") ? (
              <></>
            ) : (
              <Column
                title="CUSTOMER"
                dataIndex="customer"
                key="customer"
                width={200}
              />
            )}
            {columnsGroup.includes("REF NUMBER") ? (
              <></>
            ) : (
              <Column
                title="REF NUMBER"
                dataIndex="referenceNumber"
                key="referenceNumber"
                width={200}
              />
            )}
            <ColumnGroup title="PROJECT REFRENCE">
              {columnsGroup.includes("PROJECT NAME") ? (
                <></>
              ) : (
                <Column
                  title="PROJECT NAME"
                  dataIndex="projectName"
                  key="projectName"
                  width={200}
                />
              )}
              {columnsGroup.includes("PROJECT NUMBER") ? (
                <></>
              ) : (
                <Column
                  title="PROJECT NUMBER"
                  dataIndex="projectNumber"
                  key="projectNumber"
                  width={200}
                />
              )}
            </ColumnGroup>
            <ColumnGroup title="PROJECT LOCATION">
              {columnsGroup.includes("AREA LOCATION") ? (
                <></>
              ) : (
                <Column
                  title="AREA LOCATION"
                  dataIndex="areaLocation"
                  key="areaLocation"
                  width={200}
                />
              )}
              {columnsGroup.includes("ADDRESS") ? (
                <></>
              ) : (
                <Column
                  title="ADDRESS"
                  dataIndex="address"
                  key="address"
                  width={200}
                />
              )}
            </ColumnGroup>
            {columnsGroup.includes("DUE DATE") ? (
              <></>
            ) : (
              <Column
                title="DUE DATE"
                dataIndex="dueDate"
                key="dueDate"
                width={200}
              />
            )}
            {columnsGroup.includes("CONTACT") ? (
              <></>
            ) : (
              <Column
                title="CONTACT"
                dataIndex="contact"
                key="contact"
                width={200}
              />
            )}
            <ColumnGroup title="ASSIGNED TO  ">
              {columnsGroup.includes("MANAGER") ? (
                <></>
              ) : (
                <Column
                  title="MANAGER"
                  dataIndex="manager"
                  key="manager"
                  width={200}
                />
              )}
              {columnsGroup.includes("STAFF") ? (
                <></>
              ) : (
                <Column
                  title="STAFF"
                  dataIndex="staff"
                  key="staff"
                  width={200}
                />
              )}
            </ColumnGroup>
            {columnsGroup.includes("STATUS") ? (
              <></>
            ) : (
              <Column
                title="STATUS"
                dataIndex="status"
                key="status"
                width={200}
                render={(_: any, record: DataType) => (
                  <Space size="middle">
                    {record.status === "Processing" ? (
                      <Tag color="purple">{record.status}</Tag>
                    ) : record.status === "Completed" ? (
                      <Tag color="cyan">{record.status}</Tag>
                    ) : (
                      <Tag color="red">{record.status}</Tag>
                    )}
                    {/* <a>Invite {record.lastName}</a>
                  <a>Delete</a> */}
                  </Space>
                )}
              />
            )}
            <Column
              title="Action"
              key="action"
              render={(_: any, record: DataType) => (
                <Space size="middle">
                  <a
                    className="cursor-pointer"
                    onClick={() => navigate(`/projects/${record?.id}`)}
                  >
                    Edit
                  </a>
                  <a
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch(projectDelete(record?.id ? record?.id : ""))
                    }
                  >
                    Delete
                  </a>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </StyleMainComponent>
  );
};
export default Projects;
