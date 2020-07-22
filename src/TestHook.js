import React, {useEffect, useState} from "react";

export function TestHook() {

    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    useEffect(() => {
        document.title = `${count} times.`;
    }, [count])
    useEffect(() => {
        document.title = `Counter 2: ${count2} times.`;
    }, [count2])
    return (
        <div>
            <h3>{count}</h3>
            <h3>{count2}</h3>
            <button onClick={() => setCount(count + 1)} name={"hook counter"} id={1}/>
            <button onClick={() => setCount2(count2 + 1)} name={"hook counter2"} id={2}/>
        </div>
    )
}