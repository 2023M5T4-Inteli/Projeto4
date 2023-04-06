
# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Seguros mútuos com Smart Contracts via Blockchain

## P2Chain

- <a href="https://www.linkedin.com/in/gabriela-de-morais-da-silva-467b29238/">Gabriela de Morais da Silva	</a>
- <a href="https://www.linkedin.com/in/lucas-britto-376665208/">Lucas de Britto Vieira	</a>
- <a href="https://www.linkedin.com/in/gutopompeo/">Luiz Augusto Pompeo de Camargo Franco Ferreira	</a>
- <a href="https://www.linkedin.com/in/raduanmuarrek/">Raduan Oliveira Galli Muarrek	</a>
- <a href="https://www.linkedin.com/in/sophia-dias/">Sophia Mello Dias	</a>
- <a href="https://www.linkedin.com/in/vitor-moura-de-oliveira/">Vitor Moura de Oliveira	</a>

## 📝 Descrição da solução 

Uma solução em blockchain Ethereum foi proposta para criar grupos de seguro mútuo eficientes, baratos e seguros. Os grupos são formados por pessoas que se unem para se proteger contra riscos predeterminados e são autoadministrados em certa medida. A administração do grupo é feita através de smart contracts que executam automaticamente as condições acordadas pelas partes. Todas as regras de negócio e reservas financeiras são mantidas no contrato inteligente. Os usuários interagem com o sistema por meio de uma aplicação em Web 3, que inclui uma área do cliente para adesão, pagamento e pedido de indenização, e uma área da seguradora P2P para configuração e criação de novos grupos e atuação no processo de indenização. A seguradora apenas opera os grupos mútuos e não assume o risco como é feito no seguro privado.

## 📁 Estrutura de pastas


|--> documentos<br>
  &emsp;| --> outros <br>
  &emsp;| DocumentaçãoProjetoModulo5.docx.pdf<br>
|--> backend<br>
|--> frontend<br>
&emsp;|--> coover<br>
&emsp;&emsp;|--> src<br>
&emsp;&emsp;&emsp;|--> assets<br>
&emsp;&emsp;&emsp;|--> components<br>
&emsp;&emsp;&emsp;|--> contexts<br>
&emsp;&emsp;&emsp;|--> HOC<br>
&emsp;&emsp;&emsp;|--> pages<br>
&emsp;&emsp;&emsp;|--> styles<br>
|--> contracts<br>
| readme.md<br>


Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

Estruturação do frontend:
- assets: diretório para armazenar os arquivos usados para compor a página
- components: diretório para armazenar os componentes usados para compor a página
- contexts: diretório utilizado para compartilhar dados considerados globais 
- HOC: diretório de autenticação
- pages: diretório para armazenar as páginas do site
- styles: diretório para armazenar os códigos de estilização das páginas do site

readme.md: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

documentos: aqui estão todos os documentos do projeto. Há também uma pasta denominada outros onde estão presentes outros documentos complementares.

src: todo o código fonte criado para o desenvolvimento do projeto, incluindo o Smart Contract, backend e frontend.

## 💻 Smart Contract 
A administração do grupo será realizada através de smart contracts, que são programas que se executam de forma automática assim que certas condições acordadas previamente pelas partes são atendidas. Nesse sentido, todas as regras de negócio e as reservas financeiras serão mantidas neste contrato inteligente. 

