import React from 'react'

const VideoContainer = (props) => {
    return (
        <video
            ref={props.videoRef}
            width="250"
            src={props.videos[props.videoIndex]}
        >
            Sorry, your browser doesn't support embedded videos.
        </video>
    )
}

export default VideoContainer