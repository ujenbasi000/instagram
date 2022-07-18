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
import { getDate } from "../../helpers/utility";
import "swiper/css";
import Video from "../MiniComponents/Video";
import {
  likePost,
  commentPost,
  savePost,
} from "../../helpers/async/post.async";
import {
  COMMENT_POST_MUTATION,
  LIKE_POST_MUTATION,
  SAVE_POST_MUTATION,
} from "../../graphql/post.query";
import useGlobalcontext from "../../hooks/useGlobalcontext";
import { useMutation } from "@apollo/client";
import UnLike from "../../public/assets/icons/UnLike";
import Loading from "../../public/assets/remove.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper";
import { like, save, submitComment } from "../../helpers/functions";
import SolidBookmark from "../../public/assets/icons/SolidBookmark";
import OwnComment from "../MiniComponents/OwnComment";

const PostCard = ({ post: postData, setViewPost, setViewPostId }) => {
  const [post, setPost] = useState(postData);
  const [comment, setComment] = useState({ content: "" });
  const [commentLoading, setCommentLoading] = useState(false);
  const [postBtnDisable, setPostBtnDisable] = useState(true);
  const [ownComment, setOwnComment] = useState([]);
  const [resize, setResize] = useState(true);
  const [likePostMutation] = useMutation(LIKE_POST_MUTATION);
  const [commentPostMutation] = useMutation(COMMENT_POST_MUTATION);
  const [savePostMutation] = useMutation(SAVE_POST_MUTATION);
  const { user, token } = useGlobalcontext();
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  // const [imageNavigation, setImageNavigation] = useState(0);

  useEffect(() => {
    setPost(postData);
  }, [postData]);

  useEffect(() => {
    const comments = postData.comments.map((comment) =>
      comment.user._id === user._id ? comment : null
    );
    if (comments) {
      setOwnComment(comments);
    }
  }, [postData]);

  useEffect(() => {
    if (post) {
      const hasLiked = post.likes.users.find((like) => like === user._id);
      if (hasLiked) {
        setHasLiked(true);
      } else {
        setHasLiked(false);
      }
    }
  }, [post.likes]);

  useEffect(() => {
    if (post) {
      const hasSaved = post.saves.users.find((save) => save === user._id);
      if (hasSaved) {
        setHasSaved(true);
      } else {
        setHasSaved(false);
      }
    }
  }, [post.saves]);

  useEffect(() => {
    if (comment.content.trim().length > 0) {
      setPostBtnDisable(false);
    } else {
      setPostBtnDisable(true);
    }
  }, [comment.content]);

  return (
    <div className="relative border border-[border] bg-white rounded-lg max-w-[33rem] w-full my-4 shadow-sm">
      <header className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            className="rounded-full object-fit"
            src={post.user.profile || DefaultProfile}
            alt="avatar"
            width={31}
            height={31}
          />
          <div className="ml-2">
            <Link href={`/${post.user.username}`}>
              <p className="text-xs font-semibold cursor-pointer">
                {post.user.username}
              </p>
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <button className="cursor-pointer">
            <More />
          </button>
        </div>
      </header>
      <section className="min-h-fit">
        <div className="w-full overflow-hidden relative">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            modules={[Navigation, Pagination]}
            className="mySwiper"
          >
            {post.collections.map((collection) =>
              collection.type === "video" ? (
                <SwiperSlide>
                  <Video url={collection.url} />
                </SwiperSlide>
              ) : (
                <SwiperSlide>
                  <img
                    src={collection.url}
                    alt="No Image"
                    className="w-full"
                    onDoubleClick={() =>
                      like(
                        post._id,
                        post,
                        user,
                        setHasLiked,
                        setPost,
                        likePost,
                        token,
                        likePostMutation
                      )
                    }
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </section>
      <section className="p-3 relative text-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() =>
                like(
                  post._id,
                  post,
                  user,
                  setHasLiked,
                  setPost,
                  likePost,
                  token,
                  likePostMutation
                )
              }
            >
              {hasLiked ? <UnLike /> : <Like />}
            </button>
            <button
              onClick={() => {
                setViewPostId(post._id);
                setViewPost(true);
              }}
            >
              <Comment />
            </button>
            <button>
              <Share />
            </button>
          </div>

          <div className="flex items-center justify-between gap-6">
            <button
              onClick={() =>
                save(
                  post._id,
                  post,
                  user,
                  setHasSaved,
                  setPost,
                  savePost,
                  token,
                  savePostMutation
                )
              }
            >
              {hasSaved ? <SolidBookmark /> : <Bookmarks />}
            </button>
          </div>
        </div>
        <div className="mb-2">
          <p className="font-medium text-xs">{post.likes.total} likes</p>
        </div>
        <div className="mb-2">
          <Link href="/">
            <span className="cursor-pointer text-xs font-medium mr-1">
              {post.user.username}
            </span>
          </Link>
          <span className="text-xs">
            {resize ? resizeText(post.caption, setResize, 120) : post.caption}
          </span>
        </div>
        {post.comments.length > 0 && (
          <div className="mb-2">
            <button
              onClick={() => {
                setViewPostId(post._id);
                setViewPost(true);
              }}
              className="text-gray-500"
            >
              View all {post.comments.length} comments
            </button>
          </div>
        )}
        {ownComment.length > 0 && (
          <section className="mb-2">
            {ownComment.map((comment) => (
              <OwnComment comment={comment} />
            ))}
          </section>
        )}
        <div>
          <p className="text-gray-500 text-xs">{getDate(post.createdAt)}</p>
        </div>
      </section>

      {commentLoading ? (
        <footer className="border-t border-[light] py-2 px-3 flex items-center justify-center">
          <div className="loading">
            <Image src={Loading} width={25} height={25} />
          </div>
        </footer>
      ) : (
        <footer className="border-t border-[light] py-2 px-3 flex items-center justify-between">
          <button type="button">
            <Smile />
          </button>
          <form
            onSubmit={(e) =>
              submitComment(
                e,
                token,
                setCommentLoading,
                commentPost,
                setPost,
                setOwnComment,
                setComment,
                commentPostMutation,
                comment,
                post,
                user
              )
            }
            className="flex w-full"
          >
            <input
              type="text"
              name="content"
              autoComplete="off"
              value={comment.content}
              onChange={(e) => handler(e, comment, setComment)}
              className="w-full px-4 py-2 outline-none text-sm"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="text-blue-500 font-medium disabled:text-opacity-50"
              disabled={postBtnDisable}
            >
              Post
            </button>
          </form>
        </footer>
      )}
    </div>
  );
};

export default PostCard;
