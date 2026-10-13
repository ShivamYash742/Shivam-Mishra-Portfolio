import { ChevronDown, ExternalLink, FileText, Mail } from "lucide-react";
import { pdfName, pdfsOf, pdfSrc, type allEvents } from "../derive";

type Entry = (typeof allEvents)[number];

/** Expander for an entry: the email text and/or its PDF. The PDF iframe is lazy, so it only loads once opened. */
export default function Attachment({ e }: { e: Entry }) {
  const mail = e.emailData;
  const pdfs = pdfsOf(e.pdf);
  return (
    <details className="zs-mail group mt-2 max-w-3xl border-l-2 border-transparent open:border-zs-line open:bg-zs-panel/70">
      <summary className="flex min-h-10 w-fit cursor-pointer list-none items-center gap-2 pr-2 text-sm font-medium text-zs-progress hover:underline group-open:px-4 [&::-webkit-details-marker]:hidden">
        {mail ? <Mail size={16} aria-hidden="true" /> : <FileText size={16} aria-hidden="true" />}
        {mail ? `Email from ${mail.sender}` : (e.pdfLabel ?? "View document")}
        <ChevronDown size={16} aria-hidden="true" className="transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4 text-sm">
        {mail && (
          <>
            <p className="text-zs-mute">{mail.senderRole}</p>
            <p className="mt-2 font-semibold">{mail.subject}</p>
            <p className="mt-1 leading-relaxed text-zs-mute">{mail.preview}</p>
          </>
        )}
        {pdfs.map((file) => (
          <div key={file} className="mt-5">
            {pdfs.length > 1 && <p className="mb-2 font-medium">{pdfName(file)}</p>}
            <iframe
              src={pdfSrc(file)}
              title={`${e.title}: ${file}`}
              loading="lazy"
              className="hidden h-[34rem] w-full rounded-sm border border-zs-line bg-white md:block"
            />
            <a
              href={pdfSrc(file)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-zs-progress underline-offset-4 hover:underline"
            >
              <FileText size={16} aria-hidden="true" /> Open PDF in a new tab
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
    </details>
  );
}
