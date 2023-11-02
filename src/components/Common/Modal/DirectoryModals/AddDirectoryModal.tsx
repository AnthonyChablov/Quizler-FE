import React, { useState, useEffect } from "react";
import CustomButton from "../../../Common/Buttons/CustomButton";
import CloseButton from "../../../Common/Buttons/CloseButton";
import { useSideDrawerStore } from "@/store/useSideDrawerStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import { mutate } from "swr";
import { useNotificationStore } from "@/store/useNotificationStore";
import Container from "@/components/Common/Container";
import FormTextInput from "@/components/Common/Form/FormTextInput";
import { createDirectory } from "@/api/directoryData";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import Modal from "../Modal";

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
    const { toggleIsNotificationOpen, setNotificationMode } =
    useNotificationStore();

    const { toggleAddDirectorySideDrawer } = useSideDrawerStore();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    // Submits the create directory data
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          setIsLoading(true);
          await createDirectory(directoryTitle, parentDirectoryTitle);
          setDirectoryTitle("")
          mutate("https://quizzlerreactapp.onrender.com/api/directory");
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
                {/** chloe: this is in a side drawer (similar to quiz experience) */}
                <Container>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl md:text-3xl font-semibold">
                    Add A New Directory
                    </h2>
                    <CloseButton onClick={() => toggleAddDirectorySideDrawer(false)} />
                </div>
                {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                        <Container>
                            {/* Directory Title Input */}
                            {/** FIXME: needs a different type of input type? */}
                            <FormTextInput
                                displayLabel={true}
                                quizTitle="QuestionInput"
                                label="Quiz Title:"
                                onChange={(e) => setDirectoryTitle(e.target.value)}
                                type="text"
                                value={directoryTitle}
                                isRequired={true}
                                placeHolder="Enter Directory Title Here..."
                            />

                            {/** Parent Directory Dropdown menu, only shows options if is not in a parent directory */}
                            {!parentDirectoryId ? (
                                // TODO: show dropdown list of all the available directories for a user
                                <div></div>
                            ) : (
                                // TODO: show a ghost dropdown/textbox of the parent directory it is in?
                                <div></div>
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