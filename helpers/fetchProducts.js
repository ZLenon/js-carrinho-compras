const fetchProducts = async (parameter) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${parameter}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

/* fetchProducts('computador').then(data=> console.log(
  data.results[0].title,
  data.results[0].thumbnail,
  data.results[0].price,
)); */
