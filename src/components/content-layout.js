import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import ContentfulRichTech from './contentful-rich-text';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Video from './video';
import Carousel from 'react-bootstrap/Carousel';

const StyledContainer = styled(Container)`
  ${props => props.width === 'narrow' && 'max-width: 768px;'}
  ${props => props.width === 'medium' && 'max-width: 992px;'}
  ${props => props.width === 'wide' && 'max-width: 1200px;'}
  ${props => props.width === 'full' && 'max-width: 100%;'}
`;

const StyledRow = styled(Row)`
  ${props => props.spacing === 'tight' && 'margin-bottom: 1rem;'}
  ${props => props.spacing === 'normal' && 'margin-bottom: 2rem;'}
  ${props => props.spacing === 'loose' && 'margin-bottom: 3rem;'}
`;

const StyledCol = styled(Col)`
  ${props => props.alignment === 'left' && 'text-align: left;'}
  ${props => props.alignment === 'center' && 'text-align: center;'}
  ${props => props.alignment === 'right' && 'text-align: right;'}
`;

const ContentLayout = ({ 
  content,
  defaultWidth = 'medium',
  defaultSpacing = 'normal',
  defaultAlignment = 'left'
}) => {
  const renderContent = (item) => {
    switch (item.__typename) {
      case "ContentfulTextSection":
        return (
          <ContentfulRichTech 
            richText={item.content} 
            className={`text-${item.alignment || defaultAlignment}`}
          />
        );

      case "ContentfulImageSection":
        return (
          <GatsbyImage
            image={getImage(item.image.gatsbyImageData)}
            alt={item.alt || item.title}
            className={`aspect-ratio-${item.aspectRatio || 'auto'}`}
          />
        );

      case "ContentfulMediaSection":
        return (
          <Row className={`g-${item.spacing || '3'}`}>
            {item.media.map((mediaItem, index) => (
              <Col 
                key={mediaItem.id || index}
                xs={12}
                md={12 / (item.columns || 1)}
              >
                {mediaItem.__typename === "ContentfulImage" && (
                  <GatsbyImage
                    image={getImage(mediaItem.gatsbyImageData)}
                    alt={mediaItem.title}
                  />
                )}
                {mediaItem.__typename === "ContentfulVideo" && (
                  <Video
                    Src={mediaItem.url}
                    Title={mediaItem.title}
                    muted={mediaItem.muted}
                  />
                )}
                {mediaItem.__typename === "ContentfulCarousel" && (
                  <Carousel
                    fade
                    interval={mediaItem.interval}
                    pause={mediaItem.pause}
                    controls={mediaItem.controls}
                    indicators={mediaItem.indicators}
                  >
                    {mediaItem.images.map(image => (
                      <Carousel.Item key={image.id}>
                        <GatsbyImage
                          image={getImage(image.gatsbyImageData)}
                          alt={mediaItem.title}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
              </Col>
            ))}
          </Row>
        );

      default:
        return null;
    }
  };

  return (
    <StyledContainer fluid={defaultWidth === 'full'} width={defaultWidth}>
      {content.map((item, index) => {
        const {
          layout = 'full',
          width = defaultWidth,
          spacing = defaultSpacing,
          alignment = defaultAlignment,
          columnSpan = 1,
        } = item;

        // Calculate column sizes based on layout
        const getColumnSizes = () => {
          switch (layout) {
            case 'two-column':
              return { xs: 12, md: 6 };
            case 'three-column':
              return { xs: 12, md: 4 };
            case 'split':
              return { xs: 12, md: columnSpan === 2 ? 8 : 4 };
            default:
              return { xs: 12 };
          }
        };

        return (
          <StyledRow 
            key={item.id || index} 
            spacing={spacing}
            className={`mb-${spacing}`}
          >
            <StyledCol 
              {...getColumnSizes()} 
              alignment={alignment}
              className={`col-span-${columnSpan}`}
            >
              {renderContent(item)}
            </StyledCol>
          </StyledRow>
        );
      })}
    </StyledContainer>
  );
};

export default ContentLayout; 