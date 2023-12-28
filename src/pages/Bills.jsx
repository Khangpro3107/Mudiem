import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Footer, Navbar } from "../components";
import { formatPrice } from "../utils";


const Bills = () => {
  const [billList, setBillList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBillTotal = (listProduct) => {
    var billTotal = 35000;
    listProduct.map((i) => {
      billTotal += i.price * i.quantity;
      return 0;
    });
    return billTotal;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const getList = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:3001/bill/getList', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setBillList(res.data);
      setLoading(false);
    }
    getList();
  }, []);
  
  const ShowBills = () => {
    return (
      <>
        {billList.map((bill) => {
          // console.log(bill)
          return (
            <div
              id={bill.id}
              key={bill.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={bill.id}>
                {/* <Link
                  to={"/bill/" + bill.id}
                  className="text-decoration-none text-dark"
                >
                  <i className="fa fa-info-circle"></i> View
                </Link> */}
                {formatPrice(getBillTotal(bill.listProduct))}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {/* <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div> */}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Bills</h1>
        <hr />
        {loading ? <Loading /> : <ShowBills />}
      </div>
      <Footer />
    </>
  );
}

export default Bills;