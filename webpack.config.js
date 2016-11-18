var config = {
   entry: './dev/js/react_components/main.js',
    
   output: {
      path:'./',
      filename: 'index.js',
   },
    
   devServer: {
      inline: true,
      port: 8080
   },
    
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
                
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;
