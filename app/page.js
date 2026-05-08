'use client';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    return ( <
        >
        <
        div className = "font-sans bg-black" > { /* Header */ } <
        header className = "text-white p-4 bg-[url('/back.jpg')] bg-cover h-[700px]" >
        <
        div className = "flex flex-col items-center justify-center h-[calc(100%-64px)] text-center mt-[-40px]" >
        <
        h1 className = "text-5xl font-bold drop-shadow-lg" >
        IRFANI Events Management <
        /h1> <
        /div> <
        /header>

        { /* Welcome Section */ } <
        section className = "flex flex-col md:flex-row justify-between p-10 bg-black text-white" >
        <
        div className = "md:w-1/2 p-5 justify-center mt-20" >
        <
        h2 className = "text-3xl font-semibold mb-4 text-pink-600 text-center" >
        Welcome to IRFANI Events Management <
        /h2> <
        p className = "text-justify text-gray-300" >
        We turn your dreams into reality with expert planning and flawless execution.Every event we manage is a perfect blend of creativity, professionalism, and passion.Let us help you create memories that will last a lifetime. <
        /p> <
        /div> <
        div className = "md:w-1/2 flex justify-center items-center" >
        <
        img src = "/welcome.jpg"
        alt = "Welcome to IRFANI"
        className = "rounded shadow-2xl w-[500px] h-auto object-cover" /
        >
        <
        /div> <
        /section>

        { /* About Section */ } <
        section id = "about"
        className = "flex flex-col md:flex-row-reverse justify-between p-10 bg-black text-white" >
        <
        div className = "md:w-1/2 flex justify-center items-center" >
        <
        img src = "/about.jpg"
        alt = "About IRFANI"
        className = "rounded shadow-2xl w-[500px] h-auto object-cover" /
        >
        <
        /div> <
        div className = "md:w-1/2 p-5 mt-10" >
        <
        h2 className = "text-3xl font-semibold mb-4 text-pink-600 text-center" > About Us < /h2> <
        p className = "text-justify text-gray-300" >
        At IRFANI Event Management, we don & apos; t just plan events— we create unforgettable experiences!
        Whether it & apos; s a dream wedding, an epic birthday bash, or a standout corporate event,
        we & apos; ve got you covered.From top - notch DJs and live bands to mind - blowing entertainers,
        we bring the fun and flair to every occasion. <
        /p> <
        /div> <
        /section>

        { /* Events Section */ } <
        section id = "events"
        className = "p-10 bg-black text-white" >
        <
        h2 className = "text-3xl font-bold text-center mb-8 text-pink-600" > Events We Manage < /h2> <
        div className = "grid grid-cols-2 md:grid-cols-4 gap-4" > {
            ['Wedding', 'Birthday', 'Concert', 'Sports Event', 'Festivals', 'Private Party', 'Gala Dinner', 'Conferences'].map((event) => ( <
                div key = { event }
                className = "bg-pink-200 text-center p-4 rounded shadow text-black hover:bg-pink-300 transition-colors" >
                <
                h3 className = "font-semibold" > { event } < /h3> <
                /div>
            ))
        } <
        /div> <
        /section> <
        /div> <
        />
    );
}