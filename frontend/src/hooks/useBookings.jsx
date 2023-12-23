import { useContext, useEffect, useRef } from 'react'
import UserDetailContext from '../context/UserDetailContext'
import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { getAllBookings } from '../utils/api';

const useBookings = () => {
  const {userDetails, setUserDetails} = useContext(UserDetailContext);
  const queryRef = useRef();
  const {user} = useAuth0();
  
  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: "allBookings",
    queryFn: ()=>getAllBookings(user?.email, userDetails?.token),
    onSuccess: (data)=> setUserDetails((prev)=>({...prev, bookings: data})),
    // onSuccess: (data) => {
    //     setUserDetails((prev) => ({
    //       ...prev,
    //       bookings: Array.isArray(prev.bookings) ? data : [], // Ensure bookings is an array
    //     }));
    //   },
    enabled: user!=undefined,
    staleTime: 30000
  })
  
  queryRef.current = refetch;

  useEffect(()=>{
   queryRef.current && queryRef.current()
  },[userDetails?.token])
  return {data,isLoading, isError, refetch}
}

export default useBookings;