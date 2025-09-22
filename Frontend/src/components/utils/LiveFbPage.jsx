import React, { useEffect } from 'react';


const FacebookPageFeed = ({ pageUrl }) => {
  
  useEffect(() => {
   
    if (document.getElementById('facebook-jssdk')) return;

   
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0&appId=YOUR_APP_ID"; // IMPORTANT: Replace YOUR_APP_ID
    script.async = true;
    script.defer = true;

    
    document.body.appendChild(script);

    
    script.onload = () => {
      if (window.FB && window.FB.XFBML) {
        window.FB.XFBML.parse();
      }
    };

    
    return () => {
      const existingScript = document.getElementById('facebook-jssdk');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []); 

  
  useEffect(() => {
    if (window.FB && window.FB.XFBML) {
      window.FB.XFBML.parse();
    }
  }, [pageUrl]);

  return (
    <div className="fb-page"
      data-href={pageUrl}
      data-tabs="timeline"
     
      data-height="500"
      data-small-header="false"
      data-adapt-container-width="false" 
      data-hide-cover="true"
      data-show-facepile="false"
    >
      <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
        <a href={pageUrl}>Facebook Page</a>
      </blockquote>
    </div>
  );
};

export default FacebookPageFeed;
