import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div className="overlay">
      <Spinner
        animation="grow"
        variant="dark"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "4rem",
          height: "4rem",
        }}
      />
    </div>
  );
}

export default Loader;
