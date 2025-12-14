import React from "react";

const FinishTab = () => {
  return (
    <div className="text-center mt-5">
      <h3 className="text-success fw-bold mb-2">Thank you!</h3>
      <p className="text-muted mb-4">You are just one click away</p>
      <button type="submit" className="btn btn-success px-5 py-2 fs-5 rounded-pill shadow">
        Submit
      </button>
    </div>
  );
};

export default FinishTab;
