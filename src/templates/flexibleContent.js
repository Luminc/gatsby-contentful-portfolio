import React from 'react';
import { graphql } from 'gatsby';
import { Container } from 'react-bootstrap';
import { FlexibleLayout } from '../components/flexible-layout';
import { SEO } from '../components/seo';
import { Layout } from '../components/layout';

const FlexibleContent = ({ data }) => {
  const { contentfulFlexibleContent } = data;
  const { title, sections } = contentfulFlexibleContent;

  return (
    <Layout>
      <SEO title={title} />
      <Container>
        <h1 className="display-4 mb-4">{title}</h1>
        <FlexibleLayout sections={sections} />
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query FlexibleContentQuery($id: String!) {
    contentfulFlexibleContent(id: { eq: $id }) {
      title
      sections {
        type
        layout
        content {
          text {
            raw
          }
          image {
            url
            title
          }
          video {
            url
            title
            autoplay
          }
          gallery {
            url
            title
          }
          quote {
            text
            author
            style
          }
          embed {
            url
            type
          }
        }
        styling {
          backgroundColor
          textColor
          padding
          margin
        }
        order
      }
    }
  }
`;

export default FlexibleContent; 