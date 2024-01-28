export interface FiltersProps {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    selectedPrice: number[];
    setSelectedPrice: React.Dispatch<React.SetStateAction<number[]>>;
    selectedBrand: string | null;
    setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>
    selectedPower: number[];
    setSelectedPower: React.Dispatch<React.SetStateAction<number[]>>
    selectedAcceleration: number[] | undefined
    setSelectedAcceleration: React.Dispatch<React.SetStateAction<number[] | undefined>>
  }
