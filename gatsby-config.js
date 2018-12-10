module.exports = {
  plugins:     [{
    resolve: 'gatsby-plugin-typography',
    options: {
      pathToConfigModule: 'src/utils/typography.js',
    },
  },
  {
    resolve: 'gatsby-plugin-eslint',
    options: {
      options: {
        emitWarning: true,
        failOnError: false
      }
    }
  },
  {
    resolve: 'gatsby-plugin-web-font-loader',
    options: {
      google: {
        families: ['Roboto Slab:300']
      }
    }
  }
  ]
};