## Requisitos de negócio:
No smart contract seguimos as seguintes regras de negócio em nosso código;
- Regra de negócio 1:  A Coover é definida como dona e administradora do contrato, devendo estabelecer os membros deste e seus IMEIs dos aparelhos protegidos, assim como a taxa administrativa.
- Regra de negócio 2:  Os membros no deploy do contrato, devem realizar um pagamento inicial . Todo e qualquer valor deve ser depositado em ETH. O primeiro aporte deve ser referente ao percentual mínimo do valor protegido(definido pela Coover e específico de cada grupo, desse valor será separado uma porcentagem, também definida pelo criador do contrato, relativo à taxa administrativa); sem esse pagamento não é possível entrar no grupo. 
- Regra de negócio 3: A Coover deve aprovar a indenização de um segurado e, a partir disso, é informado a carteira dele. O hash do segurado em que o sinistro ocorreu deve ser igual ao que está armazenado no contrato de sua carteira para que seja concretizado. Além disso, o cliente deve anexar um B.O sobre o “por quê” do pedido, com isso o administrador da Coover analisa o documento e “aprova” ou “recusa” a proposta. 
- Regra de negócio 4:  A Coover pode retirar a taxa administrativa a qualquer momento.
- Regra de negócio 5: O cliente deve conseguir ver seu valor de reserva para conferir o valor protegido do seguro.
- Regra de negócio 6: O cliente deve conseguir repor sua reserva. Todo e qualquer valor deve ser depositado em ETH. A reserva de risco deve atingir o percentual mínimo do valor protegido(definido pela Coover e específico de cada grupo, desse valor será separado uma porcentagem, também definida pelo criador do contrato, relativo à taxa administrativa);

## Diagrama de Blocos

O diagrama de blocos da solução quebra o projeto em partes menores e mais gerenciáveis, representadas por blocos ou módulos. Isso ajuda na compreensão da estrutura e dos componentes da solução por meio de uma representação visual simplificada.

