"use client";
import { TableDemo } from "@/components/admin_dashboard/components/TableDemo";
import { useParams } from 'next/navigation';
import { currentProfile } from "@/lib/currentProfile";
import { Button } from "@/components/ui/button"; 
import Link from "next/link";

const CoursePage = async () => {
  const { course_name } = useParams();
  const profile = await currentProfile();

  return (
    <div>
      <Link href={`${course_name}/mark_attendance`}><Button className='w-full mt-6'>Mark Attendance</Button></Link>
      
      <TableDemo studentId={profile?.student?.id} courseId={course_name} />
    </div>
  );
};

export default CoursePage;
