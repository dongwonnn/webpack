npm init
yarn add react react-dom
yarn add typescript
yarn add @types/react @types/react-dom
yarn add eslint prettier eslint-plugin-prettier eslint-config-prettier --dev

.eslintrc

.prettierrc

tsconfig.json

webpack.config.ts

yarn add webpack @babel/core babel-loader @babel/preset-env @babel/preset-react --dev
yarn add @types/webpack @types/node @babel/preset-typescript --dev
yarn add style-loader css-loader

명령어: webpack => webpack.config.ts 에 맞춰 실행

tsconfig-for-webpack-config.json으로 실행
build 시에 "build": "cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack",
yarn add cross-env
yarn add ts-node
yarn add webpack-cli

핫 리로딩 하기 위해 server가 필요
yarn add webpack-dev-server @types/webpack-dev-server --dev

yarn add @pmmmwh/react-refresh-webpack-plugin react-refresh

ts 체크와 webpack 실행 동시에
yarn add fork-ts-checker-webpack-plugin
