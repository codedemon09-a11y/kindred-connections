/**
 * ============================================
 * GOOGLE ADSENSE AD UNIT COMPONENT
 * ============================================
 * 
 * This component renders a responsive Google AdSense ad unit.
 * 
 * HOW IT WORKS:
 * - The AdSense library is loaded globally via index.html
 * - This component creates an <ins> element that AdSense fills with an ad
 * - useEffect triggers adsbygoogle.push({}) to request an ad
 * 
 * VALUES YOU CAN SAFELY CHANGE:
 * - data-ad-slot: Replace with your actual ad slot ID from AdSense dashboard
 * - data-ad-format: Options include 'auto', 'rectangle', 'horizontal', 'vertical'
 * - className: Adjust container styling as needed
 * 
 * IMPORTANT:
 * - Do NOT place ads near navigation, buttons, or forms (AdSense policy)
 * - Ensure ads are clearly distinguishable from content
 * - Test on production domain (ads won't show on localhost)
 */

import { useEffect, useRef } from 'react';

// Extend Window interface for TypeScript
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseProps {
  /** 
   * YOUR AD SLOT ID - Replace this with your actual ad slot from AdSense dashboard
   * Get your ad slot ID from: https://www.google.com/adsense/
   * Navigate to: Ads > By ad unit > Create new ad unit
   */
  adSlot?: string;
  
  /** Ad format - 'auto' recommended for responsive behavior */
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  
  /** Enable full-width responsive ads */
  fullWidthResponsive?: boolean;
  
  /** Additional CSS classes for the container */
  className?: string;
}

const AdSense = ({
  // ============================================
  // YOUR DISPLAY AD SLOT ID FROM ADSENSE DASHBOARD
  // You can override this by passing a different adSlot prop
  // ============================================
  adSlot = '1457837652',
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
}: AdSenseProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // Prevent duplicate ad requests
    if (isAdPushed.current) return;

    try {
      // Ensure adsbygoogle array exists
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        
        // Push ad request - this tells AdSense to fill the ad slot
        window.adsbygoogle.push({});
        isAdPushed.current = true;
      }
    } catch (error) {
      // Silently handle errors (common in development/localhost)
      console.warn('AdSense error (normal in development):', error);
    }
  }, []);

  return (
    <div 
      className={`adsense-container my-6 flex justify-center ${className}`}
      aria-label="Advertisement"
    >
      {/* 
        ============================================
        ADSENSE AD UNIT
        ============================================
        This <ins> element is where Google AdSense renders the ad.
        
        ATTRIBUTES YOU CAN MODIFY:
        - data-ad-slot: Your unique ad unit ID (REQUIRED - replace placeholder)
        - data-ad-format: 'auto', 'rectangle', 'horizontal', 'vertical'
        - data-full-width-responsive: 'true' or 'false'
        
        DO NOT MODIFY:
        - data-ad-client: This is your publisher ID
        - className "adsbygoogle": Required by AdSense
      */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '100px' }}
        data-ad-client="ca-pub-4121738310210766"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};

export default AdSense;
