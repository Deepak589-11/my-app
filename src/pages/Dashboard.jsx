import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Navbar from "../components/Navbar";
import Overview from "../components/Overview";
import ServiceSummary from "../components/ServiceSummary";
import ShareReferral from "../components/ShareReferral";
import ReferralsTable from "../components/ReferralsTable";

import "./Dashboard.css";
import BASE_URL from "../utils/api";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const getDashboardData = async () => {
    const token = Cookies.get("jwt_token");

    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setDashboardData(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const filteredReferrals =
    dashboardData?.referrals?.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.serviceName
          .toLowerCase()
          .includes(search.toLowerCase())
    ) || [];

  const sortedReferrals = [...filteredReferrals].sort(
    (a, b) => {
      if (sort === "asc") {
        return (
          new Date(a.date) -
          new Date(b.date)
        );
      }

      return (
        new Date(b.date) -
        new Date(a.date)
      );
    }
  );
  const rowsPerPage = 10;

const indexOfLastRow =
  currentPage * rowsPerPage;

const indexOfFirstRow =
  indexOfLastRow - rowsPerPage;

const currentRows =
  sortedReferrals.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

const totalPages = Math.ceil(
  sortedReferrals.length / rowsPerPage
);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>Referral Dashboard</h1>

        {isLoading ? (
          <div className="loader-container">
  <div className="loader"></div>
</div>
        ) : (
          <>
            <Overview
              metrics={dashboardData.metrics}
            />

            <ServiceSummary
              serviceSummary={
                dashboardData.serviceSummary
              }
            />

            <ShareReferral
              referral={
                dashboardData.referral
              }
            />

            <div className="filter-container">
              <input
                type="text"
                placeholder="Search by name or service"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
              >
                <option value="desc">
                  Newest First
                </option>

                <option value="asc">
                  Oldest First
                </option>
              </select>
            </div>

           {sortedReferrals.length === 0 ? (
  <div className="empty-state">
    <h3>No referrals found</h3>
    <p>Try a different search term.</p>
  </div>
) : (
  <ReferralsTable
    referrals={currentRows}
  />
)}
<div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(currentPage - 1)
    }
  >
    Previous
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() =>
      setCurrentPage(currentPage + 1)
    }
  >
    Next
  </button>

</div>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;