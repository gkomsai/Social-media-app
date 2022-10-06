import React from 'react'
import { followersData } from './FollowersData'
import './FollowersCard.css'
const FollowersCard = () => {
  return (
    <div className="FollowersCard">
        <h3>Who is folllowing you</h3>
       {followersData?.map((el)=>(
        <div key={Date.now()} className="follower">
            <div className="followerImage" ><img src={el.img} className="followerImage" alt="" /></div>
            <div className='name'>
                <span>{el.name}</span>
                <span>@{el.username}</span>
            </div>
            <div>
            <button className="button fc-button">Follow</button>
            </div>
           
        </div>
       ))} 
    </div>
  )
}

export default FollowersCard