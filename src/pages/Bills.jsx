import Skeleton from "react-loading-skeleton";
import { Footer, Navbar } from "../components";
import CollapsibleTable from "../components/Table";

const Bills = () => {
  const ShowBills = () => {
    return (
      <>
        <CollapsibleTable />
      </>
    );
  };

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Bills</h1>
        <hr />
        <ShowBills />
      </div>
      <Footer />
    </>
  );
};

export default Bills;
