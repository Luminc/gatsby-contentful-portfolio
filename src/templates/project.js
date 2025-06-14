import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import ContentLayout from "../components/content-layout";

const LinkImageHover = styled.div`
  color: blue;
  &:hover {
    color: red;
  }
`;

const Project = ({ data, pageContext }) => {
  const { next } = pageContext;
  const { prev } = pageContext;

  const options = { year: "numeric", month: "long", day: "numeric" };
  const d2 = new Date(data.contentfulProject.date).toLocaleDateString(
    "en-GB",
    options
  );
  const d3 = new Date(data.contentfulProject.date).getFullYear();

  // Transform project content into the shared layout format
  const transformContent = (project) => {
    const sections = [];

    // Add featured image as first section if it exists
    if (project.featuredImage) {
      sections.push({
        __typename: "ContentfulImageSection",
        id: "featured-image",
        layout: "full",
        width: "wide",
        alignment: "center",
        image: project.featuredImage,
        aspectRatio: "auto"
      });
    }

    // Add main content as text section
    if (project.content) {
      sections.push({
        __typename: "ContentfulTextSection",
        id: "main-content",
        layout: "full",
        width: "medium",
        alignment: "left",
        content: project.content
      });
    }

    // Add materials as a text section if they exist
    if (project.materials) {
      sections.push({
        __typename: "ContentfulTextSection",
        id: "materials",
        layout: "full",
        width: "medium",
        alignment: "left",
        content: {
          raw: JSON.stringify({
            nodeType: "document",
            data: {},
            content: [
              {
                nodeType: "paragraph",
                data: {},
                content: [
                  {
                    nodeType: "text",
                    value: `Materials: ${project.materials}`,
                    marks: [],
                    data: {}
                  }
                ]
              }
            ]
          })
        }
      });
    }

    // Add date as a text section
    sections.push({
      __typename: "ContentfulTextSection",
      id: "date",
      layout: "full",
      width: "medium",
      alignment: "left",
      content: {
        raw: JSON.stringify({
          nodeType: "document",
          data: {},
          content: [
            {
              nodeType: "paragraph",
              data: {},
              content: [
                {
                  nodeType: "text",
                  value: `Date: ${d2}`,
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        })
      }
    });

    // Add any additional sections
    if (project.sections) {
      sections.push(...project.sections);
    }

    return sections;
  };

  return (
    <Layout pageTitle={data.contentfulProject.title}>
      <Container fluid="xxl">
        <p className="text-center project-subtitle pt-5">{d3}</p>
        <h1 className="text-center display-1 py-2">
          {data.contentfulProject.title}
        </h1>
        <p className="text-center project-subtitle pb-5">
          {data.contentfulProject.medium}
        </p>
      </Container>

      <ContentLayout
        content={transformContent(data.contentfulProject)}
        defaultWidth="medium"
        defaultSpacing="normal"
      />

      <Container>
        <div className="card-group align-items-end justify-content-between py-5 mt-4">
          {prev ? (
            <>
              <div className="card pagination-card d-none d-md-block">
                <Link to={`/projects/${prev.url}`} key={prev.id}>
                  <GatsbyImage
                    className="card-img"
                    image={prev.featuredImage.gatsbyImageData}
                    alt={prev.title}
                    objectFit="contain"
                  />
                </Link>
                <div className="card-body">
                  <Link to={`/projects/${prev.url}`} key={prev.id}>
                    <h5 className="card-title">&lt; {prev.title}</h5>
                  </Link>
                </div>
              </div>
              <div className="d-md-none">
                <Link to={`/projects/${prev.url}`}>Previous project &gt;</Link>
              </div>
            </>
          ) : (
            <div>
              <p className="card-title h2 grayed p2">&lt;</p>
            </div>
          )}
          {next ? (
            <>
              <div className="card pagination-card d-none d-md-block">
                <Link to={`/projects/${next.url}`} key={next.id}>
                  <GatsbyImage
                    className="card-img"
                    image={next.featuredImage.gatsbyImageData}
                    alt={next.title}
                    width={600}
                    height={600}
                  />
                </Link>
                <LinkImageHover className="card-body">
                  <Link to={`/projects/${next.url}`} key={next.id}>
                    <h5 className="card-title text-right">{next.title} &gt;</h5>
                  </Link>
                </LinkImageHover>
              </div>
              <div className="d-md-none">
                <Link to={`/projects/${next.url}`}>Next project &gt;</Link>
              </div>
            </>
          ) : (
            <div>
              <p className="card-title h2 grayed p-3">&gt;</p>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export const data = graphql`
  query ($id: String) {
    contentfulProject(id: { eq: $id }) {
      title
      medium
      url
      date
      materials
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
      featuredImage {
        gatsbyImageData(layout: FULL_WIDTH)
        description
      }
      content {
        raw
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.contentfulProject.title} />;

export default Project; 