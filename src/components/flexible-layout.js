import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

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

const FlexibleLayout = ({ 
  sections, 
  defaultWidth = 'medium',
  defaultSpacing = 'normal',
  defaultAlignment = 'left'
}) => {
  return (
    <StyledContainer fluid={defaultWidth === 'full'} width={defaultWidth}>
      {sections.map((section, index) => {
        const {
          layout = 'full',
          width = defaultWidth,
          spacing = defaultSpacing,
          alignment = defaultAlignment,
          columnSpan = 1,
          children
        } = section;

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
            key={section.id || index} 
            spacing={spacing}
            className={`mb-${spacing}`}
          >
            <StyledCol 
              {...getColumnSizes()} 
              alignment={alignment}
              className={`col-span-${columnSpan}`}
            >
              {children}
            </StyledCol>
          </StyledRow>
        );
      })}
    </StyledContainer>
  );
};

export default FlexibleLayout; 