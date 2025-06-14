import React from 'react';
import { graphql } from 'gatsby';
import { Container } from 'react-bootstrap';
import { FlexibleLayout } from '../components/flexible-layout';
import { SEO } from '../components/seo';
import { Layout } from '../components/layout';

const Project = ({ data }) => {
  const { contentfulProject } = data;
  const { title, sections } = contentfulProject;

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
  query ProjectQuery($id: String!) {
    contentfulProject(id: { eq: $id }) {
      # Inherited fields from Base Content
      title
      slug
      seo {
        title
        description
        image {
          url
        }
      }
      # Project specific fields
      date
      medium
      materials
      featuredImage {
        url
        title
      }
      # Sections from Base Content
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

export default Project; 