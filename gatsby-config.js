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
  ]
};
