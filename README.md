# Projeto - Contatos

Projeto que tem como objetivo, em uma página Cadastrar usuários utilizando um formulário e em outra página Listar, Editar e Excluir os usuários cadastrados.

### Ferramentas

Projeto criado com React.JS e typescript, para estilização foi utilizado o pre-processador SASS, para roteamento de páginas foi utilizado o react-router-dom, para mensagens de sucesso ao usuário foi utilizado o react-toastify, para validação dos dados foi utilizado o yup e o material-ui para construção do formulário.

### Solução

Em um primeiro momento foi utilizado o axios (biblioteca para conexão com back-end) para que fosse pré-carregado uma lista inicial na listagem dos usuários. Essa lista foi persistida no localStorage, para que no momento que um novo usuário fosse cadastrado fosse também utilizado esse mesmo localStorage para o mesmo adicionado. Páginas totalmente responsivas.

### Executar local

Introdução de como executar o projeto local em sua máquina:

```shell
git clone git@github.com:leopacciulli/lista-contatos.git
cd lista-contatos
yarn start
```

### Feito por - Leonardo Pacciulli
