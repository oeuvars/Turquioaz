import { createContext, createSignal, useContext } from "solid-js";

type TopFilterContextValue = {
  selectedBrand: () => string;
  setSelectedBrand: (brand: string) => void;
  selectedModel: () => string;
  setSelectedModel: (model: string) => void;
};

const TopFilterContext = createContext<TopFilterContextValue | undefined>();

export const TopFilterProvider: Function = (props: any) => {
  const [selectedBrand, setSelectedBrand] = createSignal("Porsche");
  const [selectedModel, setSelectedModel] = createSignal("Any");

  const contextValue: TopFilterContextValue = {
    selectedBrand,
    setSelectedBrand,
    selectedModel,
    setSelectedModel,
  };

  return (
    <TopFilterContext.Provider value={contextValue}>
      {props.children}
    </TopFilterContext.Provider>
  );
};

export const useTopFilterContext: Function = () =>
  useContext(TopFilterContext) || {
    selectedBrand: () => "",
    setSelectedBrand: () => {},
    selectedModel: () => "",
    setSelectedModel: () => {},
  };
