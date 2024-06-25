import { useState } from 'react'; 
import './App.css'; // Importa o arquivo CSS da aplicação
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa o CSS do FontAwesome para ícones

function App() {

  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para a categoria selecionada
  const [expandedProduct, setExpandedProduct] = useState(null); // Estado para o produto expandido
  const [favorites, setFavorites] = useState([]); // Estado para os produtos favoritos
  const [shareOptions, setShareOptions] = useState(null); // Estado para as opções de compartilhamento
  const [searchExecuted, setSearchExecuted] = useState(false); // Estado para indicar se a busca foi executada

  // Lista de produtos com detalhes
  const products = [
    { id: 'acessorios1', name: 'Boné Andy Roddik Lacoste', image: './imagens/bone.jpeg', rating: '★★★☆☆', category: 'Acessórios', description: 'Boné casual e esportivo. Design inspirado em Andy Roddick. Material confortável e durável. Marca Lacoste' },
    { id: 'acessorios2', name: 'Bandana Roger Federer Nike', image: './imagens/munhequeira.jpg', rating: '★★★☆☆', category: 'Acessórios', description: 'Bandana de alta performance. Design inspirado em Roger Federer. Material leve e absorvente. Marca Nike' },
    { id: 'acessorios3', name: 'Boné Andy Roddik Lacoste', image: './imagens/bone.jpeg', rating: '★★★☆☆', category: 'Acessórios', description: 'Boné casual e esportivo. Design inspirado em Andy Roddick. Material confortável e durável. Marca Lacoste' },
    { id: 'bolinha1', name: 'Tubo de bola de tênis Odea Passion (4 bolas)', image: './imagens/bolinha.jpg', rating: '★★★☆☆', category: 'Bolinha', description: 'Tubo contendo 4 bolas de tênis. Bolas projetadas para performance e resistência. Ideal para treinos e competições. Marca Odea Passion' },
    { id: 'bolinha2', name: 'Tubo de bola de tênis Odea Passion (4 bolas)', image: './imagens/bolinha.jpg', rating: '★★★☆☆', category: 'Bolinha', description: 'Tubo contendo 4 bolas de tênis. Bolas projetadas para performance e resistência. Ideal para treinos e competições. Marca Odea Passion' },
    { id: 'bolinha3', name: 'Tubo de bola de tênis Odea Passion (4 bolas)', image: './imagens/bolinha.jpg', rating: '★★★☆☆', category: 'Bolinha', description: 'Tubo contendo 4 bolas de tênis. Bolas projetadas para performance e resistência. Ideal para treinos e competições. Marca Odea Passion' },
    { id: 'calcado1', name: 'Tênis Asics Gel Dedicate 8 Clay - Saibro - Preto e Branco', image: './imagens/tenis.jpg', rating: '★★☆☆☆', category: 'Calcado', description: 'Tênis específico para quadras de saibro. Amortecimento Gel para conforto e suporte. Design preto e branco' },
    { id: 'calcado2', name: 'Tênis Fila Gel', image: './imagens/tenis (2).jpg', rating: '★★☆☆☆', category: 'Calcado', description: 'Tênis versátil para todas as superfícies de quadra. Amortecimento Gel para conforto. Design verde e branco' },
    { id: 'calcado3', name: 'Tênis Joma Point Clay - Saibro - Preto e Verde', image: './imagens/tenis (3).jpg', rating: '★★☆☆☆', category: 'Calcado', description: 'Tênis para quadras de saibro. Solado específico para melhor aderência no saibro. Design preto e verde' },
    { id: 'calcado4', name: 'Tênis Asics Gel Resolution 9 Clay Marinho Branco e Dourado', image: './imagens/tenis (4).jpg', rating: '★★☆☆☆', category: 'Calcado', description: 'Tênis de alta performance para quadras de saibro. Amortecimento Gel e suporte lateral. Design marinho, branco e dourado' },
    { id: 'calcado5', name: 'Tênis Asics Gel Dedicate 8 Clay - Saibro - Preto e Branco', image: './imagens/tenis.jpg', rating: '★★☆☆☆', category: 'Calcado', description: 'Tênis específico para quadras de saibro. Amortecimento Gel para conforto e suporte. Design preto e branco' },
    { id: 'calcado6', name: 'Tênis Asics Gel Dedicate 8 - All Court - Verde e Branco', image: './imagens/tenis (5).jpg', rating: '★★☆☆☆', category: 'Calcado', description: 'Tênis versátil para todas as superfícies de quadra. Amortecimento Gel para conforto. Design verde e branco' },
    { id: 'camisa1', name: 'Camiseta Rafael Nadal Azul água Nike', image: './imagens/camisa.jpg', rating: '★★☆☆☆', category: 'Camisa', description: 'Camiseta leve e respirável. Cor azul água. Design e logotipo inspirados em Rafael Nadal. Marca Nike' },
    { id: 'camisa2', name: 'Camiseta Novak Djocovick Polo Lacoste', image: './imagens/camisa.jpeg', rating: '★★☆☆☆', category: 'Camisa', description: 'Polo elegante e esportiva. Material de alta qualidade. Design inspirado em Novak Djokovic. Marca Lacoste' },
    { id: 'camisa3', name: 'Camiseta Novak Djocovick Polo Lacoste', image: './imagens/camisa.jpeg', rating: '★★☆☆☆', category: 'Camisa', description: 'Polo elegante e esportiva. Material de alta qualidade. Design inspirado em Novak Djokovic. Marca Lacoste' },
    { id: 'meia1', name: 'MEIA NIKE EVERYDAY CANO ALTO 3PK BRANCO/CINZA/PRETO 39-43', image: './imagens/meia.jpg', rating: '★★★★★', category: 'Meia', description: 'Pacote com 3 pares de meias de cano alto. Cores variadas: branco, cinza e preto. Tamanho 39-43. Material macio e respirável, ideal para uso diário e esportes' },
    { id: 'meia2', name: 'Meia Cano Alto adidas Tennis Ankle - Adulto', image: './imagens/meia (2).jpeg', rating: '★★★★★', category: 'Meia', description: 'Meia de cano alto para adultos. Design anatômico e confortável. Material respirável e durável. Ideal para partidas de tênis' },
    { id: 'meia3', name: 'MEIA ADIDAS TENNIS CANO ALTO 38-40 - PRETA', image: './imagens/meia.jpeg', rating: '★★★★★', category: 'Meia', description: 'Descrição dos Acessórios 2' },
    { id: 'raquete1', name: 'Raquete de Tênis Wilson - Edição Limitada', image: './imagens/raquete1.jpeg', rating: '★★★★★', category: 'Raquete', description: 'Raquete leve com peso de 285g. Padrão de encordoamento 16x19, proporcionando maior spin e control. Design reverso exclusivo em edição limitada' },
    { id: 'raquete2', name: 'Raquete de Tênis Babolat Pure Strike VS', image: './imagens/raquete5.png', rating: '★★★★☆', category: 'Raquete', description: 'Raquete equilibrada para jogadores agressivos. Peso de 305g para estabilidade e potência. Encordoamento 16x20 para precisão e controle' },
    { id: 'raquete3', name: 'Raquete de Tênis Wilson', image: './imagens/raquete1.jpeg', rating: '★★★★☆', category: 'Raquete', description: 'Versão mais leve da Pro Staff, pesando 290g. Oferece controle e sensação clássica da linha Pro Staff. Padrão de encordoamento 16x19 para versatilidade' },
    { id: 'raquete4', name: 'Raquete de Tênis Wilson', image: './imagens/raquete2.jpeg', rating: '★★★★☆', category: 'Raquete', description: 'Versão mais leve da Pro Staff, pesando 290g. Oferece controle e sensação clássica da linha Pro Staff. Padrão de encordoamento 16x19 para versatilidade' },
    { id: 'raquete5', name: 'Raquete de Tênis', image: './imagens/raquete3.jpeg', rating: '★★★★☆', category: 'Raquete', description: 'Raquete versátil para jogadores de nível intermediário a avançado. Peso de 300g para equilíbrio entre controle e potência. Padrão de encordoamento 16x19' },
    { id: 'raquete6', name: 'Raquete de Tênis Babolat Pure Aero Team', image: './imagens/raquete4.jpeg', rating: '★★★★☆', category: 'Raquete', description: 'Raquete leve e manobrável, pesando 285g. Focada em spin e potência. Padrão de encordoamento 16x19' },
    { id: 'raquete7', name: 'Raquete de Tênis Babolat Pure Aero Team', image: './imagens/raquete7.jpeg', rating: '★★★★☆', category: 'Raquete', description: 'Raquete leve e manobrável, pesando 285g. Focada em spin e potência. Padrão de encordoamento 16x19' }
  ];

  // Filtra os produtos com base no termo de pesquisa e na categoria selecionada
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || product.category === selectedCategory)
  );

  // Manipulador para clicar em uma categoria
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Define a categoria selecionada
    setSearchExecuted(false); // Reseta o estado de busca executada
  };

  // Manipulador para expandir/recolher a descrição do produto
  const handleToggleExpand = (id) => {
    setExpandedProduct(expandedProduct === id ? null : id); // Alterna o estado de expansão do produto
  };

  // Manipulador para adicionar/remover favoritos
  const handleToggleFavorite = (id) => {
    setFavorites(favorites.includes(id) ? favorites.filter(favId => favId !== id) : [...favorites, id]); // Alterna o estado de favorito do produto
  };

  // Manipulador para exibir/ocultar opções de compartilhamento
  const handleShareClick = (id) => {
    setShareOptions(shareOptions === id ? null : id); // Alterna o estado das opções de compartilhamento
  };

  // Manipulador para executar a busca
  const handleSearch = () => {
    setSearchTerm(document.getElementById('search-input').value); // Define o termo de pesquisa com o valor do input
    setSearchExecuted(true); // Marca a busca como executada
  };

  return (
    <>
      <header className="navbar">
        <div className="logo">
        </div>
        <div className="search-bar">
          <input
            type="text"
            id="search-input"
            placeholder="O que você procura?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa em tempo real
          />
          <button type="button" id="search-button" onClick={handleSearch}>Buscar</button> {/* Executa a busca ao clicar no botão */}
        </div>
      </header>

      <div className="catalogo">
        <div className="sidebar">
          <ul>
            {/* Lista de categorias com manipuladores de clique */}
            <li><a href="#" onClick={() => handleCategoryClick('Acessórios')}>Acessórios</a></li>
            <li><a href="#" onClick={() => handleCategoryClick('Bolinha')}>Bolinha</a></li>
            <li><a href="#" onClick={() => handleCategoryClick('Calcado')}>Calçado</a></li>
            <li><a href="#" onClick={() => handleCategoryClick('Camisa')}>Camisa</a></li>
            <li><a href="#" onClick={() => handleCategoryClick('Meia')}>Meia</a></li>
            <li><a href="#" onClick={() => handleCategoryClick('Raquete')}>Raquete</a></li>
          </ul>
        </div>
        <div className="container">
          {searchExecuted && filteredProducts.length === 0 ? (
            <p>Produto não encontrado</p> // Exibe mensagem se não houver produtos correspondentes
          ) : (
            filteredProducts.map(product => (
              <div className="product" key={product.id}>
                <img src={product.image} alt={`Produto ${product.id}`} /> {/* Imagem do produto */}
                <div className="rating">{product.rating}</div> {/* Avaliação do produto */}
                <h2 className="nameProduto">{product.name}</h2> {/* Nome do produto */}
                {expandedProduct === product.id && (
                  <div className="description">
                    {product.description} {/* Descrição do produto, exibida se expandido */}
                  </div>
                )}
                <div className="icons">
                  {/* Ícones de ação: expandir/recolher, favorito, compartilhar */}
                  <i
                    className={`fas ${expandedProduct === product.id ? 'fa-minus' : 'fa-plus'}`}
                    onClick={() => handleToggleExpand(product.id)}
                  ></i>
                  <i
                    className={`fa${favorites.includes(product.id) ? 's' : 'r'} fa-heart`}
                    onClick={() => handleToggleFavorite(product.id)}
                  ></i>
                  <i
                    className="fas fa-share-alt"
                    onClick={() => handleShareClick(product.id)}
                  ></i>
                  {shareOptions === product.id && (
                    <div className="share-options">
                      {/* Opções de compartilhamento: WhatsApp, Instagram, link */}
                      <a
                        href={`https://wa.me/?text=Confira este produto: ${window.location.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-whatsapp"></i>
                      </a>
                      <a
                        href={`https://www.instagram.com/?url=${window.location.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a
                        href="#"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Link copiado para a área de transferência');
                        }}
                      >
                        <i className="fas fa-link"></i>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App; // Exporta o componente App como padrão
