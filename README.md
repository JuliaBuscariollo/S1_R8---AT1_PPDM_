# Trabalho Julia e Gabriel

Aplicativo Expo/React Native para consultar países usando a API REST Countries.

## Como executar

```bash
npm install
npx expo start
```

Depois escolha Android, iOS ou abra no navegador.

## Estrutura

- `src/app/index.jsx` — tela inicial
- `src/app/paises.jsx` — lista e pesquisa de países
- `src/app/detalhesPais.jsx` — detalhes do país
- `src/app/_layout.jsx` — navegação do Expo Router

O projeto usa somente Expo Router. Não é necessário `@react-navigation/native`.
