// Please add personal

const apiKey = process.env.REACT_APP_YELP_API_KEY;

const Yelp = {
  async search(term, location, sortBy) {
    try {
      let response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      let jsonResponse = await response.json();
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map((business) => {
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            url: business.url,
            googleMaps: `ht.btps://google.com/maps/place/${business.location.address1}`,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
          };
        });
      }
      console.log("Something went wrong");
    } catch (error) {
      console.log(error);
    }
  },
};

export default Yelp;
