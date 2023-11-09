import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import {
  getPosts,
  toggleFavoritePost,
  toggleLikePost,
} from "../../services/posts.service";

import { useAuth } from "../../utils/tempUser";
import { useRef, useState, useEffect } from "react";
import CommentCard from "./components/CommentCard/CommentCard";
import ActionsControllers from "../../components/ActionsControllers/ActionsControllers";
import InteractionsDetails from "../../components/InteractionsDetails/InteractionsDetails";
import CommentForm from "../../components/CommentForm/CommentForm";
import PostDetails from "../../components/PostDetails/PostDetails";
import CommentSection from "./components/CommentSection/CommentSection";

function Details() {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const postId = window.location.pathname.split('/').pop();
  const { token, user } = useAuth();
  const [post, setPost] = useState('')
  const [postLikes, setLikes] = useState();
  const [comments, setComments] = useState([]);
 

  const handleComment = () => {
    inputRef.current.focus();
  };

  const getData = async () => {
    try {
      setLoading(true);
      console.log(postId);
      let response = await getPosts({ token, endpoint: postId });
      if (response) {
        console.log(response);
        setPost(response.data);
        setComments(response.data.comments);
        console.log(response.data.isLiked);
        console.log(response.data.comments);
        setLoading(false);
      } 
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
      setLoading(false);
    }
};

useEffect(() => {
  getData();
}, []);


  return (
    <main className="flex-1 absolute top-0 py-14 lg:pb-0 flex flex-col justify-center items-center w-full h-screen">
      <Card className="lg:w-10/12 lg:h-full lg:my-5 w-full h-full ">
        <CardHeader className="justify-between px-5 mt-2">
          <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={post ? post.user.picture : ''} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <p className="text-small font-semibold leading-none">{post ? `${post.user.name} ${post.user.lastname}` : ''}</p>
              <p className="text-small tracking-tight">{post ? `@${post.user.username}` : ''}</p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col  w-full max-h-full py-0 items-center lg:px-0 lg:items-start lg:gap-2 lg:flex-row ">
          <div className="lg:w-1/2 lg:flex overflow-hidden lg:h-full lg:items-center lg:justify-center">
            <Image
              alt="Card background "
              className="object-cover rounded-xl"
              src={post ? post.image : ''}
              width={600}
            />
          </div>
          <div className="lg:w-1/2 flex flex-col h-full lg:overflow-hidden lg:mt-0 mt-2 gap-3 lg:px-2 lg:pb-2">
            <ActionsControllers onComment={handleComment}  isLiked={post ? post.isLiked : false} />
            <PostDetails description={post ? post.description : ''} />
            <InteractionsDetails onComment={handleComment} likes={post.likes} comments={post ? post.comments.length : ''}/>
            <div className="w-full lg:order-5">
              <CommentForm inputRef={inputRef} />
            </div>
            <div className="flex flex-col lg:h-full lg:overflow-auto gap-3 lg:p-2 rounded-lg">

            {!loading &&
           comments.map((comments) => (
          <CommentCard
          key={comments.createdAt}
            info={comments}
          />
        ))}

            </div>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}

export default Details;
