# Jeroen Kortekaas Portfolio

A modern, flexible portfolio website built with Gatsby and Contentful, designed to showcase artistic work with a focus on content flexibility and responsive design.

## 🎨 Features

- **Flexible Content Layout System**
  - Modular content sections
  - Multiple layout options (full, two-column, three-column, split)
  - Responsive design for all screen sizes
  - Customizable width and alignment options

- **Content Types**
  - Projects
  - Blog Posts
  - Pages
  - All content types support:
    - Rich text content
    - Media galleries
    - Videos
    - Carousels
    - Custom layouts

- **Technical Features**
  - Built with Gatsby for optimal performance
  - Contentful CMS integration
  - Responsive images with Gatsby Image
  - SEO optimization
  - Progressive Web App capabilities

## 🏗 Architecture

### Content Structure

The project uses a flexible content model in Contentful that allows for:

1. **Base Content Type**
   - Title
   - Featured Image
   - Flexible Sections

2. **Section Types**
   - Text Sections
   - Image Sections
   - Media Sections (images, videos, carousels)
   - Each section supports:
     - Custom layouts
     - Width options
     - Alignment settings
     - Column spans

3. **Content Types**
   - Projects
   - Blog Posts
   - Pages
   - Each extends the base content type with specific fields

### Code Structure

```
src/
├── components/
│   ├── content-layout.js     # Flexible layout system
│   ├── contentful-rich-text.js
│   ├── header.js
│   ├── footer.js
│   └── ...
├── templates/
│   ├── project.js           # Project template
│   └── blogPost.js          # Blog post template
├── pages/
│   ├── projects/
│   ├── blog/
│   └── ...
└── utils/
    └── textUtils.js         # Text formatting utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Contentful account

### Environment Variables

Create a `.env` file with:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gatsby-contentful-portfolio.git
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run develop
```

## 📝 Content Management

### Contentful Setup

1. Create content types in Contentful:
   - Base Content
   - Text Section
   - Image Section
   - Media Section
   - Project
   - Blog Post

2. Configure validations and default values:
   - Layout options
   - Width settings
   - Alignment choices
   - Column spans

### Content Creation

1. Create new content in Contentful
2. Use the flexible layout system to arrange content
3. Add media and rich text as needed
4. Preview and publish

## 🛠 Development

### Branching Strategy

- `main` - Production branch
- `feature/*` - Feature development
- `bugfix/*` - Bug fixes
- `release/*` - Release preparation

### Development Workflow

1. Create feature branch
```bash
git checkout -b feature/your-feature
```

2. Make changes and commit
```bash
git commit -m "feat: your feature description"
```

3. Push and create pull request
```bash
git push origin feature/your-feature
```

## 📱 Responsive Design

The site is built with a mobile-first approach and includes:

- Responsive images
- Flexible layouts
- Mobile-optimized navigation
- Touch-friendly interfaces

## 🎯 Performance

- Optimized images with Gatsby Image
- Code splitting
- Lazy loading
- SEO optimization
- Fast page loads

## 🔧 Configuration

### Gatsby Config

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Contact

Jeroen Kortekaas - [@bluecarabiner](https://instagram.com/bluecarabiner)

Project Link: [https://github.com/yourusername/gatsby-contentful-portfolio](https://github.com/yourusername/gatsby-contentful-portfolio)
