import debounce from "lodash.debounce";
import {useCallback} from "react";

export const useDebounce = (delay: number, customCallBack: any, dependencies: unknown[]) => {
    return useCallback(debounce(customCallBack, delay, {leading: false, trailing: true}), dependencies);
};
