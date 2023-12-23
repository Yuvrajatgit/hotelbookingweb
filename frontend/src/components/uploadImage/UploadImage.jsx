import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import './UploadImage.css';
import { Group, Button } from '@mantine/core';

const UploadImage = ({propertyDetails, setPropertyDetails, nextStep, prevStep}) => {

  const [imageURL, setImageURL] = useState(propertyDetails.image);  
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(()=>{
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
            cloudName: "dhwh0c2l2",
            uploadPreset: "irgim5tx",
            maxFiles: 1
        },
        (err, result)=>{
            if(result.event === "success") {
                setImageURL(result.info.secure_url)
            }
        }
    )
  });
  const handleNext = ()=>{
    setPropertyDetails((prev)=>({
        ...prev, image: imageURL
    }));
    nextStep();
  }
  return (
    <div className='flexColCenter uploadWrapper'>
      {
        !imageURL ? (
            <div className='flexColCenter uploadZone' onClick={()=>widgetRef.current?.open()}>
              <AiOutlineCloudUpload size={50} color="gray"/>
              <span>Upload Image</span>
            </div>
        ) : (
            <div className='uploadedImage' onClick={()=> widgetRef.current?.open()}>
                <img src={imageURL} alt=""/>
            </div>
        )
      }
        <Group justify="center" mt={"xl"} >
            <Button variant='default' onClick={prevStep}>Back</Button>
            <Button onClick={handleNext} disabled={!imageURL}>Next</Button>
        </Group>
    </div>
  )
}

export default UploadImage
