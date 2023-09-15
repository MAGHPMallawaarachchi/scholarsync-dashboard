// pages/api/getClubById.js (or .ts)

import { NextApiRequest, NextApiResponse } from 'next';
import { getClubById } from '@/app/(server)/firebase/club.firestore'; // Import your getClubById function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query; // Retrieve the 'id' query parameter

    try {
      const club = await getClubById(id as string); // Call your getClubById function

      if (club) {
        res.status(200).json(club);
      } else {
        res.status(404).json({ error: 'Club not found' });
      }
    } catch (error) {
      console.error('Error fetching club by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
