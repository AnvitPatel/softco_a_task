import { Button, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/storeConfig/store";
import { useEffect } from "react";
import {
  estimateGet,
  estimatesDelete,
} from "../../redux/slice/Slices/estimateSlice";
const { Column } = Table;
interface DataType {
  id: string | null;
  userID?: string | null;
  client: string;
  project: string | null;
  status: string | null;
  createdDate: string;
  updatedDate: string;
  mainItemsDetail: {
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
  }[];
}
const Estimates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state?.auth);
  const { isCreated, isDeleted, estimateList } = useSelector(
    (state: RootState) => state?.estimate
  );
  useEffect(() => {
    dispatch(estimateGet(userData?.id ? userData?.id : ""));
  }, [dispatch, isCreated, isDeleted]);
  return (
    <div className="p-5">
      <div className="flex  items-center">
        <h1 className="font-semibold text-3xl">Estimate</h1>
        <Button
          type="primary"
          size={"large"}
          className="ml-auto"
          onClick={() => navigate("/estimates/add")}
        >
          Add Project
        </Button>
      </div>
      <div className="overflow-auto mt-5">
        <Table<DataType>
          dataSource={estimateList || []}
          pagination={{
            pageSize: 10,
          }}
          // className="min-w-[130rem]"
          //   scroll={{ y: 300 }}
        >
          <Column
            title="VERSION"
            dataIndex=""
            key="project"
            render={(_: any, _record: DataType, index: number) => (
              <>{String(index + 1).padStart(5, "0")}</>
            )}
          />
          <Column title="PROJECT" dataIndex="project" key="project" />
          <Column title="CLIENT" dataIndex="client" key="client" />
          <Column
            title="CREATED DATE"
            dataIndex="createdDate"
            key="createdDate"
          />
          <Column
            title="LAST MODIFIED"
            dataIndex="updatedDate"
            key="updatedDate"
          />
          <Column
            title="STATUS"
            dataIndex="status"
            key="status"
            width={200}
            render={(_: any, record: DataType) => (
              <Space size="middle">
                {record.status === "Processing" ? (
                  <Tag color="purple">{record.status}</Tag>
                ) : record.status === "Created" ? (
                  <Tag color="cyan">{record.status}</Tag>
                ) : record.status === "Rejected" ? (
                  <Tag color="red">{record.status}</Tag>
                ) : record.status === "In Transit" ? (
                  <Tag color="magenta">{record.status}</Tag>
                ) : (
                  record.status === "On Hold" && (
                    <Tag color="gold">{record.status}</Tag>
                  )
                )}
              </Space>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(_: any, record: DataType) => (
              <Space size="middle">
                <a
                  className="cursor-pointer"
                  onClick={() => navigate(`/estimates/${record?.id}`)}
                >
                  Edit
                </a>
                <a
                  className="cursor-pointer"
                  onClick={() =>
                    dispatch(estimatesDelete(record?.id ? record?.id : ""))
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
  );
};
export default Estimates;
