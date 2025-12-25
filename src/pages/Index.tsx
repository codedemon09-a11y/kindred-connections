/**
 * HOME PAGE
 * 
 * AdSense ad placement follows Google policies:
 * - Ads are placed between content sections (not near nav/buttons/forms)
 * - Ads are clearly separated from main content
 */

import AdSense from '@/components/AdSense';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content Section */}
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center px-4">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Welcome to Your Blank App</h1>
          <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
        </div>
      </div>

      {/* 
        ============================================
        ADSENSE AD PLACEMENT
        ============================================
        This ad is placed between content sections, following AdSense policies.
        
        TO CUSTOMIZE:
        - Change adSlot prop to your actual ad slot ID
        - Adjust adFormat if needed ('auto', 'rectangle', 'horizontal', 'vertical')
        - Add className for additional styling
        
        EXAMPLE WITH CUSTOM AD SLOT:
        <AdSense adSlot="your-real-ad-slot-id" adFormat="horizontal" />
      */}
      <div className="container mx-auto px-4 py-8">
        <AdSense 
          // Replace '1234567890' with your actual ad slot ID from AdSense dashboard
          adSlot="1234567890"
          adFormat="auto"
          fullWidthResponsive={true}
        />
      </div>

      {/* Additional Content Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Get Started</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Build something amazing with this starter template.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
