export const getItemFromLocalStorage = <T>(item: string, dispatch: (newValue: T) => void, defaultValue: T) => {
  const saved = localStorage.getItem(item);
  if (saved) {
    try {
      const parsedValue: T = JSON.parse(saved);
      if (Array.isArray(parsedValue) && parsedValue.length > 0) {
        dispatch(parsedValue);
      } else if (!Array.isArray(parsedValue)) {
        dispatch(parsedValue);
      }
    } catch (error) {
      console.error('Ошибка при парсинге сохранённых данных:', error);
    }
  } else {
    dispatch(defaultValue);
  }
};
