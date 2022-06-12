export const getGeoLocation = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error.message);
      },
    );
  });

export const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });

export const differenceDate = (checkIn: string, checkOut: string) =>
  new Date(checkOut).getDate() - new Date(checkIn).getDate();

export const getParamsFormat = (config: object) => {
  const params = Object.entries(config)
    .map(param => {
      const [key, value] = param;
      return `${key}=${value}`;
    })
    .join('&');
  return `?${params}`;
};
