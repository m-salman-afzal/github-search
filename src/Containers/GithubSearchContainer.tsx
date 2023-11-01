import React, {useEffect, useRef, useState} from "react";

import {GithubSearchComponent} from "../Components/GithubSearchComponent";
import {GithubCardComponent} from "../Components/GithubCardComponent";
import {getGithubRepositories, getGithubUsers} from "../Services/GithubService";
import {SEARCH_TYPES} from "../Utils/constants";
import {useDebounce} from "@/Hooks/UseDebounce";
import {useInfiniteScroll} from "@/Hooks/UseInfiniteScroll";

export const initialRepositories: {
    id: number;
    owner?: {avatar_url: string};
    avatar_url?: string;
    description?: string;
    html_url: string;
}[] = [];

export const GithubSearchContainer = () => {
    const [searchType, setSearchType] = useState(SEARCH_TYPES.USERS);
    const [searchText, setSearchText] = useState("");
    const [repositories, setRepositories] = useState(initialRepositories);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const bottomBoundryRef = useRef(null);

    const getData = async (searchText: string, searchType: string, currentPage: number) => {
        if (searchText.length === 0) {
            setRepositories(initialRepositories);
            setPage(1);

            return;
        }

        switch (searchType) {
            case SEARCH_TYPES.REPOSITORIES:
                {
                    setLoading(true);

                    const {data} = await getGithubRepositories({query: searchText, currentPage: currentPage});
                    setRepositories(repositories.concat(data.items as any));

                    setLoading(false);
                }
                break;

            case SEARCH_TYPES.USERS:
                {
                    setLoading(true);

                    const {data} = await getGithubUsers({query: searchText, currentPage: page});
                    setRepositories(repositories.concat(data.items as any));

                    setLoading(false);
                }
                break;

            default:
                break;
        }
    };

    const handleInputChange = async (searchText: string) => {
        if (searchText.length <= 3 || searchText.length === 0) {
            setRepositories(initialRepositories);
            setPage(1);

            return;
        }

        setRepositories(initialRepositories);
        setPage(1);

        setSearchText(searchText);
    };

    const onSearchTypeChange = async (value: string) => {
        setSearchType(value);
        handleInputChange(searchText);
    };

    const debounceCallback = async (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e.target.value);
    };

    const onDebounce = useDebounce(1000, debounceCallback, [searchText, searchType]);

    const onIntersection = async (entries: any[]) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !loading && repositories.length > 0) {
            setPage((prev: number) => {
                return prev + 1;
            });
        }
    };

    useEffect(() => {
        searchText && searchType && getData(searchText, searchType, page);
    }, [page, searchText, searchType]);

    useInfiniteScroll(onIntersection, bottomBoundryRef, [page]);

    return (
        <>
            <GithubSearchComponent onSearchTextChange={onDebounce} onSearchTypeChange={onSearchTypeChange} />
            <GithubCardComponent
                repositories={repositories}
                searchType={searchType}
                loading={loading}
                bottomBoundryRef={bottomBoundryRef}
            />
        </>
    );
};
