import { Document, DocumentType } from '@/types/invoice';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { FileText, FileCheck, FileClock, Receipt, FolderOpen, Trash2 } from 'lucide-react';
import { formatDate, formatCurrency } from '@/utils/calculations';

interface SavedDocumentsProps {
  documents: Document[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}

const DOC_ICONS: Record<DocumentType, React.ReactNode> = {
  invoice: <FileText className="h-4 w-4" />,
  quotation: <FileCheck className="h-4 w-4" />,
  proforma: <FileClock className="h-4 w-4" />,
  bill: <Receipt className="h-4 w-4" />,
};

const DOC_COLORS: Record<DocumentType, string> = {
  invoice: 'bg-primary/10 text-primary',
  quotation: 'bg-success/10 text-success',
  proforma: 'bg-warning/10 text-warning',
  bill: 'bg-muted text-muted-foreground',
};

export const SavedDocuments = ({ documents, onLoad, onDelete }: SavedDocumentsProps) => {
  const sortedDocs = [...documents].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <FolderOpen className="h-4 w-4 mr-2" />
          Documents
          {documents.length > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 px-1.5">
              {documents.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-[400px]">
        <SheetHeader>
          <SheetTitle>Saved Documents</SheetTitle>
          <SheetDescription>
            Load or manage your previously saved documents.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-4 pr-4">
          {sortedDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No saved documents yet.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Create and save a document to see it here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {sortedDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="group relative p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer"
                  onClick={() => onLoad(doc.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${DOC_COLORS[doc.type]}`}>
                      {DOC_ICONS[doc.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium truncate">
                          {doc.number}
                        </span>
                        <Badge variant="outline" className="capitalize text-xs">
                          {doc.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">
                        {doc.client.name || 'No client name'}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(doc.date)}
                        </span>
                        <span className="text-sm font-semibold font-mono">
                          {formatCurrency(doc.grandTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Delete button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(doc.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
