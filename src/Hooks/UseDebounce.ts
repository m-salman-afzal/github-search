import debounce from "lodash.debounce";
import {useCallback} from "react";

export const useDebounce = (
    delay: number,
    customCallBack: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>,
    dependencies: unknown[]
) => {
    return useCallback(debounce(customCallBack, delay, {leading: false, trailing: true}), dependencies);
};
