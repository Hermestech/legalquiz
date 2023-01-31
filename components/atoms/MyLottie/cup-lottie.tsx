import * as React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import useAppContext from '../../../contexts/AppContext'

export const CupLottie = () => { 
    const { score } = useAppContext()
    const winAnimation = 'https://assets9.lottiefiles.com/packages/lf20_asket2d3.json'
    const loseAnimation = "https://assets1.lottiefiles.com/packages/lf20_nwyegy0h.json"
    return (
        <div className="container">
            <Player
                src={score > 0 ? winAnimation : loseAnimation}
                className="player"
                autoplay
                loop
                style={{ height: '200px', width: '250px' }}
            />
        </div>
    )
}