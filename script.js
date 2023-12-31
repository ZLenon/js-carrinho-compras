// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
const carrinho = document.querySelector('.cart__items');
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

// Requisito 5 Remove o item ao clicar
const cartItemClickListener = (element) => {
  element.target.remove();
  saveCartItems(carrinho.innerHTML);
};

// Requisito 8 deve add items do carrinho ao clicar, depois de carregar tbm deve ser possivel
function savecar() {
  const local = getSavedCartItems(); // localStorage.getItem('cartItems')
  carrinho.innerHTML = local;
  // console.log(local);
}

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// Requisito 2 Mostra Todos produtos na tela
async function sendProductsPage() {
  const data = await fetchProducts('computador');
  const items = document.querySelector('.items');
  data.results.forEach((infoProduct) => {
    items.appendChild(createProductItemElement({
      id: infoProduct.id,
      title: infoProduct.title,
      thumbnail: infoProduct.thumbnail,
    }));
  });
}

// Requisito 4 Botão de add no carrinho
async function addProductCart() {
  const allButtons = document.querySelectorAll('.item__add');

  allButtons.forEach((botoes) => {
    botoes.addEventListener('click', async (param) => {
      // const id = param.target.parentNode.firstChild.innerText;
      const botao = param.target;
      const nodePai = botao.parentNode;
      const filhoUm = nodePai.firstChild;
      const texto = filhoUm.innerText;
      const data = await fetchItem(texto);
      // console.log(texto);
      carrinho.appendChild(createCartItemElement(data));

      // console.log(carrinho.innerHTML);
      saveCartItems(carrinho.innerHTML);
    });
  });
}

// Requisito 10 limpa o carrinho
function deletCar(param) {
  const del = document.querySelector('.empty-cart');
  del.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    carrinho.innerHTML = '';
  });
}

// Requisito 11 Mostra texto de carregando durante a requisição da API
function textLoad() {
  const div = document.createElement('div');
  div.className = 'loading';
  div.innerText = 'carregando...';
  const carregando = document.querySelector('.items');
  carregando.appendChild(div);
}
function textExit() { // Requisito 11
  document.querySelector('.loading').remove();
}
// getSavedCartItems();
// SavedCartItems();

window.onload = async () => {
  textLoad();
  await sendProductsPage();
  await addProductCart();
  savecar();
  deletCar();
  textExit();
};
