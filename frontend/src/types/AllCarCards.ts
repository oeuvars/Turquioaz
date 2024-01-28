export interface AllCarCardsProps {
    onTotalModelsChange: (totalModels: number) => void;
    page: number;
    selectedPrice: number[];
    selectedBrand: string | null;
    selectedPower: number[];
    selectedAcceleration: number[] | undefined;
 }