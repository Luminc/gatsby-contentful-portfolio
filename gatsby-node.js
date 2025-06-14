/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const ProjectPageTemplate = path.resolve("./src/templates/project.js");
  const BlogPostTemplate = path.resolve("./src/templates/blogPost.js");

  // Create project pages
  const projectResult = await graphql(`
    {
      allContentfulProject(sort: { fields: year, order: DESC }) {
        edges {
          node {
            url
            title
            id
            featuredImage {
              gatsbyImageData(width: 600)
            }
          }
        }
      }
    }
  `);

  if (projectResult.errors) {
    reporter.panicOnBuild(`Error while running Project GraphQL query.`);
    return;
  }

  const ProjectPages = projectResult.data.allContentfulProject.edges;
  ProjectPages.forEach(({ node }, index) => {
    createPage({
      path: `/projects/${node.url}`,
      component: ProjectPageTemplate,
      context: {
        id: node.id,
        prev: index === 0 ? null : ProjectPages[index - 1].node,
        next:
          index === ProjectPages.length - 1
            ? null
            : ProjectPages[index + 1].node,
      },
    });
  });

  // Create blog post pages
  const blogResult = await graphql(`
    {
      allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
        edges {
          node {
            url
            title
            id
            featuredImage {
              gatsbyImageData(width: 600)
            }
          }
        }
      }
    }
  `);

  if (blogResult.errors) {
    reporter.panicOnBuild(`Error while running Blog GraphQL query.`);
    return;
  }

  const BlogPosts = blogResult.data.allContentfulBlogPost.edges;
  BlogPosts.forEach(({ node }, index) => {
    createPage({
      path: `/blog/${node.url}`,
      component: BlogPostTemplate,
      context: {
        id: node.id,
        prev: index === 0 ? null : BlogPosts[index - 1].node,
        next:
          index === BlogPosts.length - 1
            ? null
            : BlogPosts[index + 1].node,
      },
    });
  });

  // Add new query for Flexible Content
  const flexibleResult = await graphql(`
    query {
      allContentfulFlexibleContent {
        nodes {
          id
          slug
        }
      }
    }
  `);

  // Create pages for new flexible content
  flexibleResult.data.allContentfulFlexibleContent.nodes.forEach(node => {
    createPage({
      path: `/content/${node.slug}`,
      component: require.resolve('./src/templates/flexibleContent.js'),
      context: { id: node.id },
    });
  });
};
