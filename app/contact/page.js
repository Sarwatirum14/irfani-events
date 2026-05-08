'use client';
import { useState } from 'react';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
    }

    const contactInfo = [
        { icon: '📍', label: 'Address', value: 'Rehman Baba Road, I-8, Islamabad, Pakistan' },
        { icon: '📞', label: 'Phone', value: '+92-3258907430' },
        { icon: '✉️', label: 'Email', value: 'Info@Irfanievents.com' },
    ];

    return ( <
        > { /* Hero Section */ } <
        header className = "relative flex items-center justify-center text-center h-[60vh] bg-cover bg-center overflow-hidden"
        style = {
            { backgroundImage: "url('/about.jpg')" } } >
        <
        div className = "absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" / >
        <
        div className = "relative z-10" >
        <
        p className = "text-pink-400 tracking-[0.4em] text-xs uppercase mb-4" > Reach Out < /p> <
        h1 className = "text-6xl md:text-8xl font-bold text-white font-serif" >
        Contact Us <
        /h1> <
        p className = "text-gray-300 mt-4 text-lg font-light" > We would love to hear about your event < /p> <
        /div> <
        /header>

        { /* Contact Content */ } <
        section className = "bg-[#0a0a0a] py-20 px-6 md:px-16" >
        <
        div className = "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start" >

        { /* Form Section */ } <
        div >
        <
        p className = "text-pink-500 tracking-widest text-xs uppercase mb-3" > Send a Message < /p> <
        h2 className = "text-4xl font-bold text-white mb-8 font-serif" >
        Request a Callback <
        /h2>

        {
            submitted && ( <
                div className = "mb-6 bg-green-900/30 border border-green-500/30 text-green-400 px-5 py-4 rounded-xl text-sm flex items-center gap-3 animate-pulse" >
                <
                span > ✓ < /span> Thank you! We will get back to you shortly. <
                /div>
            )
        }

        <
        form onSubmit = { handleSubmit }
        className = "space-y-5" >
        <
        div >
        <
        label className = "block text-gray-400 text-xs uppercase tracking-widest mb-2" > Your Name < /label> <
        input name = "name"
        value = { form.name }
        onChange = { handleChange }
        placeholder = "John Doe"
        required className = "w-full bg-[#111] border border-gray-800 focus:border-pink-500 text-white px-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-600" /
        >
        <
        /div> <
        div >
        <
        label className = "block text-gray-400 text-xs uppercase tracking-widest mb-2" > Email Address < /label> <
        input name = "email"
        value = { form.email }
        onChange = { handleChange }
        placeholder = "you@example.com"
        type = "email"
        required className = "w-full bg-[#111] border border-gray-800 focus:border-pink-500 text-white px-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-600" /
        >
        <
        /div> <
        div >
        <
        label className = "block text-gray-400 text-xs uppercase tracking-widest mb-2" > Message < /label> <
        textarea name = "message"
        value = { form.message }
        onChange = { handleChange }
        placeholder = "Tell us about your event..."
        required rows = "5"
        className = "w-full bg-[#111] border border-gray-800 focus:border-pink-500 text-white px-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-600 resize-none" /
        >
        <
        /div> <
        button type = "submit"
        className = "bg-pink-600 hover:bg-pink-500 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-pink-600/30 hover:-translate-y-0.5" >
        Send Message <
        /button> <
        /form> <
        /div>

        { /* Info Section */ } <
        div className = "space-y-8" >
        <
        div className = "space-y-4" > {
            contactInfo.map((item) => ( <
                div key = { item.label }
                className = "bg-[#111] border border-gray-800 rounded-2xl px-5 py-4 flex items-start gap-4 hover:border-pink-500/30 transition-colors" >
                <
                span className = "text-2xl mt-0.5" > { item.icon } < /span> <
                div >
                <
                p className = "text-gray-500 text-xs uppercase tracking-widest mb-1" > { item.label } < /p> <
                p className = "text-white text-sm" > { item.value } < /p> <
                /div> <
                /div>
            ))
        } <
        /div>

        { /* Map Holder */ } <
        div className = "rounded-2xl overflow-hidden border border-gray-800 shadow-xl" >
        <
        iframe src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.354124974868!2d73.072123!3d33.673852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95217983d89d%3A0xc68677f4f6e7f227!2sI-8%2C%20Islamabad!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
        width = "100%"
        height = "280"
        style = {
            { border: 0, filter: 'grayscale(80%) invert(90%) contrast(85%)' } }
        allowFullScreen loading = "lazy"
        referrerPolicy = "no-referrer-when-downgrade" /
        >
        <
        /div> <
        /div> <
        /div> <
        /section> <
        />
    );
}