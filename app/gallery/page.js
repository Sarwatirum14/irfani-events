'use client';
import { useState } from 'react';

const eventData = [
    { title: 'Wedding', images: ['/wedding1.jpg', '/wedding2.jpg', '/wedding3.jpg'] },
    { title: 'Birthday', images: ['/birthday1.jpg', '/birthday2.jpg', '/birthday3.jpg'] },
    { title: 'Concert', images: ['/concert1.jpg', '/concert2.jpg', '/concert3.jpg'] },
    { title: 'Sports Event', images: ['/sports1.jpg', '/sports2.jpg', '/sports3.jpg'] },
    { title: 'Festivals', images: ['/festival1.jpg', '/festival2.jpg', '/festival3.jpg'] },
    { title: 'Private Party', images: ['/party1.jpg', '/party2.jpg', '/party3.jpg'] },
    { title: 'Gala Dinner', images: ['/gala1.jpg', '/gala2.webp', '/gala3.jpg'] },
    { title: 'Conferences', images: ['/conference1.jpg', '/conference2.jpg', '/conference3.jpg'] },
];

export default function Gallery() {
    const [currentIndexes, setCurrentIndexes] = useState(Array(eventData.length).fill(0));

    const handlePrev = (index) => {
        setCurrentIndexes((prev) => {
            const updated = [...prev];
            updated[index] = (updated[index] - 1 + eventData[index].images.length) % eventData[index].images.length;
            return updated;
        });
    };

    const handleNext = (index) => {
        setCurrentIndexes((prev) => {
            const updated = [...prev];
            updated[index] = (updated[index] + 1) % eventData[index].images.length;
            return updated;
        });
    };

    return ( <
        div className = "bg-black text-white min-h-screen p-10" >
        <
        header className = "relative flex items-center justify-center text-center h-[400px] bg-[url('/gallery.jpg')] bg-cover bg-center rounded-2xl" >
        <
        div className = "absolute inset-0 bg-black/50 rounded-2xl" > < /div> <
        h1 className = "relative z-10 text-6xl font-black text-pink-500 uppercase tracking-tighter" >
        Gallery <
        /h1> <
        /header>

        <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-10 mt-10" > {
            eventData.map((event, i) => ( <
                div key = { event.title }
                className = "bg-gray-900 p-5 rounded-xl border border-gray-800 shadow-xl" >
                <
                h2 className = "text-2xl font-semibold mb-4 text-center text-pink-400" > { event.title } <
                /h2> <
                div className = "relative h-72 overflow-hidden rounded-lg" >
                <
                img src = { event.images[currentIndexes[i]] }
                alt = { event.title }
                className = "w-full h-full object-cover transition-opacity duration-500" /
                >
                <
                button onClick = {
                    () => handlePrev(i) }
                className = "absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all" >
                ‹
                <
                /button> <
                button onClick = {
                    () => handleNext(i) }
                className = "absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all" >
                ›
                <
                /button> <
                /div> <
                /div>
            ))
        } <
        /div> <
        /div>
    );
}