const apiKey =
  "B0yNoUYVXA7RVOGgVDlMj-lA5BFBc5UmpWJRieYty6DCzERgAxqfkQclNKBZcuGU1h6zZ35f1dyR4_1punYX_fALUjEZhk8nDFL_Dyc6bgVuZvRhJM7gv2LyDBC9XnYx";

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
            address: business.location.address1,
            city: business.location.city,
            state: business.location.display_address.state,
            zipCode: business.location.display_address.zip,
            category: business.categories[0].title,
            rating: business.rating,
            review: business.review_count,
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
