import debounce from "lodash.debounce";
import {
    // useState, useEffect,
    useCallback
} from "react";

export const useDebounce = (delay: number, customCallBack: any, dependencies: unknown[]) => {
    return useCallback(debounce(customCallBack, delay, {leading: false, trailing: true}), dependencies);
};

// export const useDebounce = (value: string, delay: number, customCallBack: any) => {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [value, delay]);

//     return debouncedValue;
// };
