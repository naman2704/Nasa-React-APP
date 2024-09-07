const Footer = ({ date, title }) => {
  return (
    <footer>
      <div>
        <h1>{date || "APOD PROJECT"}</h1>
        <h2>{title || "Nasa 's Astronomy Picture of the Day"}</h2>
      </div>
      <button
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i className="fa-solid fa-circle-info"></i>
      </button>
    </footer>
  );
};

export default Footer;
