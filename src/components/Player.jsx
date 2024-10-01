import { assets } from "../assets/assets.js";
import { useContext, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext.jsx';

function Player() {
        const { track, seekBar, seekbg, playStatus, play, pause, time, audioRef, previous, next, seekSong } = useContext(PlayerContext);

    // Update the seekBar position when time changes
    useEffect(() => {
        if (time.totalTime.seconds > 0) {
            const percentage = (time.currentTime.minutes * 60 + time.currentTime.seconds) / 
                              (time.totalTime.minutes * 60 + time.totalTime.seconds) * 100;

            if (seekBar.current) {
                seekBar.current.style.width = `${percentage}%`;
            }
        }
    }, [time, seekBar]);

    // Format time as MM:SS
    const formatTime = (minutes, seconds) => {
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="hidden lg:flex items-center gap-4">
                <img className="w-12" src={track.image} alt="" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4">
                    <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="" />
                    <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
                    {!playStatus ? (
                        <img
                            onClick={play}
                            className="w-4 cursor-pointer"
                            src={assets.play_icon}
                            alt="Play"
                        />
                    ) : (
                        <img
                            onClick={pause}
                            className="w-4 cursor-pointer"
                            src={assets.pause_icon}
                            alt="Pause"
                        />
                    )}
                    <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
                    <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
                </div>
                <div className="flex gap-5 items-center">
                    <p>{formatTime(time.currentTime.minutes, time.currentTime.seconds)}</p>
                    <div ref={seekbg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
                        <hr ref={seekBar} className="h-1 border-none w-10 bg-fuchsia-500 rounded-full" />
                    </div>
                    <p>{formatTime(time.totalTime.minutes, time.totalTime.seconds)}</p>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 opacity-75">
                <img className="w-4" src={assets.plays_icon} alt="" />
                <img className="w-4" src={assets.mic_icon} alt="" />
                <img className="w-4" src={assets.queue_icon} alt="" />
                <img className="w-4" src={assets.speaker_icon} alt="" />
                <img className="w-4" src={assets.volume_icon} alt="" />
                <div className="w-20 bg-slate-50 h-1 rounded"></div>
                <img className="w-4" src={assets.mini_player_icon} alt="" />
                <img className="w-4" src={assets.zoom_icon} alt="" />
            </div>
        </div>
    );
}

export default Player;
