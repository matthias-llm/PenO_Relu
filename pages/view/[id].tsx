import AnnotationBar from "../../components/annotationbar";
import { getAnnotations, writeAnnotation, getFile } from "../../lib/annotations";
import { GetServerSideProps } from "next";
import PopUp from "../../components/PopUp";
import Sidebar from "../../components/layout/Sidebar";
import Stlviewer from "../../components/stlviewer";
import { useRouter } from 'next/router'




export default function Home({ annotations, file }) {
  return (
    <div
      id="main_container"
      className="min-h-screen min-w-screen flex flex-row "
    >
      <div className="absolute left-0">
        <AnnotationBar cardsInput={annotations} />
      </div>
      <Stlviewer />
      <div className="absolute right-0 flex flex-row">
        <PopUp file={file} />
        <Sidebar />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // TODO: Now just loads random file
  const { id } = ctx.query
  const file_id = parseInt(id[0])
  const file = await getFile(file_id);
  const annotations = await getAnnotations(file);

  return {
    props: { annotations, file}, // will be passed to the page component as props
  };
};