import { Component } from "solid-js";
import { TopFilterProvider } from "../utils/TopFilterContext";
import TopFilter from "../components/TopFilter";

const Search: Component = () => {
  return (
    <div class="pb-10">
      <TopFilter />
    </div>
  );
};

export default Search;
