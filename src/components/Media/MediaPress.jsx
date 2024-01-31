import React from 'react';
import MediaItem from './MediaItem';
import group45 from '../../img/group45.svg';

const MediaPress = () => {
  return (
    <>
        <div className="media-header">
            <h3>Press relizlər</h3>
            <div className="media-header-more">
                <img src={group45} alt="group45" />
                Daha çox
            </div>  
        </div>
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />   
    </>
  )
}

export default MediaPress