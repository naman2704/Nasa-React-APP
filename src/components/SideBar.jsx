const SideBar = ({ title, date, description }) => {
  return (
    <div
      className="offcanvas offcanvas-end bg-dark text-light"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          {title || "APOD PROJECT"}
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <p>{description || "loading data..."}</p>
      </div>
    </div>
  );
};

export default SideBar;
