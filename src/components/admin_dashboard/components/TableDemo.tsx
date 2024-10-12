"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAttendanceRecords } from "@/lib/actions"; // Ensure the path is correct

// TableDemo now accepts attendance records and optional studentId, courseId, and teacherId
export function TableDemo({ studentId = null, courseId = null, teacherId = null }) {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch attendance records when TableDemo mounts or when studentId/courseId/teacherId changes
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('inside',studentId);
        const records = await getAttendanceRecords(studentId, courseId, teacherId);
        setAttendanceRecords(records);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
        setError("Failed to load attendance records.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [studentId, courseId, teacherId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableCaption>A list of student attendance records.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-left">Student</TableHead>
          <TableHead className="text-left">Course</TableHead>
          <TableHead className="text-left">Date</TableHead>
          <TableHead className="text-left">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendanceRecords.length > 0 ? (
          attendanceRecords.map((record) => (
            <TableRow key={record.student.user.username + record.date} className="hover:bg-gray-100">
              <TableCell className="font-medium text-gray-800">{record.student.user.username}</TableCell>
              <TableCell className="text-gray-600">{record.course.name}</TableCell>
              <TableCell className="text-gray-600">{new Date(record.date).toLocaleString()}</TableCell>
              <TableCell className={`font-semibold ${
                record.status === 'PRESENT' ? 'text-green-600' : 
                record.status === 'POTENTIAL_PROXY' ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {record.status === 'PRESENT' ? 'Present' : 
                 record.status === 'POTENTIAL_PROXY' ? 'Proxy' : 
                 'Absent'}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4 text-gray-500">
              No records found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
