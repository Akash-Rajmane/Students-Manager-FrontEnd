type PerPageTypes = {
    label: string;
    optionsArr: number[];
    selected: number;
    setSelected: React.Dispatch<React.SetStateAction<number>> ;
    customClass?: string;
};

export default PerPageTypes;

