import React, { useState } from 'react';
function ScheduleRow({ curElem }) {
    const [isShown, setIsShown] = useState(false);
    return (
        <div className="flex md:contents">
            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                <div className="h-full w-6 flex items-center justify-center">
                    <div className="h-full w-1 bg-primary_orange-0 pointer-events-none" />
                </div>
                {isShown ? (<div className="w-6 h-6 absolute top-1/2 -mt-3 border-4 border-primary_orange-0 rounded-full bg-white dark:bg-darkmode_gray-0 shadow text-center animate-ping"
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)} />)
                    : (<div className="w-6 h-6 absolute top-1/2 -mt-3 border-4 border-primary_orange-0 rounded-full bg-white dark:bg-darkmode_gray-0 shadow text-center hover:animate-ping"
                        onMouseEnter={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)} />)}
            </div>
            {isShown ? (<div className="border-4 bg-primary_orange-0 text-white dark:bg-primary_orange-0 dark:text-white border-primary_orange-0 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto w-full"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                <h3 className="font-bold text-xl mb-1">{curElem.duration}</h3>
                <p className=" leading-tight text-lg w-full">
                    {curElem.event}
                </p>
            </div>) :
                (<div className="border-4 bg-white hover:bg-primary_orange-0 hover:text-white text-gray-600 dark:bg-darkmode_gray-0 dark:hover:bg-primary_orange-0 dark:text-white border-primary_orange-0 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto w-full" onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}>
                    <h3 className="font-bold text-xl mb-1">{curElem.duration}</h3>
                    <p className=" leading-tight text-lg w-full">
                        {curElem.event}
                    </p>
                </div>)}
        </div>
    );
}

export default ScheduleRow;