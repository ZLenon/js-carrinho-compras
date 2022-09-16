async function fetchProducts(parametro) {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${parametro}`;
    const response = await fetch(url);
    return await response.json();    
  } catch (error) {
    return error.message;
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
