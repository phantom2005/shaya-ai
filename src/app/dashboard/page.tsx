export const dynamic = "force-dynamic";
import DashboardClient from '@/components/DashboardClient'
import { getSession } from '@/lib/getSession'

async function page() {

  const session=await getSession()
  return (
    <div><DashboardClient ownerId={session?.user?.id || "default-id"}/></div>
  )
}

export default page
