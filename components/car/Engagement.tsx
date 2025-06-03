import { Heart, MessageCircle, Smile, ThumbsUp } from "lucide-react";
import React from "react";

const Engagement = () => {
  const reactions = 6;
  const comments = 2;

  return (
    <div className="text-txt-secondary-600 absolute top-7.5 right-2 flex items-center">
      <ThumbsUp size={16} className="absolute top-0 right-0 -rotate-30" />
      <Heart
        size={12}
        strokeWidth={2.5}
        className="absolute top-0 right-3 -rotate-20"
      />
      <Smile size={10} strokeWidth={3} className="absolute top-2.5 right-3.5" />
      <span className="absolute -top-1 -right-2.5 text-base text-black">
        {reactions}
      </span>
      <MessageCircle size={20} className="absolute top-5 right-0" />
      <span className="absolute top-4.5 -right-2 text-base text-black">
        {comments}
      </span>
    </div>
  );
};

export default Engagement;
