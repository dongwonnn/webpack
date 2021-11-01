import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

// production : 배포, development : 개발
const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  name: 'memoapp-fe',
  mode: isDevelopment ? 'development' : 'production',
  devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
    },
  },
  entry: {
    // 첫 시작
    app: './src/index',
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        // .tsx파일을 babel loader가 js로 변환한다.
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // 이 브라우저를 지원한다.
                targets: { browsers: ['last 2 chrome versions', 'IE 10'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            development: {
              plugins: [require.resolve('react-refresh/babel')],
            },
            production: {},
          },
        },
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // ts 관련
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: {
      //   files: "./src/**/*",
      // },
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
  ],
  output: {
    // build 폴더에 entry 지정 파일이 생성된다.
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build/',
  },
  //   devServer: {
  //     historyApiFallback: true,
  //     port: 3090,
  //     devMiddleware: { publicPath: '/build/' },
  //     static: { directory: path.resolve(__dirname) },
  //     proxy: {
  //       '/api/': {
  //         target: 'http://localhost:3095',
  //         changeOrigin: true,
  //         ws: true,
  //       },
  //     },
  //   },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(
    new ReactRefreshWebpackPlugin({
      overlay: {
        useURLPolyfill: true,
      },
    }),
  );
  //   config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: false }));
}
if (!isDevelopment && config.plugins) {
  //   config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  //   config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

export default config;
