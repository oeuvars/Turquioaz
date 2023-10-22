import { ParentComponent, from } from "solid-js";
import Services from "./Services";
import Shop from "./Shop";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "../../components/Navbar";

const Home: ParentComponent = () => {
  return (
    <div class="">
      <Navbar />
      <div class="phone:mt-[2vh] lg:mt-[5vw]">
        <Hero />
        <Services />
        <Shop />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
