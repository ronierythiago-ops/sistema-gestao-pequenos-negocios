const produtosPadrao = [
  {
    nome: 'Arroz 5kg',
    categoria: 'Alimentos',
    descricao: 'Produto de exemplo'
  },
  {
    nome: 'Feijão 1kg',
    categoria: 'Alimentos',
    descricao: 'Produto de exemplo'
  },
  {
    nome: 'Óleo de Cozinha 900ml',
    categoria: 'Alimentos',
    descricao: 'Produto de exemplo'
  }
];

// Inicializa os produtos
function inicializarProdutos() {
  const produtosSalvos = localStorage.getItem('produtos');

  if (!produtosSalvos) {
    localStorage.setItem('produtos', JSON.stringify(produtosPadrao));
  }
}

// Retorna os produtos salvos
function obterProdutos() {
  const dados = localStorage.getItem('produtos');
  return dados ? JSON.parse(dados) : [];
}

// Salvar novo produto
function salvarProduto() {
  const nome = document.getElementById('nomeProduto').value.trim();
  const categoria = document.getElementById('categoriaProduto').value.trim();
  const descricao = document.getElementById('descricaoProduto').value.trim();

  if (nome === '' || categoria === '') {
    alert('Preencha o nome e a categoria do produto.');
    return;
  }

  const produtos = obterProdutos();

  produtos.push({
    nome: nome,
    categoria: categoria,
    descricao: descricao
  });

  localStorage.setItem('produtos', JSON.stringify(produtos));

  alert('Produto cadastrado com sucesso!');
  window.location.href = 'lista.html';
}

// Carrega a lista de produtos
function carregarProdutos() {
  const lista = document.getElementById('lista-produtos');

  if (!lista) {
    return;
  }

  const produtos = obterProdutos();
  lista.innerHTML = '';

  produtos.forEach(function (produto, indice) {
    const li = document.createElement('li');

    li.innerHTML =
      produto.nome +
      ' <small>(' + produto.categoria + ')</small> ' +
      '<a href="#" onclick="verDetalhes(' + indice + '); return false;">Detalhes</a>';

    lista.appendChild(li);
  });
}

// Salva o índice do produto e abre a tela de detalhes
function verDetalhes(indice) {
  localStorage.setItem('produtoSelecionado', indice);
  window.location.href = 'detalhes.html';
}

// Carrega os dados do produto na tela de detalhes
function carregarDetalhes() {
  const campoNome = document.getElementById('detalheNome');

  // Se não estiver na página detalhes.html, sai da função
  if (!campoNome) {
    return;
  }

  const indice = localStorage.getItem('produtoSelecionado');
  const produtos = obterProdutos();

  if (indice === null || !produtos[indice]) {
    document.getElementById('detalheNome').textContent = 'Produto não encontrado';
    document.getElementById('detalheCategoria').textContent = '-';
    document.getElementById('detalheDescricao').textContent = '-';
    return;
  }

  const produto = produtos[indice];

  document.getElementById('detalheNome').textContent = produto.nome;
  document.getElementById('detalheCategoria').textContent = produto.categoria;
  document.getElementById('detalheDescricao').textContent =
    produto.descricao || 'Sem descrição.';
}

// Busca por nome
function filtrar() {
  const busca = document.getElementById('busca');

  if (!busca) {
    return;
  }

  const termo = busca.value.toLowerCase();
  const itens = document.querySelectorAll('#lista-produtos li');

  itens.forEach(function (item) {
    const texto = item.textContent.toLowerCase();
    item.style.display = texto.indexOf(termo) !== -1 ? 'block' : 'none';
  });
}

// Executa ao carregar qualquer página
window.onload = function () {
  inicializarProdutos();
  carregarProdutos();
  carregarDetalhes();
};