# seu-nome-ifsc

Extensão de navegador (userscript para **Tampermonkey**) que, no **SIGAA do IFSC** ([https://sig.ifsc.edu.br/sigaa/](https://sig.ifsc.edu.br/sigaa/)), mostra na **sua tela** o nome pelo qual a pessoa é reconhecida, em lugar do nome que ainda consta em cadastros institucionais.

**Importante:** isso altera apenas o que você vê no navegador. **Não** atualiza o cadastro no SIGAA nem em outros sistemas. A correção oficial continua sendo a atualização cadastral junto à instituição.

---

## Por que isso importa

Sistemas acadêmicos costumam exibir o **nome registrado em documentos antigos** ou em bases que ainda não foram atualizadas. Para pessoas **trans**, em **transição de gênero** ou que passaram a usar outro nome social, ver repetidamente um nome que não as representa pode ser desconfortável, invasivo ou até colocar em risco em contextos em que a identidade não é conhecida.

Usar o **nome correto** — o nome social ou pelo qual a pessoa é reconhecida no dia a dia — é uma questão de **respeito, dignidade e inclusão**. Enquanto o cadastro institucional não reflete essa realidade, ferramentas como esta ajudam quem apoia ou convive com essas pessoas (colegas, monitores, docentes em atividades em grupo) a **não reproduzir na interface** um nome que a pessoa não usa mais.

Este projeto existe para uso **pessoal e consciente**: configure apenas substituições que a própria pessoa autorizou ou que você precisa para não expor indevidamente o nome antigo em demonstrações e telas compartilhadas.

---

## O que o script faz hoje

No SIGAA, substitui localmente (exemplos já configurados no script):

| Nome exibido no sistema | Nome mostrado na sua tela |
|-------------------------|---------------------------|
| ARTHUR FRANCO DOS SANTOS | FERNANDA CRISTINA FRANCO |
| KAUE MARTINS FARIAS | KAMI MARTINS FARIAS |

Para incluir outras pessoas, edite o array `SUBSTITUICOES` no arquivo `seu-nome-ifsc.user.js`:

```javascript
const SUBSTITUICOES = [
  { de: "NOME COMO VEM NO SIGAA", para: "NOME PELO QUAL A PESSOA É RECONHECIDA" },
];
```

A correspondência é **exata** (mesmas letras maiúsculas/minúsculas e espaços que aparecem na página). Se não funcionar, copie o texto diretamente do SIGAA.

---

## 1. Instalar o Tampermonkey

O Tampermonkey é um gerenciador de **userscripts** (pequenos programas que rodam em páginas específicas).

1. Abra o site oficial: [https://www.tampermonkey.net/](https://www.tampermonkey.net/)
2. Clique em **Download** e escolha o navegador que você usa:
   - **Google Chrome** ou **Microsoft Edge**: instale pela loja de extensões indicada no site.
   - **Mozilla Firefox**: instale pelo complemento indicado no site.
3. Confirme a instalação quando o navegador pedir permissão para adicionar a extensão.

Depois da instalação, deve aparecer o ícone do Tampermonkey na barra de ferramentas do navegador.

---

## 2. Permitir o Tampermonkey e scripts no site

### Extensão ativa

- Clique no ícone do Tampermonkey e verifique se a extensão está **ligada** (não desabilitada nas configurações do navegador).

### Chrome e Edge — modo desenvolvedor (se precisar instalar de arquivo)

Se no futuro você instalar scripts a partir de arquivo `.user.js` em vez de colar no editor:

1. Abra `chrome://extensions` (Chrome) ou `edge://extensions` (Edge).
2. Ative **Modo do desenvolvedor** / **Developer mode**.
3. Use as opções do Tampermonkey para importar o arquivo, se aplicável.

Para o método **colar o script** (abaixo), o modo desenvolvedor **não** é obrigatório.

### Firefox

- Em `about:addons`, confirme que o Tampermonkey está **habilitado**.
- O Firefox costuma permitir userscripts do Tampermonkey sem passos extras.

### Executar no SIGAA

- Na primeira vez que acessar [https://sig.ifsc.edu.br/sigaa/](https://sig.ifsc.edu.br/sigaa/) com o script instalado, o Tampermonkey deve mostrar que o script **seu-nome-ifsc** está ativo para esse site.
- Se o navegador bloquear extensões em páginas institucionais, verifique nas configurações da extensão se o Tampermonkey pode rodar em **todos os sites** ou pelo menos em `sig.ifsc.edu.br`.

Este script **não** precisa de permissões especiais (`@grant`) nem de “permitir scripts externos” além do uso normal do Tampermonkey: ele só altera o HTML já carregado na sua máquina.

---

## 3. Colar o script no Tampermonkey

1. Abra o arquivo **`seu-nome-ifsc.user.js`** deste repositório (pasta `ferramentas/seu-nome-ifsc/`).
2. Selecione **todo** o conteúdo (`Ctrl+A`) e copie (`Ctrl+C`).
3. Clique no ícone do Tampermonkey → **Painel de controle** / **Dashboard**.
4. Aba **Utilitários** ou botão **+** / **Create a new script** (criar novo script).
5. Apague o modelo que vier e **cole** o conteúdo copiado.
6. Salve (`Ctrl+S` ou o botão de salvar do editor do Tampermonkey).
7. Feche o editor e acesse o SIGAA; recarregue a página (`F5`) se já estiver aberta.

Você deve ver o script listado como **seu-nome-ifsc**, habilitado, com correspondência em `https://sig.ifsc.edu.br/sigaa/*`.

---

## 4. Testar

1. Entre no SIGAA com seu usuário habitual.
2. Navegue até uma tela onde apareça um dos nomes configurados (lista de turma, diário, etc.).
3. O nome na tela deve aparecer como o configurado em `para`.

Se não mudar:

- Confira se o texto no SIGAA é **idêntico** ao valor em `de` (copie da página).
- Veja no painel do Tampermonkey se o script está **ativado**.
- Recarregue a página ou abra em aba anônima **somente** se você também habilitar o Tampermonkey nesse modo (em geral extensões não rodam em anônimo por padrão).

---

## Privacidade e uso responsável

- As substituições ocorrem **somente no seu computador**.
- Não envie dados do SIGAA para servidores externos; este script não faz requisições de rede.
- Em **compartilhamento de tela** ou gravação, a pessoa que vê a transmissão verá o nome já substituído na sua máquina — combine com quem está sendo filmada ou apresentada se isso for desejado ou sensível.
- Para mudança **oficial** de nome nos sistemas do IFSC, siga os canais institucionais (secretaria, coordenação, atualização cadastral).

---

## Estrutura do projeto

```
ferramentas/seu-nome-ifsc/
  seu-nome-ifsc.user.js   # script para colar no Tampermonkey
  README.md               # este arquivo
```

---

## Licença e contribuição

Material de apoio no repositório `aulas` (IFSC). Ajustes de nomes e novos pares podem ser feitos editando `SUBSTITUICOES` no `.user.js` e incrementando `@version` no cabeçalho do script quando você distribuir cópias atualizadas.
