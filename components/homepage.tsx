import PatientList from "./patient_overview";
import FileList from "./file_overview";
import { IFile, IPatient } from "../types";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid"
import { useSession } from "next-auth/react"

type HomePageProps = {
    patients_input: IPatient[];
    files_input: IFile[];
}


export default function HomePage({ patients_input, files_input }: HomePageProps) {
    const patient1Logged = files_input.filter((file) => patients_input[0].file_ids.some((id) => file._id == id))
    const [loggedFiles, setLoggedFiles] = useState(patient1Logged);
    return (
        <div className="min-w-screen min-h-screen flex flex-col items-start m-8">
            <div className="absolute top-12">
                <PatientList patients_input={patients_input} />
                <FileList files_input={loggedFiles} />
            </div>
        </div>
    );

}