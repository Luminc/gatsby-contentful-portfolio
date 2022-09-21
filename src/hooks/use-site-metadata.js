import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            eMail
            author
            insta
            siteUrl
          }
        }
      }
    `
  );
  return site;
};
