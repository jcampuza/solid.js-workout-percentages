export const settingsKey = '$$n$$';
export const fix = (value: number) => Number(value.toFixed(2));

export interface Settings {
  bench: number;
  squat: number;
  lastUpdatedTimestamp: number | null;
}

export const getSettings = () => {
  const item = localStorage.getItem(settingsKey);
  if (!item) {
    return {
      bench: 0,
      squat: 0,
      lastUpdatedTimestamp: null,
    } as Settings;
  }

  return JSON.parse(item) as Settings;
};

export const updateSettings = (settings: Settings) => {
  localStorage.setItem(settingsKey, JSON.stringify(settings));
};
