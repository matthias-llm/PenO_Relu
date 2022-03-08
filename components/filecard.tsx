import { IFile } from "../types";
import { AiOutlineFile, AiOutlineDelete } from "react-icons/ai";
import Link from 'next/link';

type FileCardProps = {
    file: IFile;
    deleteFile: Function
};

export default function FileCard({ file, deleteFile }: FileCardProps) {

    const onDelete = () => {
        /*
        deleteFile(file._id)

        fetch('/api/delete_file', {
            method: 'POST',
            body: JSON.stringify({ file }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        */
        console.log("test")
    }


    return (
        <div className="relative text-gray-700 text-2xl">
            <div className="absolute top-6 -right-10"><button onClick={onDelete}><AiOutlineDelete className="w-7 h-7" /></button></div>
            <div className="">
                <Link href="/">
                    <a>
                        <div className="flex items-center">
                            <AiOutlineFile className="text-5xl" />
                            <div className="w-120 text-gray-700 p-5">
                                <div className="text-2xl mb-1">{file.title}{file.save_time}</div>
                                <div className="text-1xl mb-2">{file.patient}</div>
                            </div>
                        </div>
                    </a>
                </Link>

            </div>

        </div>
    );
}
