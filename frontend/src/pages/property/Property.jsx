import React, {useState, useContext} from 'react';
import UserDetailContext from '../../context/UserDetailContext';
import {useMutation, useQuery} from 'react-query';
import {useLocation} from 'react-router-dom';
import { getProperty } from '../../utils/api';
import {PuffLoader} from 'react-spinners';
import {FaShower} from 'react-icons/fa';
import {AiTwotoneCar} from 'react-icons/ai';
import {MdMeetingRoom, MdLocationPin} from 'react-icons/md';
import useAuthCheck from '../../hooks/useAuthCheck';
import BookingModal from '../../components/bookingModal/BookingModal';
import './Property.css';
import Heart from '../../components/heart/Heart';
import {removeBooking} from '../../utils/api';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';
import { toast } from 'react-toastify';

const Property = () => {
  const [modalOpen, setModalOpen] = useState(false); 
  const {validateLogin} = useAuthCheck();
  const {user} = useAuth0();
  const {pathname} = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const {data, isLoading, isError} = useQuery(["resd", id], ()=> getProperty(id)); 
  const {userDetails : {token, bookings}, setUserDetails} = useContext(UserDetailContext);
  const {mutate: cancelBooking, isLoading: cancelling} = useMutation({
    mutationFn: ()=> removeBooking(id, user?.email, token),
    onSuccess: ()=>{
      setUserDetails((prev)=>({
        ...prev,
        bookings: prev.bookings.filter((b)=>b?.id !==id)
      }))
      toast.success('You booking has been cancelled', {
        position: 'bottom-right'
    });
    }
  })
  
  if(isLoading){
    return (
        <div className='wrapper'>
            <div className='flexCenter paddings'>
                <PuffLoader/>
            </div>
        </div>
    )
  };

  if(isError){
    return (
        <div className='wrapper'>
            <div className='flexCenter paddings'>
                <span>Error while fetching the property details</span>
            </div>
        </div>
    )
  }

  return (
    <div className='wrapper'>
      <div className='flexColStart paddings innerWidth property-container'>
        <div className='like'>
            <Heart id={id}/>
        </div>

        <img src={data?.image} alt='property image'/>

        <div className='flexCenter property-details'>
            <div className='flexColStart left'>

              <div className='flexStart head'>
                <span className='primaryText'>{data?.title}</span>
                <span className='orangeText' style={{fontSize:'1.5rem'}}>$ {data?.price}</span>
              </div>

              <div className='flexStart facilities'>
                <div className='flexStart facility'>
                    <FaShower size={20} color="#1F3E72"/>
                    <span>{data?.facilities?.bathrooms} Bathrooms</span>
                </div>
                <div className='flexStart facility'>
                <AiTwotoneCar size={20} color="#1F3E72"/>
                    <span>{data?.facilities?.parkings} Parking</span>
                </div>
                <div className='flexStart facility'>
                <MdMeetingRoom size={20} color="#1F3E72"/>
                    <span>{data?.facilities?.bedrooms} Rooms</span>
                </div>
              </div>

              <span className='secondaryText' style={{textAlign: "justify"}}>
              {data?.description}
              </span>

              <div className='flexStart' style={{gap:"1rem"}}>
                <MdLocationPin size={25}/>
                <span className='secondaryText'>
                    {data?.address}{" "} {data?.city}{" "} {data?.country}
                </span>
              </div>

             {bookings?.map((b)=>b.id).includes(id) ? (<>
             <Button
             onClick={()=>cancelBooking()}
             disabled={cancelling}
             variant='outline' w={"100%"} color='red'>
              <span>Cancel Booking</span>
             </Button>
             <span>
              Your visit is booked for date {bookings?.filter((b)=>b?.id === id)[0].date}
             </span>
             </>) : (
              <button className='button' onClick={()=>{
                validateLogin() && setModalOpen(true);
              }}>Book your visit</button>)}
        

              <BookingModal
              opened={modalOpen}
              setOpened={setModalOpen}
              propertyId={id}
              email={user?.email}/>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Property;
