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

- comando de build: `pnpm run build`;
- pasta de publicação: `out`;
- Node.js 22.13.0;
- geração totalmente estática.

## Desenvolvimento local

Requisitos: Node.js 22.13 ou superior e pnpm 11.

```bash
pnpm install
pnpm dev
```

Para recriar a pasta pronta para deploy:

```bash
pnpm run build
```

## Estrutura

- `app/`: conteúdo, interações e estilos.
- `public/`: imagens e recursos públicos.
- `out/`: site compilado para deploy manual.
- `netlify.toml`: configuração de deploy da Netlify.
- `package.json` e `pnpm-lock.yaml`: dependências e comandos do projeto.

Durante builds realizados pela Netlify, os metadados sociais usam automaticamente o endereço definitivo do site. Fora da Netlify, é possível definir `NEXT_PUBLIC_SITE_URL` para indicar outro domínio.
