import React, {useState} from "react";

import {GithubSearchComponent} from "../Components/GithubSearchComponent";
import {GithubCardComponent} from "../Components/GithubCardComponent";
import {getGithubRepositories, getGithubUsers} from "../Services/GithubService";
import {SEARCH_TYPES} from "../Utils/constants";
import {useDebounce} from "@/Hooks/UseDebounce";

export interface ISetRepositories {
    incomplete_results: boolean;
    items: never[];
    total_count: number;
}

const initialRepositories: ISetRepositories = {
    incomplete_results: true,
    items: [],
    total_count: 0
};

export const GithubSearchContainer = () => {
    const [searchType, setSearchType] = useState(SEARCH_TYPES.USERS);
    const [searchText, setSearchText] = useState("");
    const [repositories, setRepositories] = useState(initialRepositories);
    const [loading, setLoading] = useState(false);

    const getData = async (searchText: string, searchType: string) => {
        if (searchText.length === 0) {
            setRepositories(initialRepositories);

            return;
        }

        switch (searchType) {
            case SEARCH_TYPES.REPOSITORIES:
                {
                    const {data} = await getGithubRepositories({query: searchText});
                    setRepositories(data as ISetRepositories);
                }
                break;

            case SEARCH_TYPES.USERS:
                {
                    const {data} = await getGithubUsers({query: searchText});
                    setRepositories(data as ISetRepositories);
                }
                break;

            default:
                break;
        }
    };

    const handleInputChange = async (searchText: string, searchType: string) => {
        if (searchText.length <= 3 || searchText.length === 0) {
            setRepositories(initialRepositories);
            return;
        }

        setRepositories(initialRepositories);

        setLoading(true);
        setSearchText(searchText);
        searchText && (await getData(searchText, searchType));
        setLoading(false);
    };

    const onSearchTypeChange = async (value: string) => {
        setSearchType(value);
        handleInputChange(searchText, value);
    };

    const debounceCallback = async (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e.target.value, searchType);
    };
    const onDebounce = useDebounce(1000, debounceCallback, [searchText, searchType]);

    return (
        <>
            <GithubSearchComponent onSearchTextChange={onDebounce} onSearchTypeChange={onSearchTypeChange} />
            <GithubCardComponent repositories={repositories} searchType={searchType} loading={loading} />
        </>
    );
};
