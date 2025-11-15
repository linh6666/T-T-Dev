// import Home from "@/feature/home/index";
import { Loader } from "@mantine/core";
import { Suspense } from "react";
// import Home from "../../../feature/index";
// import PageAbout from "../../../components/PegaAbout";
import PageInteract from "../../../components/Interact";


const HomePage = () => {
  return (
    <div
     
    >
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Loader color="red" type="bars" />
          </div>
        }
      >
          {/* <PageAbout /> */}
           <PageInteract/>
         {/* <Home />  */}
      </Suspense>
    </div>
  );
};

export default HomePage;