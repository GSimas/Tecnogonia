# Tecnogonia — projeto pronto para Netlify

Aplicação web bilíngue em formato scrollytelling baseada no livro *Tecnogonia*, de Gustavo Simas.

## Opção 1 — deploy manual, sem instalar nada

1. Entre na Netlify e escolha **Add new project** → **Deploy manually**.
2. Descompacte o ZIP.
3. Arraste somente a pasta `out` para a área de deploy da Netlify.

A pasta `out` já contém a aplicação compilada e pronta para publicação.

## Opção 2 — deploy contínuo com Git

1. Envie o conteúdo desta pasta para um repositório no GitHub, GitLab ou Bitbucket.
2. Na Netlify, escolha **Add new project** → **Import an existing project**.
3. Selecione o repositório e confirme.

O arquivo `netlify.toml` configura automaticamente:

- comando de build: `npm run build`;
- pasta de publicação: `out`;
- Node.js 22.13.0;
- geração totalmente estática.

## Desenvolvimento local

Requisito: Node.js 22.13 ou superior, que já inclui o npm.

```bash
npm install
npm run dev
```

Para recriar a pasta pronta para deploy:

```bash
npm run build
```

## Estrutura

- `app/`: conteúdo, interações e estilos.
- `public/`: imagens e recursos públicos.
- `out/`: site compilado para deploy manual.
- `netlify.toml`: configuração de deploy da Netlify.
- `package.json` e `package-lock.json`: dependências e comandos do projeto.

Durante builds realizados pela Netlify, os metadados sociais usam automaticamente o endereço definitivo do site. Fora da Netlify, é possível definir `NEXT_PUBLIC_SITE_URL` para indicar outro domínio.

## Atualização de um repositório que usava pnpm

Este pacote usa npm intencionalmente para evitar incompatibilidades entre versões antigas do Corepack e assinaturas recentes do pnpm.

Ao atualizar um repositório existente:

1. remova `pnpm-lock.yaml` e `pnpm-workspace.yaml` do repositório;
2. remova a propriedade `packageManager` antiga do `package.json`;
3. adicione `package-lock.json` e os demais arquivos deste pacote;
4. na Netlify, execute **Clear cache and deploy site**.

Se `pnpm-lock.yaml` continuar no repositório, a Netlify escolherá pnpm mesmo que `package-lock.json` também exista.
