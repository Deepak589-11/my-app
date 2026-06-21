function Overview({ metrics }) {
  return (
    <div className="overview-grid">
      {metrics.map((item, index) => (
        <div
          className="overview-card"
          key={index}
        >
          <h3>{item.title}</h3>
          <h2>{item.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default Overview;