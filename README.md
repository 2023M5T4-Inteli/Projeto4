
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
|--> src<br>
  &emsp;|--> Backend<br>
  &emsp;|--> Frontend<br>
  &emsp;|--> Smart_Contracts<br>
| readme.md<br>


Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

readme.md: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

documentos: aqui estão todos os documentos do projeto. Há também uma pasta denominada outros onde estão presentes outros documentos complementares.

src: todo o código fonte criado para o desenvolvimento do projeto, incluindo o Smart Contract, backend e frontend.

## 💻 Smart Contract 
Na solução proposta há dois atores que interagem com o sistema, sendo estes, a seguradora P2P (representada pela Coover) e o participante (cliente do seguro). Essa interação dos usuários acontece através do Front end, onde se encontra a lógica da interface, além disso para acessar as funcionalidades da aplicação é necessário se conectar a Metamask,  pois para realizar determinadas ações será necessário “assiná-la” (confirmar) usando a chave privada. 

No bloco Backend, há o sistema de dados da Coover, onde são armazenados dados pessoais de seus clientes,  que não podem ser publicados no smart contract, mas são necessários para definir a lógica de negócios do software. Por fim, a seguradora P2P (administradora) realiza o deploy do contrato (smart contract) na Ethereum Testenet, blockchain alternativa do Ethereum para testes globais. Nesse smar contract estará armazenado os fundos dos grupos mútuos e todas as regras de negócio, tais como a de pagamento de indenização. 

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
