import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SecondaryButton from '@/components/Common/Buttons/SecondaryButton';
import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';
import iconFolder from '../../../../public/icon _folder_.png';

interface IDirectoryCard {
  title: string;
  linkTo: string;
}
const DirectoryCard = ({ title, linkTo }: IDirectoryCard) => {
  return (
    <motion.div
      className="max max-w-md"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={linkTo}>
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
          <div className="flex">
            <Image src={iconFolder} width={25} height={25} alt="folder icon" />
            <h3 className="text-xl font-semibold truncate ml-5">{title}</h3>
          </div>
          <div className="space-x-2 flex flex-col xs:flex-row justify-end items-center">
            <Link href={`${linkTo}/edit`}>
              <SecondaryButton label="Edit" onClick={() => {}} />
            </Link>
            <PrimaryButton label="View" onClick={() => {}} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DirectoryCard;
