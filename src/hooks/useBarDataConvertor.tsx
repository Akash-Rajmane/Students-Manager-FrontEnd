import { useEffect, useState } from 'react';

const useBarDataGenerator = (
  data: any,
  A?: string | number,
  B?: string | number,
  C?: string | number
) => {
  const [barData, setBarData] = useState([{}]);

  const barDataGenerator = (
    data: any,
    A: string | number = 80,
    B: string | number = 60,
    C: string | number = 40
  ) => {
    let countA: number = 0;
    let countB: number = 0;
    let countC: number = 0;
    let countF: number = 0;
    const marksArray = data.map((el: any) => el.marks);
    for (let i = 0; i < marksArray.length; i++) {
      if (marksArray[i] > Number(A)) {
        countA++;
      } else if (marksArray[i] > Number(B) && marksArray[i] <= Number(A)) {
        countB++;
      } else if (marksArray[i] > Number(C) && marksArray[i] <= Number(B)) {
        countC++;
      } else {
        countF++;
      }
      const data = [
        { Grade: 'A (>80)', Value: countA },
        { Grade: 'B (>60)', Value: countB },
        { Grade: 'C (>40)', Value: countC },
        { Grade: 'F (<40)', Value: countF },
      ];
      setBarData(data);
    }
  };
  useEffect(() => {
    barDataGenerator(data, A, B, C);
  }, [data, A, B, C]);
  return [barData];
};

export default useBarDataGenerator;
