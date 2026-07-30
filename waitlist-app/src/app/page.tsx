import { redirect } from "next/navigation";

/**
 * This app owns the waitlist flow only. The marketing landing page is the
 * static site one directory up; in production it serves `/` and links here.
 */
export default function Home() {
  redirect("/join");
}
