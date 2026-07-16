import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Check,
  Copy,
  CreditCard,
  Headphones,
  Landmark,
  Lock,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import { BANK_DETAILS, formatNaira } from "@/lib/coursePricing";
import { whatsappLink } from "@/lib/site";

type Props = {
  courseTitle: string;
  price: number;
  applicantName: string;
  applicantEmail: string;
};

export function PaymentInstructions({ courseTitle, price, applicantName, applicantEmail }: Props) {
  const [copied, setCopied] = useState(false);

  function copyAccount() {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const waMessage = `Hi OxVerse Academy, I'm ${applicantName} (${applicantEmail}). I just made the payment of ${formatNaira(price)} for the ${courseTitle} program (IT / SIWES). Attaching my payment receipt.`;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-purple-50/40 dark:from-primary/10 dark:via-background dark:to-purple-950/20 p-5 sm:p-8 md:p-10 shadow-2xl shadow-primary/10"
      >
        {/* Header */}
        <div className="grid sm:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Lock className="size-3.5" /> Secure Payment
            </div>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Make Your <span className="gradient-text">Payment Securely</span>
            </h1>
            <div className="mt-3 h-1 w-14 rounded-full bg-primary" />
            <p className="mt-4 text-sm sm:text-base text-ink-muted text-pretty">
              Transfer to our official account and <span className="text-primary font-semibold">grow your future</span> with us.
            </p>
          </div>
          <div className="relative hidden sm:block">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative aspect-square w-full max-w-[260px] mx-auto rounded-2xl bg-gradient-to-br from-primary to-purple-800 grid place-items-center shadow-2xl shadow-primary/40">
              <Landmark className="size-24 text-white/95" strokeWidth={1.4} />
              <div className="absolute -bottom-3 -right-3 rounded-xl bg-ink text-background px-3 py-2 text-[11px] font-semibold flex items-center gap-1.5 shadow-lg">
                <ShieldCheck className="size-3.5 text-primary" />
                <div>
                  <div className="text-[9px] uppercase tracking-wider opacity-80">100% Secure</div>
                  <div>Transactions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course price panel */}
        <div className="mt-8 rounded-2xl bg-background border border-border p-5 sm:p-6">
          <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold">
            Course Fee — {courseTitle}
          </p>
          <p className="mt-2 font-display text-3xl sm:text-4xl font-bold text-primary">
            {formatNaira(price)}
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            Kindly transfer the exact amount to the account below and send your receipt on WhatsApp.
          </p>
        </div>

        {/* Bank details card */}
        <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-background p-5 sm:p-6 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-purple-800 text-primary-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg">
            <Building2 className="size-3.5" /> Bank Details
          </div>

          <div className="mt-3 divide-y divide-border">
            <BankRow icon={User} label="Account Name" value={BANK_DETAILS.accountName} highlight />
            <BankRow
              icon={CreditCard}
              label="Account Number"
              value={BANK_DETAILS.accountNumber}
              highlight
              action={
                <button
                  type="button"
                  onClick={copyAccount}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary px-3 py-1.5 text-xs font-semibold transition shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" /> Copy
                    </>
                  )}
                </button>
              }
            />
            <BankRow icon={Landmark} label="Bank Name" value={BANK_DETAILS.bankName} highlight />
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
          {[
            { icon: ShieldCheck, title: "Secure", sub: "Payments" },
            { icon: Star, title: "Trusted", sub: "Account" },
            { icon: Headphones, title: "Support", sub: "Available" },
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-2 sm:gap-3 rounded-xl bg-background/60 border border-border px-2 sm:px-4 py-3">
              <span className="size-8 sm:size-10 grid place-items-center rounded-full bg-primary text-primary-foreground shrink-0">
                <b.icon className="size-4 sm:size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-sm font-semibold leading-tight">{b.title}</p>
                <p className="text-[10px] sm:text-xs text-ink-muted leading-tight">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1eb955] text-white px-5 py-4 text-sm sm:text-base font-semibold transition shadow-lg shadow-[#25D366]/30"
        >
          <WhatsAppIcon className="size-5" />
          Send Payment Receipt on WhatsApp
        </a>
        <p className="mt-3 text-center text-xs text-ink-muted">
          After transferring, click the button above to send your payment receipt to our admissions team.
        </p>

        {/* Footer note */}
        <div className="mt-6 rounded-2xl border border-border bg-background/70 p-4 sm:p-5 flex items-start gap-3">
          <span className="size-9 sm:size-10 grid place-items-center rounded-full bg-primary/10 text-primary shrink-0">
            ♥
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Thank you for choosing OxVerse Academy.</p>
            <p className="text-xs sm:text-sm text-primary italic">Your future is worth it. We appreciate you!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BankRow({
  icon: Icon,
  label,
  value,
  action,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  action?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4">
      <span className="size-10 sm:size-11 grid place-items-center rounded-full bg-primary text-primary-foreground shrink-0">
        <Icon className="size-4 sm:size-5" />
      </span>
      <div className="flex-1 min-w-0 border-l border-border pl-3 sm:pl-4">
        <p className="text-[11px] sm:text-xs text-ink-muted uppercase tracking-wide">{label}</p>
        <p
          className={
            "mt-0.5 font-semibold break-all " +
            (highlight ? "text-primary text-base sm:text-lg" : "text-sm sm:text-base")
          }
        >
          {value}
        </p>
      </div>
      {action}
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.36-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884Zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
