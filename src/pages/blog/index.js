import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createContentSnippet } from "../../utils/textUtils";
import styled from "styled-components";

const CardText = styled.p`
  max-width: 23em; // Approximately 23 words
  margin: 0 auto;
`;

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="Blog">
      <Container>
        <Row className="g-4">
          {data.allContentfulBlogPost.nodes.map((post) => {
            const image = post.featuredImage && getImage(post.featuredImage.gatsbyImageData);
            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedDate = new Date(post.publishDate).toLocaleDateString("en-GB", options);
            const contentSnippet = createContentSnippet(post.content?.raw);

            return (
              <Col key={post.id} md={6} lg={4}>
                <Link to={`/blog/${post.url}`} className="text-decoration-none">
                  <div className="card h-100">
                    {image && (
                      <GatsbyImage
                        image={image}
                        alt={post.featuredImage.description}
                        className="card-img-top"
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      {post.subtitle && (
                        <p className="card-text text-muted">{post.subtitle}</p>
                      )}
                      {contentSnippet && (
                        <CardText className="card-text">{contentSnippet}</CardText>
                      )}
                      <p className="card-text">
                        <small className="text-muted">{formattedDate}</small>
                      </p>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
};

export const data = graphql`
  query {
    allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
      nodes {
        id
        title
        subtitle
        url
        publishDate
        content {
          raw
        }
        featuredImage {
          gatsbyImageData(width: 600, height: 400, layout: CONSTRAINED)
          description
        }
      }
    }
  }
`;

export const Head = () => (
  <Seo
    title="Blog"
    description="Jeroen Kortekaas's blog exploring the metaxu—the dynamic and often equivocal 'between' where self and world, nature and technology, agency and passivity meet."
    keywords="Blog, Art, Philosophy, Research, Contemporary Art"
  />
);

export default BlogPage; 