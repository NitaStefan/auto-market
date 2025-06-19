import {
  getNunmberOfReactions,
  getPostComments,
} from "@/lib/actions/facebook/actions";
import { Heart, MessageCircle, Smile, ThumbsUp } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { getUser } from "@/lib/actions/app/actions";

const Engagement = async ({ postId }: { postId?: string }) => {
  if (!postId) return null;

  const user = await getUser();

  if (!user) return null;

  const [commentsData, noOfReactions] = await Promise.all([
    getPostComments(postId),
    getNunmberOfReactions(postId),
  ]);

  if (!commentsData || noOfReactions === undefined) return null;

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <div className="text-txt-secondary-600 absolute top-7.5 right-2 flex items-center">
          <ThumbsUp size={16} className="absolute top-0 right-0 -rotate-30" />
          <Heart
            size={12}
            strokeWidth={2.5}
            className="absolute top-0 right-3 -rotate-20"
          />
          <Smile
            size={10}
            strokeWidth={3}
            className="absolute top-2.5 right-3.5"
          />
          <span className="absolute -top-1 -right-2.5 text-base text-black">
            {noOfReactions}
          </span>
          <MessageCircle
            strokeWidth={1.75}
            size={20}
            className="absolute top-5 right-0"
          />
          <span className="absolute top-4.5 -right-2 text-base text-black">
            {commentsData.length}
          </span>
          {/* <EngagementPopover reacts={noOfReactions} comments={commentsData} /> */}
        </div>
      </PopoverTrigger>
      {commentsData?.length > 0 && (
        <PopoverContent
          side="left"
          sideOffset={40}
          className="bg-secondary-800 flex max-h-80 flex-col gap-4 overflow-y-auto border-2 p-2.5 text-white"
        >
          {commentsData.map((comment: any) => (
            <div key={comment.id}>
              <p>{comment.from.name}</p>
              <p className="text-sm text-gray-300">{comment.message}</p>
            </div>
          ))}
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Engagement;
