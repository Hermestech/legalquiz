import * as React from 'react'

export const useDeviceSize = () => {
    const [width, setWidth] = React.useState<number>(0)
    const [height, setHeight] = React.useState<number>(0)

    const handleWindowResize = () => { 
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }

    React.useEffect(() => { 
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])
    
    return [ width, height ]
}
 