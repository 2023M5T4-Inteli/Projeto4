Visando diminuir o custo de gas do projeto e sua escalabilidade, foi implantado um backend que está organizado da seguinte maneira:

|--> backend<br>
  &emsp;| --> database <br>
    &emsp;| mongoose.js<br>
  &emsp;|--> middleware<br>
    &emsp;| auth.js<br>
  &emsp;|--> models<br>
    &emsp;| indemnity.js<br>
    &emsp;| insurance.js<br>
    &emsp;| user.js<br>
  &emsp;|--> routes<br>
    &emsp;| indemnity.js<br>
    &emsp;| insurance.js<br>
    &emsp;| user.js<br>
  &emsp;| .env <br>
  &emsp;| index.js <br>

Foi utilizado o banco de dados MongoDB com a biblioteca Mongoose que possui três Schemas: users (relacionada aos usuários do sistema), insurance (relacionada aos grupos de seguro mútuo) e indenizações (relacionada às indenizações dos usuários). Tais Schemas mantém relações entre si de tal forma: cada grupo de seguro há diversos usuários (one to many) e cada usuário pode ter diversas indenizações em histórico (many to one). 

A partir disso foram construídas as rotas, separadas em arquivos as que se assemelham:
    - User: envolve cadastro de usuário, login e logout de usuário e de administrador, visualização de perfil e páginas de dashboard;
    - Insurance: envolve criação de um seguro, ativação do seguro, aceite de convite, visualização de todos os seguros por parte da administradora, visualização de um seguro e visualização do seguro que o usuário participa.
    - Indemnity: envolve pedir uma indenização, ver todas as indenizações por parte do administrador, ver uma indenização específica, aceitar/recusar e ver o histórico de indenizações por parte do usuário.

Por fim, foi estabelecido um sistema de autenticação do usuário para realizar as funções e também de administrador que garante a segurança do sistema, também utilizando cookies.