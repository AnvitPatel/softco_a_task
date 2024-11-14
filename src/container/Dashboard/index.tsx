const Dashboard = () => {
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch<AppDispatch>();
  //   const { userData } = useSelector((state: RootState) => state?.auth);
  //   const { isCreated, isDeleted, estimateList } = useSelector(
  //     (state: RootState) => state?.estimate
  //   );
  //   useEffect(() => {
  //     dispatch(estimateGet(userData?.id ? userData?.id : ""));
  //   }, [dispatch, isCreated, isDeleted]);
  return (
    <div className="p-5">
      <div className="flex  items-center">
        <h1 className="font-semibold text-3xl">Dashboard</h1>
        {/* <Button
          type="primary"
          size={"large"}
          className="ml-auto"
          onClick={() => navigate("/estimates/add")}
        >
          Add Project
        </Button> */}
      </div>
    </div>
  );
};
export default Dashboard;
