const apiKey = 'hKURdmrEwMWYos-k4uf6kCeqapZaSQjM8b9G_76C_XlKUw4oE9GWla3zs-vbpZ11Ghnif_oUV_ts30ow97r_JIT3BtL0fm302gVfKovd4Un2ZiISphCkFin63OPfWnYx';

const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {Authorization: `Bearer ${apiKey}`}
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request Failed!');
      }
    }).then(jsonResponse => {
      if(jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories.title,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });
  }
};

export default Yelp;
