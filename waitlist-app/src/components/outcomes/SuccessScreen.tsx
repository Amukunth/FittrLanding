"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { BONUS_AMOUNT, REFERRAL_BONUS_AMOUNT } from "@/lib/constants";
import type { SignupResult } from "@/lib/flow";

const SHARE_TEXT =
  "I'm in line for Fittr — real money on push-ups, planks and wall sits, counted live by your phone camera so nobody can fake it. Join on my link and we both get a launch bonus.";

export function SuccessScreen({
  signup,
  returning = false,
}: {
  signup: SignupResult;
  returning?: boolean;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [origin, setOrigin] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  // Read after mount: the server has no navigator, and branching on it during
  // render would hydrate a different tree than it sent.
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    setOrigin(window.location.origin);
    setCanShare("share" in navigator);
  }, []);

  const path = `/r/${signup.referralCode}`;
  const url = origin ? `${origin}${path}` : path;

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2600);
  }

  async function copy(message = "Link copied.") {
    try {
      await navigator.clipboard.writeText(url);
      flash(message);
    } catch {
      flash("Couldn't copy — select the link and copy it manually.");
    }
  }

  async function share() {
    if (!canShare) {
      void copy();
      return;
    }
    try {
      await navigator.share({ title: "Fittr", text: SHARE_TEXT, url });
    } catch {
      // A dismissed share sheet is not an error worth reporting.
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="px-5 pt-8">
        <Wordmark className="text-2xl" />
      </div>

      {/* ── the confirmation ─────────────────────────────────────── */}
      <div className="px-5 pt-10">
        <div className="relative">
          <div className="on-bone notch-lg bg-bone px-6 pt-7 pb-8 text-ink [filter:drop-shadow(5px_5px_0_var(--color-voltage))]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone-ink">
              {returning ? "Your place in line" : "You're on the waitlist"}
            </p>

            <p className="pt-3 font-display text-[4.5rem] font-black leading-[0.8] tabular-nums">
              {signup.waitlistPosition !== null
                ? `#${signup.waitlistPosition.toLocaleString("en-US")}`
                : "—"}
            </p>

            <h1
              ref={heading}
              tabIndex={-1}
              className="pt-4 font-display text-3xl font-extrabold uppercase leading-none tracking-[-0.01em] outline-none"
            >
              {signup.name ? `Nice work, ${signup.name.split(" ")[0]}.` : "You're in."}
            </h1>
          </div>

          {/* The stamp: the landing page's verification mark, landing on the
              one moment in this flow that is worth stamping. */}
          {!returning ? (
            <span className="notch-sm pointer-events-none absolute -top-4 right-1 animate-stamp bg-voltage px-4 py-2 font-display text-xl font-black uppercase leading-none tracking-[0.04em] text-ink">
              Confirmed
            </span>
          ) : null}
        </div>

        {/* PLACEHOLDER: bonus amount and terms pending confirmation. */}
        <p className="pt-6 text-bone-dim">
          {signup.bonusEligible ? (
            <>
              You made the first 1,000, so{" "}
              <span className="font-bold text-voltage">
                {BONUS_AMOUNT} is held for you
              </span>{" "}
              and lands in your account the day we launch.
            </>
          ) : (
            <>
              You&apos;re on the list, but{" "}
              <span className="font-bold text-voltage">
                the first 1,000 bonus spots are filled
              </span>
              . You still get in on day one — and referrals still pay.
            </>
          )}
        </p>
      </div>

      {/* ── referral: committed colour, full-bleed band ───────────── */}
      <section className="on-voltage mt-10 bg-voltage px-5 py-9 text-ink">
        <h2 className="font-display text-[2.25rem] font-extrabold uppercase leading-[0.9] tracking-[-0.015em]">
          Bring people with you.
        </h2>

        {/* PLACEHOLDER: referral bonus amount and mechanics not finalised. */}
        <p className="max-w-[46ch] pt-3 text-[1.0625rem] leading-snug text-voltage-shade">
          {REFERRAL_BONUS_AMOUNT} more for every friend who joins the waitlist on
          your link and downloads the app at launch.
        </p>

        {returning || signup.referralCount > 0 ? (
          <p className="pt-5 font-display text-2xl font-extrabold uppercase leading-none tabular-nums">
            {signup.referralCount}{" "}
            {signup.referralCount === 1 ? "friend has" : "friends have"} joined on
            your link
          </p>
        ) : null}

        {/* A plate on a voltage ground is ink-black — bone-on-voltage loses
            the contrast that makes a plate read as a separate object. */}
        <div className="mt-6 bg-ink px-4 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone-shade">
            Your link
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap pt-2 text-[0.9375rem] text-bone">
            {url}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => (canShare ? void share() : void copy())}
            className="flex flex-1 cursor-pointer items-center justify-center bg-ink px-6 py-4 text-sm font-extrabold uppercase tracking-[0.1em] text-voltage shadow-[5px_5px_0_var(--color-ink-deep)] transition-transform duration-150 active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0_var(--color-ink-deep)]"
          >
            {canShare ? "Share link" : "Copy link"}
          </button>

          {/* Only a second control when it does something different — without
              a share sheet, "Share" and "Copy" would be the same button twice. */}
          {canShare ? (
            <button
              type="button"
              onClick={() => void copy()}
              className="flex flex-1 cursor-pointer items-center justify-center border-2 border-ink px-6 py-4 text-sm font-extrabold uppercase tracking-[0.1em] text-ink transition-colors duration-150 hover:bg-ink hover:text-voltage"
            >
              Copy link
            </button>
          ) : null}
        </div>

        <p className="pt-3 text-sm font-bold text-voltage-shade" role="status">
          {notice ?? " "}
        </p>

        <div className="flex flex-wrap gap-3 pt-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-150 hover:bg-ink hover:text-voltage"
          >
            Post on X
          </a>
          <button
            type="button"
            // Instagram has no web share target, so the honest version is to
            // put the link on the clipboard and say where to paste it.
            onClick={() => void copy("Link copied — paste it into your story.")}
            className="cursor-pointer border-2 border-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-150 hover:bg-ink hover:text-voltage"
          >
            Instagram story
          </button>
        </div>
      </section>

      <div className="px-5 py-9">
        <p className="text-[0.9375rem] leading-relaxed text-bone-shade">
          We sent nothing to your inbox yet. The next email you get from us is
          the one that says the app is live.
        </p>
        <p className="pt-4 text-[0.9375rem] leading-relaxed text-bone-shade">
          Keep this link to check your place and your referrals:{" "}
          <a
            className="font-bold text-voltage underline underline-offset-4"
            href={`/status/${signup.referralCode}`}
          >
            {path.replace("/r/", "/status/")}
          </a>
        </p>
      </div>
    </div>
  );
}
