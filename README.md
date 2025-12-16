# Luxe Barber Suite

Aplicação de exemplo "Luxe Barber Suite".

## Executando localmente

Requisitos: Node.js (>=16) e npm.

```powershell
git clone <SEU_GIT_URL>
cd <SEU_REPO>
npm install
npm run dev
```

## Publicar no GitHub Pages

Este repositório foi preparado para publicação estática no GitHub Pages.

Passos rápidos:

1. Crie um repositório no GitHub e envie (push) o código para a branch `main`.
2. No terminal, rode:

```powershell
npm install
npm run deploy
```

O comando `npm run deploy` vai gerar o build e publicar a pasta `dist/` na branch `gh-pages` usando o pacote `gh-pages`.

3. No GitHub, abra `Settings > Pages` e confirme que a fonte (source) está apontando para a branch `gh-pages`.

Seu site ficará disponível em `https://<SEU_USUARIO>.github.io/<SEU_REPO>/`.

Observação: se preferir publicar a partir da pasta `/docs` na branch `main`, altere o fluxo de build para gerar em `docs/` em vez de `dist/`.

## O que eu alterei

- Removi o uso de um pacote de marcação automática do `vite.config.ts`.
- Configurei `vite.config.ts` com `base: './'` para compatibilidade com GitHub Pages.
- Adicionei scripts `predeploy` e `deploy` em `package.json` que usam `gh-pages`.

## Próximos passos (opcional)

- Informe seu `SEU_USUARIO` e `SEU_REPO` se quiser que eu atualize o `homepage` em `package.json`.
- Se quiser, posso executar `npm install` aqui e atualizar o `package-lock.json` para remover referências antigas.

---
Se quiser que eu faça o push das alterações para um repositório remoto ou que eu rode `npm install` e atualize o lockfile, me diga o que prefere e eu executo os próximos passos.
