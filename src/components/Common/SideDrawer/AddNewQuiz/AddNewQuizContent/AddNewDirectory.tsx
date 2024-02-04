import React, { useState } from 'react';
import CustomButton from '../../../Buttons/CustomButton';
import { useSideDrawerStore } from '@/store/useSideDrawerStore';
import Container from '@/components/Common/Container';
import { useLoadingStore } from '@/store/useLoadingStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import { createDirectory } from '@/api/directoryData';

const AddNewDirectory = () => {
  const { setIsLoading } = useLoadingStore();
  const [directoryName, setDirectoryName] = useState('');
  const { toggleAddQuizSideDrawer } = useSideDrawerStore();
  const { toggleIsNotificationOpen, setNotificationMode } =
    useNotificationStore();

  const handleSubmitDirectory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await createDirectory(directoryName);
      setDirectoryName('');
      toggleAddQuizSideDrawer(false);
    } catch (error) {
      setIsLoading(false);
      toggleIsNotificationOpen(true);
      setNotificationMode('error');
      console.error('An error occurred during directory creation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmitDirectory}>
      <Container>
        {/* Directory Name Input */}
        <div className="mb-5">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="directoryName"
          >
            Directory Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="directoryName"
            type="text"
            placeholder="Enter Directory Name Here..."
            value={directoryName}
            onChange={(e) => setDirectoryName(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-2">
          <CustomButton
            label="Add Directory"
            textSize="text-sm md:text-md"
            type="submit"
          />
        </div>
      </Container>
    </form>
  );
};

export default AddNewDirectory;
