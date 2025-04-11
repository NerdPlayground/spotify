import Image from "next/image";
import { useEffect, useRef } from "react";
import { anton, robotoCondensed } from "@/app/ui/fonts";

function Details({ message }){
    const name_container=useRef(null);
    const name_marquee=useRef(null);
    const artists_container=useRef(null);
    const artists_marquee=useRef(null);

    useEffect(()=>{
        function startAnimation(animation,parent,child){
            const SPEED=18;
            const parent_width=getComputedStyle(parent).width;
            const child_width=getComputedStyle(child).width;
            let difference=+parent_width.slice(0,-2)-+child_width.slice(0,-2);

            let cover_styles=null;
            if(difference<0){
                cover_styles=document.createElement("style");
                cover_styles.setAttribute("type","text/css");
                cover_styles.innerHTML=`
                @keyframes ${animation}{
                    0%{ transform: translateX(0); }
                    100%{ transform: translateX(calc(${parent_width} - ${child_width})); }
                }`;
                document.head.appendChild(cover_styles);
                const time=Math.ceil((difference*-1)/SPEED);
                child.style.animation=`${animation} ${time}s linear infinite alternate`;
            }
            return cover_styles;
        }

        let name_styles=startAnimation(
            "name_marquee",name_container.current,name_marquee.current
        );
        let artist_styles=startAnimation(
            "artists_marquee",artists_container.current,artists_marquee.current
        );
        return(()=>{
            if(name_styles!==null) document.head.removeChild(name_styles);
            if(artist_styles!==null) document.head.removeChild(artist_styles);
        });
    },[message]);

    return(
        <div>
            <div className={`${anton.className}`} ref={name_container}>
                <div ref={name_marquee}>
                    {message?.display?.name?
                    message.display.name:`Welcome To Lotify`}
                </div>
            </div>
            <div className={`${robotoCondensed.className}`} ref={artists_container}>
                <div ref={artists_marquee}>
                    {message?.display?.artists?
                    message.display.artists:`Fellow Listener`}
                </div>
            </div>
        </div>
    );
}

function Controls({ message }){
    return(
        <div>
            <svg 
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                className={`${message?.displays?"":"disabled-button"}`}
            >
                <path d="M5 15h14l-7-8-7 8Z"></path>
            </svg>
            <svg 
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                className={`${message?.displays?"":"disabled-button"}`}
            >
                <path d="m11.998 17 7-8h-14l7 8Z"></path>
            </svg>
        </div>
    );
}

export default function Display({ message }){
    return(
        <div id="display">
            <Image
                alt="Cover Image" width={300} height={300}
                src={
                    message?.display?.cover? 
                    message.display.cover:"/default.png"
                }
            />
            <div>
                <Details message={message}/>
                <Controls message={message}/>
            </div>
        </div>
    );
}