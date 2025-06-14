import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ContentfulRichText } from './contentful-rich-text';
import styled from 'styled-components';

const StyledSection = styled.div`
  background-color: ${props => props.backgroundColor || 'transparent'};
  color: ${props => props.textColor || 'inherit'};
  padding: ${props => {
    switch (props.padding) {
      case 'none': return '0';
      case 'small': return '1rem';
      case 'medium': return '2rem';
      case 'large': return '4rem';
      default: return '2rem';
    }
  }};
  margin: ${props => {
    switch (props.margin) {
      case 'none': return '0';
      case 'small': return '1rem 0';
      case 'medium': return '2rem 0';
      case 'large': return '4rem 0';
      default: return '2rem 0';
    }
  }};
`;

const ImageWrapper = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const QuoteWrapper = styled.blockquote`
  font-size: ${props => props.style === 'large' ? '2rem' : '1.5rem'};
  font-style: italic;
  margin: 2rem 0;
  padding: ${props => props.style === 'pullquote' ? '0 2rem' : '0'};
  border-left: ${props => props.style === 'pullquote' ? '4px solid #ccc' : 'none'};
  
  cite {
    display: block;
    font-size: 1rem;
    margin-top: 1rem;
    font-style: normal;
  }
`;

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
  
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const FlexibleLayout = ({ sections }) => {
  const renderContent = (section) => {
    const { type, content } = section;

    switch (type) {
      case 'text':
        return <ContentfulRichText content={content.text} />;
      
      case 'image':
        return (
          <ImageWrapper>
            <img 
              src={content.image.url} 
              alt={content.image.title || ''} 
              loading="lazy"
            />
          </ImageWrapper>
        );
      
      case 'video':
        return (
          <VideoWrapper>
            <iframe
              src={content.video.url}
              title={content.video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoWrapper>
        );
      
      case 'gallery':
        return (
          <GalleryWrapper>
            {content.gallery.map((image, index) => (
              <img 
                key={index}
                src={image.url} 
                alt={image.title || `Gallery image ${index + 1}`}
                loading="lazy"
              />
            ))}
          </GalleryWrapper>
        );
      
      case 'quote':
        return (
          <QuoteWrapper style={content.quote.style}>
            {content.quote.text}
            {content.quote.author && <cite>— {content.quote.author}</cite>}
          </QuoteWrapper>
        );
      
      case 'embed':
        return (
          <div className="embed-wrapper">
            <iframe
              src={content.embed.url}
              title="Embedded content"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  const getColumnWidth = (layout) => {
    switch (layout) {
      case 'two-column':
        return 6;
      case 'three-column':
        return 4;
      default:
        return 12;
    }
  };

  return (
    <Container>
      {sections.map((section, index) => (
        <StyledSection
          key={index}
          backgroundColor={section.styling?.backgroundColor}
          textColor={section.styling?.textColor}
          padding={section.styling?.padding}
          margin={section.styling?.margin}
        >
          <Row>
            {section.layout === 'grid' ? (
              <Col xs={12}>
                {renderContent(section)}
              </Col>
            ) : (
              <Col md={getColumnWidth(section.layout)}>
                {renderContent(section)}
              </Col>
            )}
          </Row>
        </StyledSection>
      ))}
    </Container>
  );
}; 