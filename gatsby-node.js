const {projects, articles} =  require('./content')

exports.createPages = async ({ actions: { createPage } }) => {
  createPage({
    path: `/`,
    component: require.resolve("./src/templates/index.js"),
    context: { projects, articles },
  })
}