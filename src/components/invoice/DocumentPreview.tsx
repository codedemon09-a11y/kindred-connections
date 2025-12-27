import { forwardRef } from 'react';
import { Document, CompanySettings, getDocumentTypeConfig } from '@/types/invoice';
import { formatCurrency, formatNumber } from '@/utils/calculations';

interface DocumentPreviewProps {
  document: Document;
  settings: CompanySettings;
}

export const DocumentPreview = forwardRef<HTMLDivElement, DocumentPreviewProps>(
  ({ document, settings }, ref) => {
    const docConfig = getDocumentTypeConfig(document.type);
    const isPurchase = ['purchase-invoice', 'purchase-order', 'outward-payment'].includes(document.type);
    
    const getDueDateLabel = () => {
      if (['quotation', 'proforma'].includes(document.type)) return 'Valid Till';
      if (['purchase-order', 'sale-order'].includes(document.type)) return 'Expected Date';
      return 'Due Date';
    };

    return (
      <div ref={ref} className="print-professional">
        {/* Header */}
        <div className="print-header">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              {settings.logo && (
                <img src={settings.logo} alt="Company Logo" className="h-16 w-16 object-contain" />
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">{settings.name || 'Your Company Name'}</h1>
                {settings.address && <p className="text-sm text-gray-600 mt-1">{settings.address}</p>}
                <div className="flex gap-4 mt-1 text-xs text-gray-500">
                  {settings.phone && <span>Tel: {settings.phone}</span>}
                  {settings.email && <span>{settings.email}</span>}
                </div>
              </div>
            </div>
            <div className="text-right text-xs text-gray-600">
              {settings.gstin && <p><span className="font-medium">GSTIN:</span> {settings.gstin}</p>}
              {settings.pan && <p><span className="font-medium">PAN:</span> {settings.pan}</p>}
            </div>
          </div>
        </div>

        {/* Document Title Bar */}
        <div className="print-title-bar">
          <h2 className="text-lg font-bold tracking-wider">{docConfig.label.toUpperCase()}</h2>
        </div>

        {/* Document Info */}
        <div className="grid grid-cols-2 gap-8 py-4 border-b border-gray-200">
          <div className="space-y-1 text-sm">
            <div className="flex"><span className="w-32 text-gray-500">Document No:</span><span className="font-medium text-gray-900">{document.number}</span></div>
            <div className="flex"><span className="w-32 text-gray-500">Date:</span><span className="text-gray-900">{document.date}</span></div>
            {docConfig.hasDueDate && (
              <div className="flex"><span className="w-32 text-gray-500">{getDueDateLabel()}:</span><span className="text-gray-900">{document.dueDate}</span></div>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex"><span className="w-32 text-gray-500">Place of Supply:</span><span className="text-gray-900">{document.placeOfSupply}</span></div>
            <div className="flex"><span className="w-32 text-gray-500">Country:</span><span className="text-gray-900">{document.countryOfSupply}</span></div>
          </div>
        </div>

        {/* Party Details */}
        <div className="grid grid-cols-2 gap-8 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {isPurchase ? 'Billed To' : 'Billed By'}
            </h3>
            <div className="text-sm space-y-0.5">
              <p className="font-semibold text-gray-900">{settings.name}</p>
              <p className="text-gray-600">{settings.address}</p>
              <p className="text-gray-600">{settings.city}, {settings.state} {settings.pincode}</p>
              {settings.gstin && <p className="text-gray-500 text-xs mt-1">GSTIN: {settings.gstin}</p>}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {isPurchase ? 'Supplier Details' : 'Billed To'}
            </h3>
            <div className="text-sm space-y-0.5">
              <p className="font-semibold text-gray-900">{document.client.name || '—'}</p>
              <p className="text-gray-600">{document.client.address}</p>
              <p className="text-gray-600">{document.client.city}, {document.client.state} {document.client.pincode}</p>
              {document.client.gstin && <p className="text-gray-500 text-xs mt-1">GSTIN: {document.client.gstin}</p>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        {docConfig.hasGST && document.items.length > 0 && (
          <div className="py-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="print-table-header">
                  <th className="py-2 px-2 text-center w-10">#</th>
                  <th className="py-2 px-2 text-left">Description</th>
                  <th className="py-2 px-2 text-left w-20">HSN/SAC</th>
                  <th className="py-2 px-2 text-right w-16">Qty</th>
                  <th className="py-2 px-2 text-right w-20">Rate</th>
                  <th className="py-2 px-2 text-right w-16">GST %</th>
                  {document.isInterState ? (
                    <th className="py-2 px-2 text-right w-20">IGST</th>
                  ) : (
                    <>
                      <th className="py-2 px-2 text-right w-16">CGST</th>
                      <th className="py-2 px-2 text-right w-16">SGST</th>
                    </>
                  )}
                  <th className="py-2 px-2 text-right w-24">Amount</th>
                </tr>
              </thead>
              <tbody>
                {document.items.map((item, index) => (
                  <tr key={item.id} className="print-table-row">
                    <td className="py-2 px-2 text-center text-gray-500">{index + 1}</td>
                    <td className="py-2 px-2 text-gray-900">{item.description}</td>
                    <td className="py-2 px-2 text-gray-500 font-mono text-xs">{item.hsnSac}</td>
                    <td className="py-2 px-2 text-right font-mono">{item.quantity}</td>
                    <td className="py-2 px-2 text-right font-mono">{formatNumber(item.rate)}</td>
                    <td className="py-2 px-2 text-right">{item.gstRate}%</td>
                    {document.isInterState ? (
                      <td className="py-2 px-2 text-right font-mono text-gray-600">{formatNumber(item.igst)}</td>
                    ) : (
                      <>
                        <td className="py-2 px-2 text-right font-mono text-gray-600">{formatNumber(item.cgst)}</td>
                        <td className="py-2 px-2 text-right font-mono text-gray-600">{formatNumber(item.sgst)}</td>
                      </>
                    )}
                    <td className="py-2 px-2 text-right font-semibold font-mono">{formatNumber(item.amount + item.gstAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totals */}
        {docConfig.hasGST && (
          <div className="flex justify-end border-t border-gray-200 pt-4">
            <div className="w-72">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-mono">{formatCurrency(document.subtotal)}</span></div>
                {document.discountAmount > 0 && (
                  <div className="flex justify-between"><span className="text-gray-500">Discount</span><span className="font-mono text-red-600">-{formatCurrency(document.discountAmount)}</span></div>
                )}
                {document.isInterState ? (
                  <div className="flex justify-between"><span className="text-gray-500">IGST</span><span className="font-mono">{formatCurrency(document.igstTotal)}</span></div>
                ) : (
                  <>
                    <div className="flex justify-between"><span className="text-gray-500">CGST</span><span className="font-mono">{formatCurrency(document.cgstTotal)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">SGST</span><span className="font-mono">{formatCurrency(document.sgstTotal)}</span></div>
                  </>
                )}
                {document.shippingCharges > 0 && (
                  <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-mono">{formatCurrency(document.shippingCharges)}</span></div>
                )}
                {document.roundOff !== 0 && (
                  <div className="flex justify-between"><span className="text-gray-500">Round Off</span><span className="font-mono">{formatCurrency(document.roundOff)}</span></div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-300 font-bold text-base">
                  <span>Grand Total</span>
                  <span className="font-mono">{formatCurrency(document.grandTotal)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">{document.amountInWords}</p>
            </div>
          </div>
        )}

        {/* Payment Details */}
        {docConfig.hasPayment && (settings.bankName || settings.upiId) && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Payment Details</h3>
            <div className="grid grid-cols-2 gap-8 text-sm">
              {settings.bankName && (
                <div className="space-y-0.5">
                  <p><span className="text-gray-500 w-24 inline-block">Bank:</span>{settings.bankName}</p>
                  <p><span className="text-gray-500 w-24 inline-block">Account:</span><span className="font-mono">{settings.accountNumber}</span></p>
                  <p><span className="text-gray-500 w-24 inline-block">IFSC:</span><span className="font-mono">{settings.ifsc}</span></p>
                </div>
              )}
              <div className="space-y-0.5">
                {settings.upiId && <p><span className="text-gray-500 w-24 inline-block">UPI:</span><span className="font-mono">{settings.upiId}</span></p>}
                <p><span className="text-gray-500 w-24 inline-block">Terms:</span>{document.paymentTerms}</p>
              </div>
            </div>
          </div>
        )}

        {/* Terms & Signature */}
        <div className="border-t border-gray-200 pt-4 mt-4 grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Terms & Conditions</h3>
            <p className="text-xs text-gray-500 whitespace-pre-line">{settings.terms || 'Payment due as per agreed terms.'}</p>
            {settings.jurisdiction && (
              <p className="text-xs text-gray-400 mt-2">Subject to {settings.jurisdiction} jurisdiction.</p>
            )}
          </div>
          <div className="text-right">
            <div className="inline-block text-center">
              <p className="text-sm font-medium text-gray-900">For {settings.name}</p>
              <div className="h-16 border-b border-gray-300 mt-8 w-40"></div>
              <p className="text-xs text-gray-500 mt-1">Authorized Signatory</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-8 pt-4 border-t border-gray-100">
          This is a computer-generated document. No signature is required.
        </div>
      </div>
    );
  }
);

DocumentPreview.displayName = 'DocumentPreview';
