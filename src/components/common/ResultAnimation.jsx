import React, { useState, useEffect } from 'react'
import * as Ant from 'antd'

const ResultAnimation = ({state='active',size=100}) => {

    
    const [stepsCount, setStepsCount] = useState(5);
    const [stepsGap, setStepsGap] = useState(0);
    const [strokeWidth, setStrokeWidth] = useState(3);
    // const [size, setSize] = useState(100);

    const timeout = (delay)  =>{
        return new Promise(res => setTimeout(res, delay));
    }

const check =async () =>{
    if (state == 'success') {
        for (var i = 50; i >= 0; i--) {
            setStepsGap(i)
            await timeout(7)
        }
    }
    if (state == 'exception') {
        // for (var j = 50; j >= 0; j--) {
        //     setStepsGap(j)
        //     await timeout(7)
        // }
    }
}


    useEffect( () => {
        check()
    }, [state])


 


    return <>

        {state == 'active' && <Ant.Progress type="circle"
            format={() => <Ant.Spin />}
            status={state}
            strokeWidth={strokeWidth}
            size={size}
            steps={{
                count: stepsCount,
                gap: stepsGap,
            }} />}

        {state != 'active' && <Ant.Progress type="circle"
            status={state}
            strokeWidth={strokeWidth}
            size={size}
            steps={{
                count: stepsCount,
                gap: stepsGap,
            }} />}

    </>

}





export default ResultAnimation