// Facebook Conversions API for PageView events
import crypto from 'crypto';
import https from 'https';

// Your Facebook Pixel ID and Access Token (keep these secure)
const PIXEL_ID = '998614692466127';
const ACCESS_TOKEN = 'EAAShCUHZBVR4BOyportaoNRViBnZCAXVvEDza9wDI9Jaz3hfejKNdpIPC0c0uYhPiEQgtJwsjUL3V3BKZBQnBYCimuC2zbstci3ZAWw3W5sWD2FSovwnUILPwg5Bs4asS4sFPzZBKB6Sbc7qVRMaJR2SzIxZCExLxUFjVPsYpPdL14nMWyQt76VOMGyZBbaKwZDZD';

// Function to send event to Facebook Conversions API
async function sendToFacebookConversionsAPI(eventName, userData, customData) {
  return new Promise((resolve, reject) => {
    try {
      // Prepare the request data
      const eventTime = Math.floor(Date.now() / 1000);
      const eventId = `${eventName}_${eventTime}_${Math.floor(Math.random() * 1000)}`;
      
      const requestData = JSON.stringify({
        data: [{
          event_name: eventName,
          event_time: eventTime,
          event_id: eventId,
          event_source_url: customData.page_url || 'https://URGE MANAGEMENT.com',
          action_source: 'website',
          user_data: userData,
          custom_data: customData
        }],
        access_token: ACCESS_TOKEN
      });
      
      // Set up the request options
      const options = {
        hostname: 'graph.facebook.com',
        path: `/v17.0/${PIXEL_ID}/events`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': requestData.length
        }
      };
      
      // Send the request
      const req = https.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const parsedResponse = JSON.parse(responseData);
            console.log('Facebook Conversions API response:', parsedResponse);
            resolve(parsedResponse);
          } catch (error) {
            console.error('Error parsing Facebook response:', error);
            reject(error);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('Error sending to Facebook Conversions API:', error);
        reject(error);
      });
      
      req.write(requestData);
      req.end();
      
    } catch (error) {
      console.error('Exception in sendToFacebookConversionsAPI:', error);
      reject(error);
    }
  });
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const { pageUrl, pageTitle } = req.body;
    
    if (!pageUrl) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    // Prepare user data
    const userData = {
      client_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      client_user_agent: req.headers['user-agent'],
      fbp: req.body.fbp || undefined, // Facebook Browser ID if available
      fbc: req.body.fbc || undefined  // Facebook Click ID if available
    };
    
    // Prepare custom data
    const customData = {
      page_url: pageUrl,
      page_title: pageTitle || 'URGE MANAGEMENT',
      page_referrer: req.headers.referer || undefined,
      page_location: pageUrl
    };
    
    // Send the PageView event to Facebook
    const response = await sendToFacebookConversionsAPI('PageView', userData, customData);
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'PageView event sent to Facebook Conversions API',
      response
    });
    
  } catch (error) {
    console.error('Error in Facebook PageView API handler:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send PageView event to Facebook Conversions API',
      error: error.message
    });
  }
}
