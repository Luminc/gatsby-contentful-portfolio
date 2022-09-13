import  * as React from 'react'
import { graphql, useStaticQuery} from 'gatsby'
import "bootstrap/dist/css/bootstrap.min.css";

const Seo = ({title}) => {
const data = useStaticQuery(graphql`query{
site {
  siteMetadata {
    title 
  }
  }
}`)


return (
  <>
    <title>{title} — {data.site.siteMetadata.title}</title>
    <meta name="description" content={data.site.siteMetadata.title} />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  </>
)
}

export default Seo