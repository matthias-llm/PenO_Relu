import React from "react";

export default function YoutubePopUp({ timeStamp }) {
  return (
    <div>
      <iframe
        src={" https://www.youtube.com/embed/b6KXW6WmDPs?start=" + timeStamp}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        width="560"
        height="315"
      />
    </div>
  );
}
