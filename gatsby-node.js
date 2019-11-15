const {projects, articles, meta, urls, talks} = require('./content');

exports.createPages = async ({actions: {createPage}}) => {
  createPage({
    path: '/',
    component: require.resolve('./src/templates/index.js'),
    context: {talks, projects, articles, urls, meta: {...meta, pathname: '/'}},
  });
};
