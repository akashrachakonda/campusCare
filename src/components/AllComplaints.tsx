import "./AllComplaints.css";
import { Link, useLocation } from "react-router-dom";
const AllComplaints = () => {
  const location = useLocation();
  const prevCompData = location.state?.data;
  console.log("Data--->", prevCompData);
  return (
    <>
      <Link type="button" className="btn btn-primary btn-sm " to={"/complaint"}>
        Back
      </Link>
      <h3 className="tableLabel">Previous Complaints list</h3>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {prevCompData.map((data: any, index: number) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td className="text-truncate">{data.description}</td>
              <td
                style={{
                  color: data?.status === "Pending" ? "orange" : "green",
                }}
              >
                {data.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllComplaints;
