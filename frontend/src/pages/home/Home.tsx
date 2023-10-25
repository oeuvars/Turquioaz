import { ParentComponent, from } from "solid-js";
import Services from "./Services";
import Shop from "./Shop";
import Footer from "./UpperFooter";
import Hero from "./Hero";
import Navbar from "../user/components/Navbar";
import DownFooter from "./DownFooter";

const Home: ParentComponent = () => {
  return (
    <div class="">
      <Navbar />
      <div class="phone:mt-[2vh] lg:mt-[5vw]">
        <Hero />
        <Services />
        <Shop />
        <Footer />
        <DownFooter />
      </div>
    </div>
  );
};

export default Home;
