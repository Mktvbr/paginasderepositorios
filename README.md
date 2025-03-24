# Repositório de Issues do GitHub

Este é um projeto React que permite visualizar repositórios do GitHub e listar suas issues. A aplicação consome a API do GitHub para exibir informações detalhadas sobre os repositórios e suas issues abertas, fechadas e todas.

## 🚀 Funcionalidades

- Buscar um repositório do GitHub.
- Exibir detalhes do repositório.
- Listar as issues do repositório com filtros (abertas, fechadas e todas).
- Paginação das issues para facilitar a navegação.
- **Persistência dos repositórios**: os repositórios adicionados pelo usuário são armazenados no Local Storage, garantindo que permaneçam disponíveis mesmo ao recarregar a página.

## 🛠 Tecnologias utilizadas

- **React.js**
- **Styled Components**
- **React Router DOM**
- **Axios** (para consumir a API do GitHub)
- **Local Storage** (para armazenar repositórios adicionados pelo usuário)

## 📦 Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/Mktvbr/paginasderepositorios.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd paginasderepositorios
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o projeto:
   ```bash
   npm start
   ```

## 🔗 API do GitHub

O projeto consome a API do GitHub para buscar informações sobre os repositórios e suas issues. As requisições são feitas utilizando Axios.

## 💾 Uso do Local Storage

Para melhorar a experiência do usuário, este projeto utiliza o **Local Storage** do navegador para armazenar os repositórios adicionados. Isso significa que:

- Os repositórios adicionados não são perdidos ao recarregar a página.
- O Local Storage armazena os dados em formato JSON.
- Sempre que um novo repositório é adicionado ou removido, a lista é atualizada no Local Storage automaticamente.
- Essa funcionalidade melhora a usabilidade e torna o projeto mais profissional.


## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e modificá-lo como quiser.

---

Se tiver alguma sugestão de melhoria ou quiser contribuir, fique à vontade para abrir um pull request! 😊

