import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Table.css";
import { formatPrice } from "../utils";

function CollapsibleTable() {
  const [openRows, setOpenRows] = useState([]);
  const [billList, setBillList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getList = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://mudiem-be.onrender.com/bill/getList",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBillList(res.data);
      setLoading(false);
    };
    getList();
  }, []);

  const getBillTotal = (listProduct) => {
    var billTotal = 35000;
    listProduct.forEach((item) => {
      billTotal += item.price * item.quantity;
    });
    return billTotal;
  };

  const handleRowToggle = (id) => {
    setOpenRows((prevOpenRows) => {
      if (prevOpenRows.includes(id)) {
        return prevOpenRows.filter((row) => row !== id);
      } else {
        return [...prevOpenRows, id];
      }
    });
  };

  const Row = ({ row, index }) => (
    <>
      <tr>
        <td>
          <button onClick={() => handleRowToggle(row.id)}>
            {openRows.includes(row.id) ? "[-]" : "[+]"}
          </button>
        </td>
        <td>{index + 1}</td>
        <td>{row.email}</td>
        <td>{row.creditCardNum}</td>
        <td>{row.nameCard}</td>
        <td>{row.zip}</td>
        <td>{formatPrice(getBillTotal(row.listProduct))}</td>
      </tr>
      {openRows.includes(row.id) && (
        <tr>
          <td colSpan="7">
            <div className="history">
              <h6>Product List</h6>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {row.listProduct.map((product) => (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price * product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );

  return (
    <table>
      <thead>
        <tr>
          <th />
          <th>Order</th>
          <th>Email</th>
          <th>Credit Card Number</th>
          <th>Name on Card</th>
          <th>Zip code</th>
          <th>Total Bill</th>
        </tr>
      </thead>
      <tbody>
        {billList.map((row, index) => (
          <Row key={row.id} row={row} index={index} />
        ))}
      </tbody>
    </table>
  );
}

CollapsibleTable.propTypes = {};

export default CollapsibleTable;
