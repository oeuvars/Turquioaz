import { Component, createSignal } from "solid-js";
import cover from "../assets/images/RidenRent.svg";
import image1 from "../assets/about/742230-768x1021.jpg";
import image2 from "../assets/about/744047.jpg";
import image3 from "../assets/about/744607.jpg";
import image4 from "../assets/about/745166.jpg";
import image5 from "../assets/about/745274.jpg";

const Info: Component = () => {
    const [teamMembers] = createSignal([
      { name: "Anurag Das", role: "Designer & Frontend" },
      { name: "Ritam Samanta", role: "Backend" }
    ]);

    return (
      <div class="font-mabry-regular text-emerald-100 text-center">
        <h1 class="font-mauline text-emerald-600 text-6xl text-center">About Us</h1>
        <p class="my-5 w-2/5 mx-auto text-center">
          Welcome to our car rental website! We are a dedicated team of car
          enthusiasts who love helping people find the perfect vehicle for their
          needs.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to provide you with the best car rental experience
          possible. Whether you need a car for a family vacation, a business
          trip, or just to explore a new city, we've got you covered. We strive
          to offer a wide selection of vehicles at competitive prices, all while
          providing top-notch customer service.
        </p>
        <h2>Meet Our Team</h2>
        <ul>
          {teamMembers().map((member) => (
            <li>
              <strong>{member.name}</strong> - {member.role}
            </li>
          ))}
        </ul>
        <h2>Contact Us</h2>
        <p>
          If you have any questions, feedback, or need assistance, feel free to
          reach out to our team. We're here to help you make your car rental
          experience a great one!
        </p>
        <p>Email: info@carrentalwebsite.com</p>
        <p>Phone: +1 123-456-7890</p>
      </div>
    );
};

export default Info;
