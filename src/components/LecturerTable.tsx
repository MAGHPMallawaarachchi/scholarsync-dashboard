import { deleteLecturerById, getAllLecturers } from '@/app/(server)/firebase/firestore/lecturer.firestore';
import Lecturer from '@/app/(server)/models/Lecturer';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

const LecturerTable = () => {
  const [lecturers, setLecurers] = useState<Lecturer[]>([]);

  useEffect(() => {
    async function fetchLecturers() {
      try {
        const fetchedLecturers = await getAllLecturers();
        setLecurers(fetchedLecturers);
      } catch (error) {
        alert('Failed to fetch lecturers. Try again!' + error);
      }
    }

    fetchLecturers();
  }, []);

  const handleDeleteLecturer = async (lecturerId: string) => {
    try {
      await deleteLecturerById(lecturerId);
      alert('Lecturer deleted successfully!');
      window.location.reload();

    } catch (error) {
      alert('Error deleting lecturer:' +error);
    }
  };

  return (
    <div className="mx-auto bg-backgroundlight p-5 rounded-xl w-full">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="table-header">ID</th>
            <th className="table-header">Profile Image</th>
            <th className="table-header">Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Phone</th>
            <th className="table-header">Faculty</th>
            <th className="table-header">Department</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((lecturer, index) => (
            <tr key={lecturer.id}>
              <td className="table-text">{index + 1}</td>
              <td className="table-text">
                {lecturer.profileImageURL && (
                  <img
                    src={lecturer.profileImageURL}
                    alt={lecturer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </td>

              <td className="table-text">{lecturer.name}</td>
              <td className="table-text max-w-xs">{lecturer.email}</td>
              <td className="table-text">{lecturer.phone}</td>
              <td className="table-text">{lecturer.faculty}</td>
              <td className="table-text">{lecturer.department}</td>

              <td className="table-text">
                <Link href={`/dashboard/lecturers/edit-lecturer/${lecturer.id}`}>
                  <button className='p-2'><AiFillEdit size='20'/></button>
                </Link>
                <button onClick={() => handleDeleteLecturer(lecturer.id!)}><MdDelete size='20'/></button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LecturerTable