![image](https://github.com/2023M5T4-Inteli/Projeto4/blob/main/imgs/diagramadeblocos.png)

Na solução proposta há dois atores que interagem com o sistema, sendo estes, a seguradora P2P (representada pela Coover) e o participante (cliente do seguro). Essa interação dos usuários acontece através do Front end, onde se encontra a lógica da interface, além disso para acessar as funcionalidades da aplicação é necessário se conectar a Metamask,  pois para realizar determinadas ações será necessário “assiná-la” (confirmar) usando a chave privada. 

No bloco Backend, há o sistema de dados da Coover, onde são armazenados dados pessoais de seus clientes,  que não podem ser publicados no smart contract, mas são necessários para definir a lógica de negócios do software. Por fim, a seguradora P2P (administradora) realiza o deploy do contrato (smart contract) na Ethereum Testenet, blockchain alternativa do Ethereum para testes globais. Nesse smar contract estará armazenado os fundos dos grupos mútuos e todas as regras de negócio, tais como a de pagamento de indenização. 

## UML
Os diagramas UML abaixo representam como o sistema funciona, retratando como os atores (Seguradora P2P e Participante) interagem com as funcionalidades da aplicação (evidenciando resultados ou respostas), tais como: criação de smart contract, pedido de indenização e reposição da reserva de risco. Os diagramas UML são importantes para alcançar maior clareza no comportamento esperado para o smart contract, definindo suas entradas e respostas.

![image](https://github.com/2023M5T4-Inteli/Projeto4/blob/main/imgs/indenizacaoaceita.png)

Para a “indenização”, entendemos primeiro no âmbito de negócios. O usuário somente irá realizar essa ação quando ele for roubado e quiser requisitar a indenização. Nesse caso, teremos uma primeira fase de cadastro completo na MetaMask com login e autenticação e, posteriormente, a fim de validar que o celular roubado realmente está cadastrado no contrato, o usuário deverá fornecer o IMEI do celular através do nosso frontend. Esses são os passos necessários para o usuário encontrar e informar os dados pré requisitados. 

Após esse processo inicial, pode-se seguir para a requisição em si, etapa em que o usuário enviará o B.O. pelo front-end, este que será repassado para a seguradora a fim de possibilitar a validação do pedido por uma instituição confiável. Em caso de aceite da indenização, o smart contract deve ressarcir o usuário através do endereço de carteira enviado.


![image](https://github.com/2023M5T4-Inteli/Projeto4/blob/main/imgs/indenizacao.png)

Para a “indenização não aceita” temos o diagrama encurtado, nesse caso, teremos uma primeira fase de cadastro completo na MetaMask com login e autenticação. Seguindo os passos do UML anterior,o  usuário deverá fornecer o IMEI do celular através do nosso frontend. 

Posteriormente ao usuário enviar o B.O. pelo front-end, este que será repassado para a seguradora a fim de possibilitar a validação do pedido por uma instituição confiável, considerando que a seguradora recuse o pedido, uma notificação de pedido negado será retornada ao usuário.


![image](https://user-images.githubusercontent.com/99191909/221442894-34149d9c-e346-44f5-b74a-b500e8c253a1.png)

Para a reposição de reserva de risco, considerando o escopo limitado do projeto, o usuário poderá repor uma vez que um cliente do mesmo grupo do seguro mútuo for roubado e tiver sua indenização aceita, sendo assim, o usuário pode examinar através do front-end se a sua carteira possui uma porcentagem satisfatória do LMI (Limite máximo indenizável).

No caso do cliente estar insatisfeito com o seu saldo, ele poderá depositar dinheiro através de sua Meta Mask e, logo em seguida, transferir para o contrato, atualizando assim seu montante financeiro dentro das regras do smart contract. Então o front end irá informar ao cliente que o saldo foi atualizado.


![image](https://user-images.githubusercontent.com/99191909/221442908-b5061f90-6310-4b9c-8f57-f40b262708b1.png)

Para a criação de smart contract, partindo do princípio que será uma atividade administrativa, a criadora e owner seria a Coover.

O processo de criação começa com a criadora informando como será o seguro, seja de maneira técnica exibindo o código do contrato, como também comercial, informando no front-end valores como taxa administrativa, faixa de preço, e valor percentual mínimo. A entidade “Pré-ativação” se refere à funcionalidade de construir o esqueleto de um contrato antes que ele seja publicado, possibilitando que o cliente se informe dos valores do contrato e a seguradora monitore a quantidade de clientes inseridos/interessados naquele contrato.

Depois desse processo, a Coover parte para encontrar e atrair usuários para o grupo de seguro, alocando eles para o contrato, conseguindo assim termos a pré ativação do contrato, que é informado ao criador.
Depois desses pré-requisitos, o grupo P2P é confirmado pela seguradora, que ativa o contrato e logo em seguida faz o deploy na rede do ethereum. A fim de executar uma prova de conceito, o deploy será feito na testnet.

## Deploy
Para a realização do deploy seguimos o tutorial do <a href="https://github.com/InteliBlockchain/InteliBlockchain/tree/main/tutoriais/Truffle%20-%20Deploy%20e%20compila%C3%A7%C3%A3o%20de%20contrato%20em%20Solidity">Inteli Blockchain	</a> . Utilizamos a testnet pública (Goerli), Development Suite Truffle e ETH da Faucet Goerli. A Goerli é uma rede de testes da Ethereum que usa Proof of Authority (PoA) ao invés de Proof of Work (PoW), permitindo que desenvolvedores possam testar contratos inteligentes sem gastar muito tempo e dinheiro validando transações. 
Além disso, a Goerli disponibiliza uma faucet que fornece ETH de teste gratuitamente, tornando-a uma opção segura e econômica para testes antes de implementar na rede principal. 
Por outro lado, o Truffle é uma suíte de ferramentas para desenvolvimento de contratos inteligentes na Ethereum que auxilia os desenvolvedores a escrever, testar, implantar e gerenciar esses contratos de maneira mais simples e eficiente.
 
Esses foram os passos resumidamente:
- 1- Ter NodeJs, Git e VSCode;
- 2- Instalar e iniciar o Truffle no Terminal CMD;
- 3- Criar o contrato em Solidity na pasta "contracts";
- 4- Criar o arquivo que fará o deploy do contrato na pasta "migrations" (o arquivo deve ser .js);
- 5- Criar o arquivo "package.json" e baixar bibliotecas que o contrato esteja usando no CMD;
- 6- Editar as informações do contrato que deseja realizar o deploy no arquivo criado em "migrations", informando os parâmetros para deploy e o nome do contrato (não do arquivo);
- 7- Selecionar a rede no arquivo "truffle-config.js" (a rede utilizada foi Goerli, então as linhas 85 a 91 foram descomentadas);
- 8-Instalar e criar o arquivo .env (descomentando as linhas 44 a 47 do arquivo "truffle-config.js") e adicioná-lo ao arquivo ".gitignore";
- 9- Adicionar a seed prhase da carteira Metamask que será o owner do contrato e a api key do Infura no arquivo ".env", além de alteral a variável, agora criada, nas linha 45 do "truffle-config.js";
- 10- Executar o comando "truffle deploy --network goerli" no CMD (garanta que a carteira Metamask tenha fundos GOERLI para pagar o gas do contrato).

Como seguem as imagens abaixo, esses são os resultados do deploy:


- ![image](https://github.com/2023M5T4-Inteli/Projeto4/blob/main/imgs/truffle-version.png)
- ![image](https://github.com/2023M5T4-Inteli/Projeto4/blob/main/imgs/wallet-metamask.png)


## Diagrama de implementação

O diagrama de classes de implementação fornece uma visão geral da estrutura do código-fonte do sistema, permitindo uma melhor compreensão da organização das classes e sua interação e ajuda na escalabilidade de projetos. A seguir está o Diagrama de implementação do projeto:


![image](https://github.com/2023M5T4-Inteli/Projeto4/blob/main/imgs/image%20(3).png)

Através do diagrama acima é possível visualizar a distribuição física do processamento do sistema. Onde é exposto como os hardwares (dispositivo do usuário e da seguradora) se relacionam com o software, em primeiro com a aplicação web (através do protocolo http), na qual está armazenada em um servidor em nuvem. E em segundo, com o smart contract (através do protocolo JSON-RPC, ou seja, de modo P2P), evidenciando como a comunicação é realizada com a Testnet Ethereum. 

## Diagrama da integração
Este diagrama UML representa um processo de integração envolvendo a criação de um smart contract por um usuário, a alocação de membros em grupos e a cobrança de uma taxa administrativa. O processo começa com o usuário criando um smart contract e inserindo informações relevantes no front-end usando React e Web3.js. O back-end, que utiliza a biblioteca Ethers, armazena dados sensíveis. O usuário cliente é convidado para se juntar ao smart contract e aceita o convite. Uma pop-up aparece para confirmar a pré-ativação do usuário, que então confirma. Em seguida, o front-end aloca os membros em grupos dentro do smart contract. Uma nova pop-up aparece para informar o usuário que ele deve pagar uma taxa administrativa. O usuário revisa os dados da transação da taxa, insere a quantidade necessária de ETH e confirma a transferência. O front-end, então, transfere a taxa para o smart contract. Uma nova pop-up informa o criador do smart contract que a taxa foi paga com sucesso. Em seguida, o usuário deve confirmar a conexão do MetaMask ao smart contract. Uma pop-up aparece para informar que a conexão foi estabelecida com sucesso. Por fim, o criador do smart contract ativa o smart contract.
![image](https://github.com/2023M5T4-Inteli/Projeto4/blob/main/imgs/Integracao.png)

## Vídeo Interface Web
[![Clique aqui para Assistir o vídeo](https://github.com/2023M5T4-Inteli/Projeto4/blob/main/imgs/comMusica.mp4)



## 🗃 Histórico de lançamentos

* 0.2.1 - 07/04/2023
    * Quinta entrega - Entrega Final
* 0.2.0 - 24/03/2023
    * Quarta entrega - 
* 0.1.1 - 10/03/2023
    * Terceira entrega - 
* 0.1.0 - 24/02/2023
    * Segunda entrega - Mockup e Smart Contract
* 0.0.1 - 10/02/2023
    * Primeira entrega - Modelo de negócios e arquitetura da solução

## 📋 Licença/License
<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/2023M5T4-Inteli/Projeto4">P2Chain  <a> by </a> <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/InteliProjects/.github/blob/main/profile/README.md">Inteli, <a href="https://www.linkedin.com/in/gabriela-de-morais-da-silva-467b29238/">Gabriela de Morais da Silva	</a>, <a href="https://www.linkedin.com/in/lucas-britto-376665208/">Lucas de Britto Vieira	</a>, <a href="https://www.linkedin.com/in/gutopompeo/">Luiz Augusto Pompeo de Camargo Franco Ferreira	</a>, <a href="https://www.linkedin.com/in/raduanmuarrek/">Raduan Oliveira Galli Muarrek	</a>, <a href="https://www.linkedin.com/in/sophia-dias/">Sophia Mello Dias	</a>, <a href="https://www.linkedin.com/in/vitor-moura-de-oliveira/">Vitor Moura de Oliveira	</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
