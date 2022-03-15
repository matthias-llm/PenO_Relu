import AnnotationBar from "../../components/annotationbar";
import {
  getAnnotations,
  writeAnnotation,
  getFile,
} from "../../lib/annotations";
import { GetServerSideProps } from "next";
import PopUp from "../../components/PopUp";
import Sidebar from "../../components/layout/Sidebar";
import Stlviewer from "../../components/stlviewer";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function Home({ file }) {
  return (
    <div
      id="main_container"
      className="min-h-screen min-w-screen flex flex-row "
    >
      <div className="absolute left-0">
        <AnnotationBar file={file}/>
      </div>
      <Stlviewer />
      <div className="absolute right-0">
        <div className="absolute right-0 bottom-0">
          <PopUp file={file} />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);
    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        };
    }
  const { id } = ctx.query;
  const file_id = parseInt(id[0]);
  const file = await getFile(file_id);
  file.cards = await getAnnotations(file);

  return {
    props: { file }, // will be passed to the page component as props
  };
};
