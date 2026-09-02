import { redirect } from "next/navigation";

/**
 * This app owns the waitlist flow only. `/` is claimed by a `beforeFiles`
 * rewrite in next.config.ts that proxies it to the static marketing site
 * (the `fittr-landing` project), so this component never actually runs in
 * a deployment that has that rewrite — it's a fallback for the unlikely
 * case someone removes it.
 */
export default function Home() {
  redirect("/join");
}
