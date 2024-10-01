import { createContext, useRef, useState } from "react";
import { songsData } from '../assets/assets.js';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBar = useRef();
    const seekbg = useRef();

    const [track, setTrack] = useState(songsData[0]); // Start with the first track
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            seconds: 0,
            minutes: 0,
        },
        totalTime: {
            seconds: 0,
            minutes: 0,
        }
    });

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const playWithId = async (id) => {
        await setTrack(songsData[id]); // Set the track using the given id
        await audioRef.current.play(); // Play the audio
        setPlayStatus(true); // Update play status
    };

    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]); // Increment track.id by 1 to get the next song
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const seekSong = (e) => {
        const seekBarWidth = seekbg.current.offsetWidth; // Get the width of the seek background
        const clickPosition = e.clientX - seekbg.current.getBoundingClientRect().left; // Get the x position of the click relative to the seek background
        const percentage = clickPosition / seekBarWidth; // Calculate the percentage of the click position
        const newTime = percentage * audioRef.current.duration; // Calculate the new time in seconds based on the percentage

        audioRef.current.currentTime = newTime; // Set the audio's current time to the new time
        setTime((prevTime) => ({
            ...prevTime,
            currentTime: {
                seconds: Math.floor(newTime % 60),
                minutes: Math.floor(newTime / 60),
            }
        }));
    };

    const contextValue = {
        audioRef,
        seekBar,
        seekbg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause, 
        playWithId,
        previous,
        next,
        seekSong
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
 