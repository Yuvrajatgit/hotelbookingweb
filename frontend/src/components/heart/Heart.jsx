import React, {useState, useContext, useEffect} from 'react';
import {AiFillHeart} from 'react-icons/ai';
import UserDetailContext from '../../context/UserDetailContext';
import useAuthCheck from '../../hooks/useAuthCheck';
import {addToFav} from '../../utils/api';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { updateFavourites, checkFavourites } from '../../utils/common';

const Heart = ({id}) => {
  const [heaerColor, setHeartColor] = useState("white"); 
  const {user} = useAuth0(); 
  const {userDetails : {token, favourites}, setUserDetails} = useContext(UserDetailContext);
  const {validateLogin} = useAuthCheck();

  useEffect(()=>{
    setHeartColor(()=>checkFavourites(id, favourites));
  },[favourites]);

  const {mutate} = useMutation({
    mutationFn: ()=> addToFav(id, user?.email, token),
    onSuccess: ()=>{
        setUserDetails((prev)=>({
          ...prev,
          favourites: updateFavourites(id, prev.favourites)
        }
       ))   
      }
  });

  const handleLike = ()=>{
   if(validateLogin()){
    mutate()
    setHeartColor((prev)=> prev === "#fa3e5f" ? "white" : "#fa3e5f")
   }
  }

  return (
    <AiFillHeart size={24} color={heaerColor}
    onClick={(e)=>{
        e.stopPropagation()
        handleLike()
    }}/>
  )
}

export default Heart;
