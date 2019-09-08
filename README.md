# Scripted pages

Scripted Pages é um sistema algorítmico dedicado à geração de layouts de publicações impressas. Resumidamente, o sistema recebe como input o conteúdo da publicação (ficheiro Microsoft Word) e gera um layout para esse conteúdo (ficheiro Adobe InDesign). A composição dos conteúdos na página é feita com base em regras da macro e microtipografia recolhidas da literatura reconhecida na área da Tipografia e do Design Editorial. Estas regras foram apresentadas no capítulo anterior. Posteriormente, elas foram codificadas como regras no sistema e, assim, constituem o conhecimento do mesmo. Com base nestas regras e nos conteúdos o sistema percorre-as uma a uma e toma decisões na composição passo a passo.

## Instalação

Para proceder à instalação do sistema, inicialmente, é necessário efetuar o download do mesmo. Este pode ser feito através da pasta Scripted Pages.
O download inclui uma pasta a Scripted Pages que contém o sistema e o ficheiro Scripted Pages Menu que permite criar um menu para uma mais fácil utilização do mesmo. Para instalar o sistema é apenas necessário colocar a pasta Scripted Pages na pasta Scripted Panels do InDesign. Esta pasta encontra-se na seguinte localização /Applications/Adobe InDesign CC 2019/Scripts/Scripts Panel. Para criar o menu dedicado ao sistema o processo é semelhante. É preciso colocar apenas o ficheiro scripted_ pages_menu.jsx na pasta Startup Scripts. A pasta Startup Scripts encontra-se na seguinte localização: /Applications/Adobe InDesign CC 2019/Scripts/startup scripts. A criação deste menu oferece duas vantagens: uma mais fácil e natural utilização do mesmo; e acesso direto a uma página sobre o projeto, útil em caso de dúvidas, ou caso se queira aceder ao código base do mesmo.
Depois deste processo, caso o InDesign esteja aberto, deve ser reiniciado de forma a verificar se o sistema está corretamente instalado. Para isso começa-se por abrir o painel de scripts através do menu Window → Utilities → Scripts panel e verificar se a pasta se encontra neste. Em seguida, é necessário verificar se está criado o menu Scripted Pages, localizado do lado esquerdo do menu Help. Caso se verifiquem estes dois pontos, o sistema encontra-se, então, pronto a usar.

## Testes

A pasta Scripted Pages inclui ainda uma pasta "Documents to test" que inclui 3 ficheiros word, com e sem imagens que podem ser usados para testar o sistema.
