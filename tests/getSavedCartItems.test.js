const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se getSavedCartItems é uma função',()=>{
    const expected = typeof getSavedCartItems;
    expect(expected).toBe('function');
  });
  it('Testa se, ao executar getSavedCartItems, o método localStorage.getItem é chamado;', () => {
    expect.assertions(1);
    getSavedCartItems('itemsCart');
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Testa se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o \'cartItems\' como parâmetro.', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
