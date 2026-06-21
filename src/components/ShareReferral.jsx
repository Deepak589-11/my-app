function ShareReferral({ referral }) {

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied successfully!");
  };

  return (
    <div className="share-card">
      <h2>Share Referral</h2>

      <div className="referral-item">
        <label>Referral Link</label>

        <div className="copy-box">
          <input
            value={referral.link}
            readOnly
          />

          <button
            onClick={() => copyText(referral.link)}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="referral-item">
        <label>Referral Code</label>

        <div className="copy-box">
          <input
            value={referral.code}
            readOnly
          />

          <button
            onClick={() => copyText(referral.code)}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareReferral;