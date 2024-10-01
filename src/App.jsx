import Display from "./components/Display";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { PlayerContext } from './context/PlayerContext';
import { useContext, useEffect } from 'react';

function App() {
    const { audioRef, track, setTime } = useContext(PlayerContext);

    // Ensure audio time is updated correctly
    useEffect(() => {
        const updateTime = () => {
            setTime({
                currentTime: {
                    seconds: Math.floor(audioRef.current.currentTime % 60),
                    minutes: Math.floor(audioRef.current.currentTime / 60)
                },
                totalTime: {
                    seconds: Math.floor(audioRef.current.duration % 60),
                    minutes: Math.floor(audioRef.current.duration / 60)
                }
            });
        };

        // Attach event listener to update time during playback
        if (audioRef.current) {
            audioRef.current.addEventListener("timeupdate", updateTime);
            audioRef.current.addEventListener("loadedmetadata", updateTime);
        }

        // Clean up the event listeners
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("timeupdate", updateTime);
                audioRef.current.removeEventListener("loadedmetadata", updateTime);
            }
        };
    }, [audioRef, setTime]);

    return (
        <div className="h-screen bg-fuchsia-700">
            <div className="h-[90%] flex">
                <Sidebar />
                <Display />
            </div>
            <Player />
            <audio ref={audioRef} src={track.file} preload="auto"></audio>
        </div>
    );
}

export default App;
