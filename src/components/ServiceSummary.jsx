function ServiceSummary({ serviceSummary }) {
  return (
    <div className="service-card">
      <h2>Service Summary</h2>

      <table className="service-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Your Referrals</th>
            <th>Active Referrals</th>
            <th>Total Ref Earnings</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{serviceSummary.service}</td>
            <td>{serviceSummary.yourReferrals}</td>
            <td>{serviceSummary.activeReferrals}</td>
            <td>{serviceSummary.totalRefEarnings}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ServiceSummary;