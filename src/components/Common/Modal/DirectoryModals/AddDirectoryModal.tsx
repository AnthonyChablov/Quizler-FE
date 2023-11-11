import React, { useState, useEffect } from "react";
import CustomButton from "../../../Common/Buttons/CustomButton";
import CloseButton from "../../../Common/Buttons/CloseButton";
import { useSideDrawerStore } from "@/store/useSideDrawerStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import { mutate } from "swr";
import useSWR from "swr";
import { useNotificationStore } from "@/store/useNotificationStore";
import Container from "@/components/Common/Container";
import FormTextInput from "@/components/Common/Form/FormTextInput";
import { createDirectory } from "@/api/directoryData";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import Modal from "../Modal";
import { fetchData } from "@/api/quizData";

export interface AddDirectoryModalProps{
    isOpen: boolean;
    onClose: () => void;
    parentDirectoryId?: string;
}

export const AddDirectoryModal = ({
    parentDirectoryId,
    isOpen,
    onClose,
}: AddDirectoryModalProps) => {
    /** State */
    const { isLoading, setIsLoading } = useLoadingStore();
    const [directoryTitle, setDirectoryTitle] = useState("");
    const [parentDirectoryTitle, setParentDirectoryTitle] = useState("");
    const [selectedDirectory, setSelectedDirectory] = useState(""); // State for selected directory
    const { toggleIsNotificationOpen, setNotificationMode } =
    useNotificationStore();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const {
        data: directoryData,
        error: directoryError,
        isLoading: directoryLoading,
      } = useSWR(
        `https://quizzlerreactapp.onrender.com/api/directory/6508bbf7a027061a12c9c8e4`,
        fetchData,
        {
          revalidateOnFocus: false,
          refreshInterval: 300000,
        }
    );

    const directories = directoryData?.subdirectories || [];

    // Submits the create directory data
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          setIsLoading(true);
          // FIXME: will need to update the parentDirectoryId input to be for an existing directory
          await createDirectory(directoryTitle, parentDirectoryId);
          setDirectoryTitle("")
          mutate("https://quizzlerreactapp.onrender.com/api/directory");
          onClose();
        } catch (error) {
          setIsLoading(false);
          toggleIsNotificationOpen(true);
          setNotificationMode("error");
          console.error("An error occurred during directory submission:", error);
        }
      };

    // Component UI
    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <div>
                <Container>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl md:text-3xl font-semibold">
                    Add A New Directory
                    </h2>
                    <CloseButton onClick={onClose} />
                </div>
                {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <Container>
                                {/* Directory Title Input */}
                                {/** FIXME: needs a different type of input type? */}
                                <FormTextInput
                                    displayLabel={true}
                                    quizTitle="QuestionInput"
                                    label="Directory Name"
                                    onChange={(e) => setDirectoryTitle(e.target.value)}
                                    type="text"
                                    value={directoryTitle}
                                    isRequired={true}
                                    placeHolder="Enter Directory Name Here..."
                                />

                                {/** Parent Directory Dropdown menu, only shows options if is not in a parent directory */}
                                {!parentDirectoryId ?? (
                                    // show dropdown list of all the available directories for a user
                                    <div className="mb-5">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Add Directory to a directory
                                        </label>
                                        <select
                                            className="shadow cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="selectedDirectory"
                                            value={selectedDirectory}
                                            onChange={(e) => {
                                            setSelectedDirectory(e.target.value);
                                            }}
                                        >
                                            <option value="">Select an existing directory</option>
                                            {directories.map((directory: any) => (
                                            <option key={directory.id} value={directory._id}>
                                                {directory.name}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                        
                                {/* Create Button */}
                                <div className="text-center mt-2">
                                <CustomButton
                                    label="Add Directory"
                                    textSize="text-sm md:text-md"
                                    type="submit"
                                />
                                </div>
                            </Container>
                        </form>
                ) : (
                    <div>
                        <LoadingSpinner text="Creating Your Directory" />
                    </div>
                )}
                </Container>       
            </div> 
        </Modal>
    );
};