import * as React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export const MyLottie = () => {
    return (
        <div className="container">
            <Player
                src={'https://assets1.lottiefiles.com/private_files/lf30_rm9re5rq.json'}
                className="player"
                autoplay
                loop
            />
        </div>
    )
}