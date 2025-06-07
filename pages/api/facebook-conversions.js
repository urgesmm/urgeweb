// Facebook Conversions API Integration
import crypto from 'crypto';
import https from 'https';

// Your Facebook Pixel ID and Access Token (keep these secure)
const PIXEL_ID = '998614692466127';
const ACCESS_TOKEN = 'EAAShCUHZBVR4BOyportaoNRViBnZCAXVvEDza9wDI9Jaz3hfejKNdpIPC0c0uYhPiEQgtJwsjUL3V3BKZBQnBYCimuC2zbstci3ZAWw3W5sWD2FSovwnUILPwg5Bs4asS4sFPzZBKB6Sbc7qVRMaJR2SzIxZCExLxUFjVPsYpPdL14nMWyQt76VOMGyZBbaKwZDZD';

// Helper function to hash user data (required by Facebook for PII)
function hashData(data) {
  if (!data) return null;
  return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
}

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
          event_source_url: 'https://urgeofimmigration.com/contact',
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
    const { eventName, formData } = req.body;
    
    if (!eventName || !formData) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    // Prepare user data with hashed values for privacy
    const userData = {
      em: formData.email ? hashData(formData.email) : undefined,
      ph: formData.phone ? hashData(formData.phone.replace(/\D/g, '')) : undefined,
      external_id: formData.email ? hashData(formData.email) : undefined,
      client_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      client_user_agent: req.headers['user-agent'],
      country: formData.nationality || formData.currentCountry
    };
    
    // Add first name and last name if available
    if (formData.name) {
      const nameParts = formData.name.split(' ');
      if (nameParts.length > 0) {
        userData.fn = hashData(nameParts[0]);
        if (nameParts.length > 1) {
          userData.ln = hashData(nameParts.slice(1).join(' '));
        }
      }
    }
    
    // Prepare custom data
    const customData = {
      content_name: 'Contact Form Submission',
      content_category: formData.immigrationType || 'General Inquiry',
      value: 1.00,
      currency: 'USD',
      status: 'submitted',
      target_country: formData.migrateCountry || 'Not Specified',
      education_level: formData.education || 'Not Specified',
      age: formData.age || 'Not Specified',
      occupation: formData.currentOccupation || 'Not Specified'
    };
    
    // Send the event to Facebook
    const response = await sendToFacebookConversionsAPI(eventName, userData, customData);
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Event sent to Facebook Conversions API',
      response
    });
    
  } catch (error) {
    console.error('Error in Facebook Conversions API handler:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send event to Facebook Conversions API',
      error: error.message
    });
  }
}
