require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Teste se fetchItem é uma função', () => {
    expect.assertions(1);
    const expected = typeof fetchItem;
    expect(expected).toBe('function');
  });
  it('Executa a função fetchItem com o param do item "MLB1615760527" e testa se fetch foi chamada;', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se, ao chamar a função fetchItem com o param do item \"MLB1615760527\", a função fetch utiliza o endpoint \"https://api.mercadolibre.com/items/MLB1615760527\'', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527')
    expect(fetch)
      .toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Testa se o retorno da função fetchItem com o param do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    expect.assertions(1);
    const expected = await fetchItem('MLB1615760527');
    expect(expected).toEqual(item);
  });
  it('Testa se, ao chamar a função fetchItem sem param, return um erro com a mensagem: \'You must provide an url\'', async () => {
    expect.assertions(1);
    const expected = await fetchItem();
    expect(expected).toEqual('You must provide an url');
  });
});
