import { currentProfile } from "@/lib/currentProfile";
import { TableDemo } from "@/components/admin_dashboard/components/TableDemo";
import { Table } from "lucide-react";

const Attendence =async () => {
  const profile=await currentProfile();
  
  return (
    <TableDemo teacherId={profile?.teacher.id}/>
  )
}

export default Attendence