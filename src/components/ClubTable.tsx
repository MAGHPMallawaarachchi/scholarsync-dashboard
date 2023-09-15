import React, { useEffect, useState } from 'react';
import Club from '@/app/(server)/models/Club';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { deleteClubById, getAllClubs } from '@/app/(server)/firebase/club.firestore';
import Link from 'next/link';

const ClubTable = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [expandedText, setExpandedText] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const fetchedClubs = await getAllClubs();
        setClubs(fetchedClubs);
      } catch (error) {
        alert('Failed to fetch clubs. Try again!' + error);
      }
    }

    fetchClubs();
  }, []);

  const toggleExpandText = (text: string | null) => {
    setExpandedText(text !== expandedText ? text : null);
  };

  const handleDeleteClub = async (clubId: string) => {
    try {
      await deleteClubById(clubId);
      alert('Club deleted successfully!');
      window.location.reload();

    } catch (error) {
      alert('Error deleting club:' +error);
    }
  };
  
  return (
    <div className="mx-auto bg-backgroundlight p-5 rounded-xl w-full">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="table-header">ID</th>
            <th className="table-header">Logo</th>
            <th className="table-header">Name</th>
            <th className="table-header">About</th>
            <th className="table-header">In Charge</th>
            <th className="table-header">President</th>
            <th className="table-header">Email</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club, index) => (
            <tr key={club.id}>
              <td className="table-text">{index + 1}</td>
              <td className="table-text">
                {club.profileImageURL && (
                  <img
                    src={club.profileImageURL}
                    alt={club.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </td>

              <td className="table-text">{club.name}</td>
              <td className="table-text max-w-xs">{club.about}</td>
              <td className="table-text">{club.inCharge}</td>
              <td className="table-text">{club.president}</td>
              <td className="table-text">{club.email}</td>

              <td className="table-text">
                <Link href={`/dashboard/clubs/edit-club/${club.id}`}>
                  <button className='p-2'><AiFillEdit size='20'/></button>
                </Link>
                <button onClick={() => handleDeleteClub(club.id!)}><MdDelete size='20'/></button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubTable;
