import React, { useEffect, useState } from "react";
import More from "../../public/assets/icons/More";
import Image from "next/image";
import Like from "../../public/assets/icons/Like";
import Share from "../../public/assets/icons/Share";
import Comment from "../../public/assets/icons/Comment";
import Bookmarks from "../../public/assets/icons/Bookmarks";
import Link from "next/link";
import Smile from "../../public/assets/icons/Smile";
import { handler, resizeText } from "../../helpers/utility";
import DefaultProfile from "../../public/assets/default.jpg";

const PostCard = ({ post }) => {
  const [comment, setComment] = useState({ content: "" });
  const [postBtnDisable, setPostBtnDisable] = useState(true);
  const [resize, setResize] = useState(true);

  useEffect(() => {
    if (comment.content.trim().length > 0) {
      setPostBtnDisable(false);
    } else {
      setPostBtnDisable(true);
    }
  }, [comment.content]);

  return (
    <div className="relative z-40 border border-gray-300 rounded-lg max-w-xl w-full my-2">
      <header className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            className="rounded-full object-fit"
            src={DefaultProfile}
            alt="avatar"
            width={31}
            height={31}
          />
          <div className="ml-2">
            <p className="text-sm font-medium">{post.user.username}</p>
          </div>
        </div>
        <div className="flex items-center">
          <button className="cursor-pointer">
            <More />
          </button>
        </div>
      </header>
      <section className="min-h-fit">
        <div className="w-full">
          <img className="w-full" src={post.collections[0]} />
        </div>
      </section>
      <section className="py-3 px-3  text-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center justify-between gap-6">
            <button>
              <Like />
            </button>
            <button>
              <Comment />
            </button>
            <button>
              <Share />
            </button>
          </div>
          <div className="flex items-center justify-between gap-6">
            <button>
              <Bookmarks />
            </button>
          </div>
        </div>
        <div className="mb-2">
          <p className="font-medium">{post.likes.total} likes</p>
        </div>
        <div className="mb-2">
          <Link href="/">
            <span className="cursor-pointer font-medium mr-2">
              {post.user.username}
            </span>
          </Link>
          <span className="">
            {resize ? resizeText(post.caption, setResize, 120) : post.caption}
          </span>
        </div>
        {post.comments.length > 0 && (
          <div className="mb-2">
            <p className="text-gray-500">
              View all {post.comments.length} comments
            </p>
          </div>
        )}
        <div>
          <p className="text-gray-500">{post.createdAt}</p>
        </div>
      </section>
      <footer className="border-t border-gray-300 py-2 px-3 flex items-center justify-between">
        <button>
          <Smile />
        </button>
        <input
          type="text"
          name="content"
          value={comment.content}
          onChange={(e) => handler(e, comment, setComment)}
          className="w-full px-4 py-2 outline-none text-sm"
          placeholder="Add a comment..."
        />
        <button
          className="text-blue-500 font-medium disabled:text-opacity-50"
          disabled={postBtnDisable}
        >
          Post
        </button>
      </footer>
    </div>
  );
};

export default PostCard;
