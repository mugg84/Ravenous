import Business from "../components/Business/Business";

const apiKey =
  "B0yNoUYVXA7RVOGgVDlMj-lA5BFBc5UmpWJRieYty6DCzERgAxqfkQclNKBZcuGU1h6zZ35f1dyR4_1punYX_fALUjEZhk8nDFL_Dyc6bgVuZvRhJM7gv2LyDBC9XnYx";

const Yelp = {
  search(term, location, sortBy) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map((business) => ({
            id: business.id,
            imageSrc: business.image_url,
            url: business.url,
            name: business.name,
            address: business.location.address1,
            coordinates: `http://www.google.com/maps/place/${business.coordinates.latitude},${business.coordinates.longitude}`,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
          }));
        }
      });
  },
};

export default Yelp;
