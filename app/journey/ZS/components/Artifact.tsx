import { ExternalLink, FileText, Mail } from "lucide-react";
import { allEvents, fmtIsoLong, pdfName, pdfsOf, pdfSrc } from "../derive";

type Entry = (typeof allEvents)[number];

/**
 * A real email or document from the journey, set in a frame. The text is the data in data.ts;
 * nothing here is a mock-up. PDFs open in a new tab.
 */
export default function Artifact({ e, className = "" }: { e: Entry; className?: string }) {
  const mail = e.emailData;
  const pdfs = pdfsOf(e.pdf);
  return (
    <figure className={`relative border border-zs-line bg-zs-panel/60 ${className}`}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-zs-line px-4 py-2.5 text-xs uppercase tracking-[0.14em] text-zs-mute">
        <span className="inline-flex items-center gap-2">
          {mail ? <Mail size={13} aria-hidden="true" /> : <FileText size={13} aria-hidden="true" />}
          Artifact · {mail ? "Email" : "Document"}
        </span>
        <time dateTime={e.date}>{fmtIsoLong(e.date)}</time>
      </figcaption>
      <div className="p-5 sm:p-6">
        {mail && (
          <>
            <p className="text-sm text-zs-mute">
              <span className="text-zs-text">{mail.sender}</span> · {mail.senderRole}
            </p>
            <p className="mt-3 text-lg font-semibold leading-snug">{mail.subject}</p>
            <p className="mt-2 text-sm leading-relaxed text-zs-mute">{mail.preview}</p>
          </>
        )}
        {pdfs.length > 0 && (
          <ul className={`flex flex-wrap gap-2 ${mail ? "mt-5" : ""}`}>
            {pdfs.map((file) => (
              <li key={file}>
                <a
                  href={pdfSrc(file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 border border-zs-line px-3 text-sm font-medium text-zs-progress transition-colors hover:border-zs-progress"
                >
                  <FileText size={14} aria-hidden="true" />
                  {pdfName(file)}
                  <ExternalLink size={12} aria-hidden="true" />
                  <span className="sr-only">(PDF, opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </figure>
  );
}
