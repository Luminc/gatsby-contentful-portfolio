import React from 'react';
import { graphql } from 'gatsby';
import { Container } from 'react-bootstrap';
import { FlexibleLayout } from '../components/flexible-layout';
import { SEO } from '../components/seo';
import { Layout } from '../components/layout';

const BlogPost = ({ data }) => {
  const { contentfulBlogPost } = data;
  const { title, sections, date } = contentfulBlogPost;

  return (
    <Layout>
      <SEO title={title} />
      <Container>
        <h1 className="display-4 mb-4">{title}</h1>
        <p className="text-muted mb-5">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <FlexibleLayout sections={sections} />
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostQuery($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
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
      # Blog Post specific fields
      date
      author
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

export default BlogPost; 