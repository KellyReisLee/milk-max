# milk-max

## Índice
1. [Sobre o Projeto](#sobre-o-projeto)
2. [Cores e Fontes](#cores-e-fontes)
3. [Como usar localmente](#como-usar)
4. [Erro: Failed building wheel for msgspec](#erro)
5. [Contribuições](#contribuições)
6. [Licença](#licença)


## Sobre o Projeto
O objetivo do nosso software é facilitar a vida dos pequenos produtores de leite, oferecendo uma solução completa e intuitiva para o controle e a gestão da produção. Sabemos que o dia a dia no campo é cheio de desafios, e que a rotina de monitorar a produção de leite, a saúde do rebanho e os dados financeiros pode ser complexa e demandar muito tempo. Pensando nisso, nosso software foi desenvolvido para automatizar e organizar esses processos, ajudando o produtor a ter um controle preciso sobre cada etapa.

Com nossa plataforma, o produtor consegue registrar a quantidade diária de leite produzida, acompanhar a saúde dos animais, monitorar custos e analisar os dados financeiros da produção de maneira simples e eficiente. O software oferece relatórios detalhados que auxiliam na tomada de decisões, ajudando o produtor a identificar oportunidades para melhorar a produtividade e a qualidade do leite. Além disso, a interface foi pensada para ser fácil de usar, possibilitando que produtores de diferentes perfis e com diferentes níveis de familiaridade com tecnologia possam aproveitar ao máximo as funcionalidades do sistema.

Em resumo, o software visa aumentar a eficiência e a rentabilidade da produção, tornando o processo de gestão mais ágil e organizado, e permitindo que o produtor foque no que realmente importa: o crescimento sustentável e a qualidade da produção de leite.


## Cores e Fontes
1. Cores texto: 
 - Azul_1 - #1051AB
 - Azul_2 - #007bff
 - Azul_3 - #0d6efd
 - Cinza_claro_1 - #EFEFED
 - Cinza_claro_2 - #e0e0e0
 - Cinza_claro_3 - #e0e0e0
 - Branco - #ffffff

2. Cores de fundo:
 - Azul_dark: #1051AB
 - Azul_light: #e7f2ff
 - Gray_light: #f8f9fa 

2. Fontes:
 - LEAGUE SPARTAN (GOOGLE FONTS) - HEADERS, TÍTULOS E BOTÕES 
COLAR CÓDIGO NO <head> DO HTML

 - OPEN SANS (GOOGLE FONTS) - CORPO DO TEXTO, PARÁGRAFOS, INFORMAÇÕES <head> DO HTML

## Como usar
Se quiser acessar o site na web, ele está hospedado em um servidor gratuito, disponível no endereço: https://milkmax.onrender.com.
A primeira requisição pode demorar alguns instantes, pois o servidor estará inicializando.

1. Abra o VSCode no seu computador.
Se ainda não instalado, instale em: https://code.visualstudio.com

2. Certifique-se de quem tem instalado o controlador de versionamento local Git e que ele está conectado à sua conta no Github

3. Busque os arquivos dentro do repositório milkmax, no endereço: https://github.com/KellyReisLee/milk-max
Você pode utilizar o comando: git clone https://github.com/KellyReisLee/milk-max

4. Certifique-se de que tem instalado o python em sua máquina. Se estiver com problemas para rodar o projeto, use o python 3.12.4
4.1. Verifique a instalação com o comando: python --version ou python3 --version
4.2. Caso não apareça a versão python instalada, baixe no site oficial: https://www.python.org/downloads/release/python-3124/.
Desça até a seção Files e veja a versão recomendada. Clique no respectivo link da coluna Version
No instalador, certifique-se de marcar a opção "Add Python to PATH".
Certifique-se também de que a opção install pip está marcada.
Escolha um diretório diferente de onde sua versão padrão python está instalada
4.4. Verifique a instalação: python --version
4.5. Verifique a instalação do pip: pip --version

5. Crie um ambiente virtual dentro da pasta milkmax.
5.1. No VSCode, clique em: File -> Open Folder -> localize o diretorio do projeto milk-max
5.2. Digite o comando: python3.12 -m venv venv
5.3. Ative o venv. No windows: venv\Scripts\activate ; No Linux source venv/bin/activate
5.4. Aperte o atalho: Ctrl + Shift + P e digite: Python: Select Interpreter
5.5. Escolha a versão 3.12.4, localizada no venv. Se não estiver aparecendo,
clique em 'Enter Interpreter path...' e digite o caminho para o interpretador python (ex.: milkmax/venv)
5.6. Agora todo terminal que você abrir no diretório do projeto deve estar com o venv automaticamente ativo

6. Instale os pacotes necessários para o projeto.
Execute em seu terminal: pip install -r requirements.txt

7. Leia o arquivo 'CONF_BANCO' para entender como criar um banco de dados conectado ao site.
Observe que no arquivo 'app.py' as suas configurações em '.env' serão requisitadas

8. Leia o arquivo 'CONF_MAIL' para entender como configurar um email para envio e recebimento automáticos

9. Execute no terminal: python app.py para rodar o site

10. Os códigos html que estão presentes em todas as páginas, contendo a navbar e afins,
estão dispostos no arquivo "layout.html"

## Erro msgspec
Quando você executa app.py, caso apareça o erro: 'ERROR: Failed building wheel for msgspec',
execute em seu terminal: pip install git+https://github.com/jcrist/msgspec.git

## Contribuições:
Agradecemos a todos que colaboraram para o desenvolvimento deste projeto:

- [Enrique Fernandes](https://github.com/enrique-fcnr)
- [Gabriel Eduoli](https://github.com/gabrieleduoli)
- [Gabriel Pacheco](https://linkedin.com/in/username3)
- [Kelly Reis Lee](https://github.com/KellyReisLee)
- [Millene Russo](https://github.com/millennium164)





