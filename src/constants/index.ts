import { FiHome } from 'react-icons/fi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdPeopleAlt } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';

export const NavLinks = [
    { title: "Dashboard", path: "/dashboard", icon: "FiHome" },
    { title: "Timetable", path: "/dashboard/timetable", icon: "FaRegCalendarAlt" },
    { title: "Lecturers", path: "/dashboard/lecturers", icon: "BsFillPersonFill" },
    { title: "Clubs", path: "/dashboard/clubs", icon: "MdPeopleAlt" },
]