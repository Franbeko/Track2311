import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  publishedTime,
  author = 'Track2311 Investments',
  section = 'Home'
}) => {
  const siteTitle = 'Track2311 Investments';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteDescription = description || 'Track2311 Investments offers secure agricultural investments, real estate opportunities, and business consultancy in Liberia. Earn up to 50% ROI with our proven investment plans.';
  const siteUrl = url || `https://track2311investments.com${window.location.pathname}`;
  const siteImage = image || '/images/og-image.jpg';
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={keywords || 'investment, agriculture, Liberia, real estate, ROI, business consultancy, import export, micro-finance, construction, Track2311'} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      
      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content={section} />
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
      
      {/* BreadcrumbList Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://track2311investments.com/"
            },
            ...(title ? [{
              "@type": "ListItem",
              "position": 2,
              "name": title,
              "item": siteUrl
            }] : [])
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;