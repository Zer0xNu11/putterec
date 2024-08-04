"use client";

import { createPost, PostFormState } from "@/actions/createPost";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useMarkerStore } from "@/store";
import PostLocation from "../map/PostLocation";
import type { PutBlobResult } from "@vercel/blob";
import { NoteFormState } from "@/actions/createNote";
import { NoteType } from "@/types";
import { Button } from "../ui/button";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/app/loading";

import { MapPinPlus } from "@phosphor-icons/react/dist/ssr/MapPinPlus";
import { LineSegments } from "@phosphor-icons/react/dist/ssr/LineSegments";
import { revalidatePath } from "next/cache";
import Link from "next/link";

interface PostFormProps {
  note: NoteType;
}

const PostForm = ({ note }: PostFormProps) => {
  const [isOpen, setIsOpen] = useState(0);
  const openPostForm = () => {
    setIsOpen(1);
  };
  const noteId = note.id;

  const currentPath = usePathname();
  console.log({ currentPath: currentPath });
  const closeButton = () => {
    setIsOpen(0);
  };

  const [text, setText] = useState("");
  const initialState: PostFormState = {
    error: "",
    noteId: note.id,
    path: currentPath,
  };
  const [state, formAction] = useFormState(createPost, initialState);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const limitLength = 60; //文字数制限
  const [remLength, setRemLength] = useState(limitLength);
  const [loading, setLoading] = useState(false);

  const PendLoading = () => {
    const { pending } = useFormStatus();
    console.log({ pending: pending });
    return pending ? <Loading /> : "";
  };

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <>
        <button
          type="submit"
          className={`mt-2 bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-300`}
          disabled={remLength < 0 || pending}
        >
          投稿!!
        </button>
        <PendLoading />
      </>
    );
  };

  const { marker } = useMarkerStore();

  const fileSelectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRemLength(limitLength - text.length);
  }, [text]);

  useEffect(() => {
    state.positionLat = marker?.lat || null;
    state.positionLng = marker?.lng || null;
    console.log({ zustandmarker: marker });
    console.log({ state: state.positionLng });
    console.log({ state: state });
    console.log(`../home/notes`)
  }, [marker]);

  if (isOpen === 0) {
    return (
      <>
        <button
          className="bg-green-400 rounded-full p-2 m-2 border-black border-2"
          onClick={openPostForm}
        >
          <MapPinPlus size={32} color="#050505" weight="duotone" />
        </button>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/map/${noteId}`}>
          <button className=" bg-red-400 rounded-full p-2 m-2 border-black border-2">
            <LineSegments size={32} color="#050505" weight="duotone" />
          </button>
        </Link>
      </>
    );
  }

  {
    return (
      <div
        className={`min-h-screen right-0 left-0 bg-gray-100 ${
          isOpen ? "absolute" : "hidden"
        }`}
      >
        <button onClick={closeButton}>X</button>
        <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-col items-center">
          <form action={formAction}>
            <textarea
              name="post"
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            <div
              className={`${remLength >= 0 ? "" : "text-red-500"}`}
            >{`残り${remLength}文字`}</div>
            <input type="file" name="image" />
            {/* <input type="file" name='file' ref={fileSelectRef}/> */}

            <SubmitButton />
          </form>
          <div className="w-[80%] h-[50vh]">
            <PostLocation />
          </div>
        </div>
      </div>
    );
  }
};

export default PostForm;
