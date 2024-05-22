'use client';



import { useEffect, useState } from "react";

import { motion, AnimatePresence } from 'framer-motion';

import { Button } from "@/components/ui/button";



export function App() {

  const [message, setMessage] = useState("");

  const [backgroundImage, setBackgroundImage] = useState("/image1.jpg");



  const fetchMessage = async () => {

    try {

      const response = await fetch("https://pyn25b8xo6.execute-api.us-east-1.amazonaws.com/dev/texts");

      if (!response.ok) {

        throw new Error("Network response was not ok");

      }

      const data = await response.json();

      const newMessage = data.body;



      if (newMessage === message) {

        alert("No hay mensajes nuevos");

      } else {

        setMessage(newMessage);

        changeBackgroundImage();

      }

    } catch (error) {

      console.error("Error:", error);

    }

  };



  const getRandomImage = () => {

    const images = [

      "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg",

      "image6.jpg", "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg",

      "image11.jpg", "image12.jpg", "image13.jpg", "image14.jpg", "image15.jpg",

      "image16.jpg", "image17.jpg", "image18.jpg", "image19.jpg", "image20.jpg",

    ];

    return images[Math.floor(Math.random() * images.length)];

  };



  const changeBackgroundImage = () => {

    setBackgroundImage(`/${getRandomImage()}`);

  };



  useEffect(() => {

    fetchMessage();

  }, []);



  return (

    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative">

      <AnimatePresence mode="wait">

        <motion.div

          key={backgroundImage}

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          exit={{ opacity: 0 }}

          transition={{ duration: 1 }}

          className="absolute inset-0 bg-center bg-cover"

          style={{ backgroundImage: `url('${backgroundImage}')` }}

        ></motion.div>

      </AnimatePresence>



      <AnimatePresence mode="wait">

        <motion.h1

          key={message}

          initial={{ y: -100, opacity: 0 }}

          animate={{ y: 0, opacity: 1 }}

          exit={{ y: 100, opacity: 0 }}

          transition={{ duration: 0.5 }}

          className="text-6xl font-bold text-white drop-shadow-lg text-center z-10"

        >

          {message || "Transforma tus sueños en realidad"}

        </motion.h1>

      </AnimatePresence>



      <div className="mt-8 space-x-4 z-10">

        <Button variant="secondary" onClick={fetchMessage}>

          Frase nueva

        </Button>

      </div>

    </div>

  );

}