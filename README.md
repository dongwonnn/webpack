> 매번 필요할 때마다, 궁금할 때마다 설정들을 가져와 사용만 하다 이번 기회에 저만의 프로젝트 webpack, babel 설정을 정리했습니다.
> webpack, babel 공식 문서를 참고해 작성했습니다.

#### [전체 설정 코드](https://github.com/dongwonnn/webpack)

## webpack 설정

### 공통 webpack 설정

개발, 배포용에서 **함께 사용할 수 있는 webpack 설정**입니다.

#### entry

**첫 시작 파일을 설정**하는 모듈입니다. `entry` 속성에 경로를 입력합니다. `build 시` 생성되는 파일의 이름을 동적으로 생성하기 위해 `[name] : 경로` 형식으로 설정할 수도 있습니다.

```javascript
// 일반적인 경우
entry: './src/index.tsx',

// 동적으로 설정할 때
entry: {
    app: './src/index.tsx'
}
```

#### output

**빌드 시 생성되는 결과물들을 설정**합니다.
`path: path.join(__dirname, "../dist")`을 이용해 절대 경로의 `dist` 폴더에 생성합니다.
**webpack을 통해 js로 모두 압축, 변환한 파일**을 `bundle.js`의 이름으로 생성합니다.
**clean 옵션을 이용해 일반적으로 사용하는 파일만 생성**되도록 합니다.

```javascript
output: {
  path: path.join(__dirname, "../dist"),
  filename: "bundle.js",
  publicPath: "/",
  clean: true,
},
```

### resolve

**모듈을 해석하는 방식**을 설정합니다. `extensions`의 배열 값들을 순차적으로 해석하고 `import` 할 때 확장자를 생략할 수도 있습니다.
`alias` 별칭을 이용해 상대 경로를 **절대 경로**로 바꿀 수도 있습니다. 아래의 경우 src 밑에 폴더들을 **@ 별칭을 이용해 절대 경로로 사용**합니다. ( 이 경우 `tsconfig`를 이용해 한 번 더 설정해야 합니다. )

```javascript
resolve: {
  extensions: [".ts", ".tsx", ".js"],
  alias: {
    "@": path.resolve(__dirname, "../src/"),
  },
},
```

### module

**다른 유형의 모듈들을 처리하는 방법**을 설정합니다. 다음 설정은 **TypeScript를 webpack과 통합**하는 방법입니다.
entey 파일의 `./index.ts` 안에 모든 `ts, tsx` 파일을 `ts-loader`를 이용해 로드합니다.

> `transpileOnly`를 이용해 타입 검사를 해제합니다. 대신 이 설정은 나중에 `plugins` 속성을 이용해 타입 검사를 활성화합니다. 이렇게 하는 이유는 각각의 프로세스로 이동시켜 빌드 시간을 개선할 수 있기 때문입니다.

이미지, 폰트, 아이콘과 같은 파일들은 `file-loader`를 이용해 로드, svg 파일의 경우 `@svgr/webpack`를 이용해 로드합니다.
( 이미지, 폰트, 아이콘, svg와 같은 경우 컴포넌트 형태로 사용하기 위해 custom.d.ts 파일을 통해 별도로 설정합니다. )

`rules`를 이용해 **여러 모듈들을 동시에 처리**할 수 있습니다.

```javascript
 module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.(png|jpe?g|gif|woff|woff2|ttf|ico)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.(svg)$/,
          use: [
            {
              loader: "@svgr/webpack",
            },
          ],
        },
      ],
    },
```

### plugins

**로더가 할 수 없는 것들을 설정**합니다.

#### forkTsCheckerWebpackPlugin

위에서 해제한 type 체크를 다시 활성화합니다.

### HtmlWebpackPlugin

html 파일에 script 태그를 이용해 js 파일을 삽입하지 않아도 자동으로 삽입되게 합니다.

```javascript
    plugins: [
      new forkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
```
