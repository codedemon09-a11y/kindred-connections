import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Invoice Generator</title>
        <meta name="description" content="Learn about our professional invoice and quotation generator. We help businesses create beautiful, professional documents." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="glass-card rounded-2xl p-8 space-y-8 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text">About Us</h1>
            
            <div className="space-y-6 text-muted-foreground">
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">Who We Are</h2>
                </div>
                <p className="leading-relaxed">
                  We are a dedicated team of professionals committed to simplifying business documentation. 
                  Our invoice and quotation generator is designed to help businesses of all sizes create 
                  professional, elegant documents quickly and efficiently.
                </p>
              </section>
              
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>
                </div>
                <p className="leading-relaxed">
                  Our mission is to empower businesses with easy-to-use tools that enhance their 
                  professional image. We believe that every business, regardless of size, deserves 
                  access to high-quality document generation tools.
                </p>
              </section>
              
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">What We Offer</h2>
                </div>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Professional invoice generation</li>
                  <li>Quotation and estimate creation</li>
                  <li>Clean, print-ready templates</li>
                  <li>Easy-to-use interface</li>
                  <li>Local document storage</li>
                  <li>Multiple document types support</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
