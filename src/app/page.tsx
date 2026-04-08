import HomeClient from "@/components/HomeClient";
import { getSession } from "@/lib/getSession";


// src/app/page.tsx
export default async function Home() {
  const session = await getSession();
  
  // Use "||" to ensure if email is missing, we pass an empty string
  return (
    <>
      <HomeClient email={session?.user?.email || ""} />
    </>
  );
}