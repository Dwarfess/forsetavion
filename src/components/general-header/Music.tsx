import React, { useEffect, useRef } from 'react';

const Music = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const handleUserInteraction = () => {
            if (audioRef.current) {
                audioRef.current.play().catch((error) => {
                    console.log('Автоматичне відтворення заблоковане: ', error);
                });

                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('keydown', handleUserInteraction);
            }
        };

        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('keydown', handleUserInteraction, { once: true });

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        };
    }, []);

    return (
        <audio ref={audioRef} loop hidden>
            {/*<source src="/sounds/track.mp3" type="audio/mpeg" />*/}
        </audio>
    );
};

export { Music };
