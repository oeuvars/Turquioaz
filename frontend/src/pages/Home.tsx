import { ParentComponent, from } from "solid-js";
import Services from "./home/Services";
import Shop from "./home/Shop";
import Footer from "./home/Footer";
import Hero from "./home/Hero";

const Home: ParentComponent = () => {
  return (
    <div class="mt-16">
      <Hero />
      <Services />
      <Shop />
      <Footer />
    </div>
  );
};

export default Home;
