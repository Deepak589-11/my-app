import { useNavigate } from "react-router-dom";
function ReferralsTable({ referrals }) {
    const navigate = useNavigate();
  return (
    <div className="table-card">
      <h2>Referrals</h2>

      <table className="referral-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Profit</th>
          </tr>
        </thead>

        <tbody>
          {referrals.map(item => (
            <tr
  key={item.id}
  onClick={() =>
    navigate(`/referral/${item.id}`)
  }
  style={{ cursor: "pointer" }}
>
              <td>{item.name}</td>

              <td>{item.serviceName}</td>

              <td>
                {item.date.replaceAll("-", "/")}
              </td>

              <td>
                {new Intl.NumberFormat(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0
                  }
                ).format(item.profit)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReferralsTable;