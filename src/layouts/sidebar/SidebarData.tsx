import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { IoIosPaper, IoMdTrophy } from 'react-icons/io';
import { IoStatsChart } from 'react-icons/io5';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'List',
    path: '/list',
    icon: <IoIosPaper />,
    cName: 'nav-text',
  },
  {
    title: 'Statistics',
    path: '/stats',
    icon: <IoStatsChart />,
    cName: 'nav-text',
  },
  {
    title: 'Leaderboard',
    path: '/leaderboard',
    icon: <IoMdTrophy />,
    cName: 'nav-text',
  },
];
