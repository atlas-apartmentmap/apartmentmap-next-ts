export const getFloorPlansForObject = async (modelName: string, objectName: string): Promise<string[]> => {
  const floorPlans: string[] = [];
  const basePath = `/assets/floorplans/${modelName}/${objectName}`;
  let index = 1;

  // Patterns to check (you can expand this as needed)
  const patterns = [
    `${basePath}_${index.toString().padStart(2, '0')}.jpg`,
  ];

  for (const pattern of patterns) {
    while (true) {
      const imagePath = pattern.replace('_01', `_${index.toString().padStart(2, '0')}`);
      try {
        const response = await fetch(imagePath, { method: 'HEAD' });
        if (response.ok) {
          floorPlans.push(imagePath);
          index++;
        } else {
          break;
        }
      } catch (error) {
        break;
      }
    }
    index = 1;  // Reset index for next pattern
  }

  return floorPlans;
};
