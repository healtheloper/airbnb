export const getGeoLocation = () =>
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
