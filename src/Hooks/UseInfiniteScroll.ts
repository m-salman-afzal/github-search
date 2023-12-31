import {useEffect} from "react";

export const useInfiniteScroll = (
    onIntersectionCallback: (entries: unknown[]) => void,
    bottomBoundryRef: React.MutableRefObject<null>
) => {
    useEffect(() => {
        const observer = new IntersectionObserver(onIntersectionCallback);

        if (observer && bottomBoundryRef.current) {
            observer.observe(bottomBoundryRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    });
};
