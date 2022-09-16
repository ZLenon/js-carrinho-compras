require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testando se fetchProducts é  realmente uma função', () => {
    expect.assertions(1);
    const expected = typeof fetchProducts;
    expect(expected).toBe('function');
  });
  it('Executando a função fetchProducts com o param \'computador\' e testa se fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testando se, ao chamar a função fetchProducts com o param \'computador\', a função fetch utiliza o endpoint \'https://api.mercadolibre.com/sites/MLB/search?q=computador\'', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch)
      .toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Teste se o retorno da função fetchProducts com o param \'computador\' é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect.assertions(1);
    const expected = await fetchProducts('computador');
    expect(expected).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem param, retorna um erro com a mensagem: \'You must provide an url\'', async () => {
    // const expected = await fetchProducts();
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  });
});
