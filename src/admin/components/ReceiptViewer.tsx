import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, FileText, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function isImage(url: string) {
  return /\.(png|jpe?g|gif|webp|avif|bmp|svg)(\?|$)/i.test(url);
}
function isPdf(url: string) {
  return /\.pdf(\?|$)/i.test(url);
}

/** Normalises common share links (Drive / Cloudinary) into something embeddable. */
function embedUrl(url: string) {
  const drive = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?[^ ]*id=)([\w-]{10,})/);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;
  return url;
}

export function ReceiptViewer({
  url,
  title = "Bank receipt",
  open,
  onOpenChange,
}: {
  url: string;
  title?: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [downloading, setDownloading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    setFailed(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onOpenChange]);

  const download = async () => {
    setDownloading(true);
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("bad response");
      const blob = await res.blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = (url.split("/").pop() ?? "receipt").split("?")[0] || "receipt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(href);
    } catch {
      // cross-origin blocked — fall back to opening in a new tab
      window.open(url, "_blank", "noopener,noreferrer");
      toast.message("Opened in a new tab", { description: "Direct download was blocked by the file host." });
    } finally {
      setDownloading(false);
    }
  };

  const src = embedUrl(url);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-3">
              <FileText className="size-4 text-primary" />
              <p className="min-w-0 flex-1 truncate font-display text-sm font-semibold">{title}</p>
              <Button size="sm" variant="outline" onClick={download} disabled={downloading} className="active:scale-95">
                {downloading ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Download className="mr-2 size-4" />}
                Download
              </Button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition hover:text-foreground"
                aria-label="Open in new tab"
              >
                <ExternalLink className="size-4" />
              </a>
              <button
                onClick={() => onOpenChange(false)}
                aria-label="Close"
                className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition hover:text-foreground active:scale-95"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="min-h-[320px] flex-1 overflow-auto bg-muted/30 p-3">
              {failed ? (
                <div className="grid h-full place-items-center gap-2 p-10 text-center text-sm text-muted-foreground">
                  <p>This file can’t be previewed here.</p>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                    Open the receipt in a new tab
                  </a>
                </div>
              ) : isImage(url) ? (
                <img
                  src={src}
                  alt={title}
                  onError={() => setFailed(true)}
                  className="mx-auto max-h-[70vh] rounded-xl object-contain"
                />
              ) : (
                <iframe
                  title={title}
                  src={src}
                  onError={() => setFailed(true)}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-downloads"
                  referrerPolicy="no-referrer"
                  className="h-[70vh] w-full rounded-xl border-0 bg-background"
                />
              )}
            </div>

            {!isImage(url) && !isPdf(url) ? (
              <p className="border-t border-border px-5 py-2 text-xs text-muted-foreground">
                Unknown file type — use Download or Open if the preview stays blank.
              </p>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Inline trigger used inside tables / detail views. */
export function ReceiptLink({ url, label = "View receipt" }: { url: string; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="text-primary underline underline-offset-4 transition hover:opacity-80"
      >
        {label}
      </button>
      <ReceiptViewer url={url} open={open} onOpenChange={setOpen} />
    </>
  );
}