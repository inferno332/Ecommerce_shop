import { useState, useRef, useCallback, useEffect } from 'react';

const RangeSlider = ({ min, max, onChange, defaultValue = [20, 70] }) => {
    const [minVal, setMinVal] = useState(defaultValue[0]);
    const [maxVal, setMaxVal] = useState(defaultValue[1]);

    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);
    // Convert to percentage
    const getPercent = useCallback((value) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);
    return (
        <div className='w-full h-[40px]'>
            <input
                type='range'
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={(e) => {
                    const value = Math.min(+e.target.value, maxVal - 1);
                    setMinVal(value);
                    e.target.value = value.toString();
                }}
                className={`thumb z-[3] ${minVal > max - 100 && 'z-[5]'}`}
            />
            <input
                type='range'
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={(event) => {
                    const value = Math.max(+event.target.value, minVal + 1);
                    setMaxVal(value);
                    event.target.value = value.toString();
                }}
                className='thumb z-[4]'
            />
            <div className='relative w-[150px]'>
                <div className='slider__track' />
                <div ref={range} className='slider__range' />
                <div className='absolute font-semibold top-4'>{minVal}</div>
                <div className='absolute font-semibold top-4 right-[-4px]'>{maxVal}</div>
            </div>
        </div>
    );
};

export default RangeSlider;
