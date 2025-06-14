import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Container from "react-bootstrap/Container";
import ContentLayout from "../components/content-layout";

const BlogPost = ({ data }) => {
  const image = getImage(data.contentfulBlogPost.featuredImage.gatsbyImageData);

  // Transform blog post content into the shared layout format
  const transformContent = (post) => {
    const sections = [];

    // Add featured image as first section if it exists
    if (post.featuredImage) {
      sections.push({
        __typename: "ContentfulImageSection",
        id: "featured-image",
        layout: "full",
        width: "wide",
        alignment: "center",
        image: post.featuredImage,
        aspectRatio: "auto"
      });
    }

    // Add main content as text section
    if (post.content) {
      sections.push({
        __typename: "ContentfulTextSection",
        id: "main-content",
        layout: "full",
        width: "medium",
        alignment: "left",
        content: post.content
      });
    }

    // Add any additional sections
    if (post.sections) {
      sections.push(...post.sections);
    }

    return sections;
  };

  return (
    <Layout pageTitle={data.contentfulBlogPost.title}>
      <Container fluid="xxl">
        <h1 className="text-center display-1 py-2">
          {data.contentfulBlogPost.title}
        </h1>
        <p className="text-center project-subtitle pb-5">
          {new Date(data.contentfulBlogPost.publishDate).toLocaleDateString()}
        </p>
      </Container>

      <ContentLayout
        content={transformContent(data.contentfulBlogPost)}
        defaultWidth="medium"
        defaultSpacing="normal"
      />
    </Layout>
  );
};

export const data = graphql`
  query ($id: String) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      publishDate
      featuredImage {
        gatsbyImageData(layout: FULL_WIDTH)
        description
      }
      content {
        raw
      }
      sections {
        __typename
        ... on ContentfulTextSection {
          id
          layout
          width
          alignment
          columnSpan
          content {
            raw
          }
        }
        ... on ContentfulImageSection {
          id
          layout
          width
          alignment
          columnSpan
          aspectRatio
          image {
            gatsbyImageData
          }
          title
          alt
        }
        ... on ContentfulMediaSection {
          id
          layout
          width
          alignment
          columnSpan
          columns
          spacing
          media {
            __typename
            ... on ContentfulImage {
              id
              title
              gatsbyImageData
            }
            ... on ContentfulVideo {
              id
              url
              title
              muted
            }
            ... on ContentfulCarousel {
              id
              interval
              pause
              controls
              indicators
              title
              images {
                id
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.contentfulBlogPost.title} />;

export default BlogPost; 