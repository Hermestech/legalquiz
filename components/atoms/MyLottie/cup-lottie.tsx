import * as React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export const CupLottie = () => { 
    return (
        <div className="container">
            <Player
                src={'https://assets9.lottiefiles.com/packages/lf20_asket2d3.json'}
                className="player"
                autoplay
                loop
                style={{ height: '200px', width: '250px' }}
            />
        </div>
    )
}