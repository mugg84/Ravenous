const loc = {};

const getLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        resolve(location); // Resolve with location. location can now be accessed in the .then method.
      },
      (err) => reject(err) // Reject with err. err can now be accessed in the .catch method.
    );
  });

export default getLocation;
