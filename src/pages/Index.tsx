import { Helmet } from 'react-helmet-async';
import { DocumentEditor } from '@/components/invoice/DocumentEditor';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>GST Invoice Pro - Professional Invoice & Billing Generator for Indian Businesses</title>
        <meta 
          name="description" 
          content="Create GST-compliant Tax Invoices, Quotations, Proforma Invoices & Bills with automatic CGST/SGST/IGST calculations. Professional billing solution for Indian businesses." 
        />
        <meta name="keywords" content="GST invoice generator, tax invoice, quotation, proforma invoice, billing software, Indian GST, CGST, SGST, IGST calculator" />
        <link rel="canonical" href="/" />
      </Helmet>
      <DocumentEditor />
    </>
  );
};

export default Index;
