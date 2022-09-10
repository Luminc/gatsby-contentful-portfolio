import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
heading,
navLinks,
navLinkItem,
navLinkText,
siteTitle} from './layout.module.css'

const Layout = ({ pageTitle, children }) => {

    const data = useStaticQuery(graphql`query {
      
      site {
        siteMetadata {
          description
          siteUrl
          title
        }
      }
      allContentfulPage {
        edges {
          node {
            slug
            title
          }
        }
      }
      }
      `)
  return (
    <div>
        <header className={siteTitle}>{data.site.siteMetadata.title}</header>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}><Link to="/" className={navLinkText}>Home</Link></li>
          <li className={navLinkItem}><Link to="/projects"  className={navLinkText}>Projects</Link></li>
          {data.allContentfulPage.edges.map(item => (
              <li key={item.node.slug} className={navLinkItem}>
                <Link to={`/${item.node.slug}`} className={navLinkText}>{item.node.title}</Link>
              </li>
            ))}
        </ul>
      </nav>
      <main>
        
        <h1 className={heading}>{pageTitle}</h1>
        {children}
        
      </main>
    </div>
  )
}



export default Layout