import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ReferralDetails() {
  const { id } = useParams();

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          background: "white",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,.08)"
        }}
      >
        <h1>Referral Details</h1>

        <p>
          Referral ID: <strong>{id}</strong>
        </p>
      </div>
    </>
  );
}

export default ReferralDetails;