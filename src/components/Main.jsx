import bgImg from "../assets/mars.png";

const Main = ({ imageURL, imageALT }) => {
  return (
    <div className="imgContainer">
      <img src={imageURL || bgImg} alt={imageALT || "bg-img"} />
    </div>
  );
};

export default Main;
