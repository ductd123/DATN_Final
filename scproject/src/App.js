import "./scss/App.scss";
import "./scss/detailPanel.scss";
import Routers from "./Routers";
import { useEffect, useState } from "react";
import Rotate from "./Component/Common/Rotate/Rotate";
import LoadingComponent from "./Component/Common/Loading/Loading";

const App = () => {
  const [windowRotate, setWindowRotate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowRotate(
        window.innerWidth < 600 && window.innerWidth < window.innerHeight
      );
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <LoadingComponent loading={loading} />
      {windowRotate && <Rotate />}
      <Routers />
    </div>
  );
};

export default App;
