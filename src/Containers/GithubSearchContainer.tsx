import {useCallback, useState} from "react";
import debounce from "lodash.debounce";

import {GithubSearchComponent} from "../Components/GithubSearchComponent";
import {GithubCardComponent} from "../Components/GithubCardComponent";
import {getGithubRepositories, getGithubUsers} from "../Services/GithubService";
import {SEARCH_TYPES} from "../Utils/constants";

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

    const onDebounce = useCallback(
        debounce(
            async (e) => {
                if (e.target.value.length <= 3) {
                    return;
                }

                if (e.target.value.length === 0) {
                    setRepositories(initialRepositories);

                    return;
                }
                setRepositories(initialRepositories);

                setLoading(true);
                setSearchText(e.target.value);
                e.target.value && (await getDate(e.target.value, searchType));
                setLoading(false);
            },
            1000,
            {leading: false, trailing: true}
        ),
        [searchText, searchType]
    );

    const onSearchTypeChange = async (value: string) => {
        setSearchType(value);
        setLoading(true);
        setRepositories(initialRepositories);

        searchText && (await getDate(searchText, value));
        setLoading(false);
    };

    const getDate = async (searchText: string, searchType: string) => {
        if (searchText.length === 0) {
            setRepositories(initialRepositories);

            return;
        }

        switch (searchType) {
            case SEARCH_TYPES.REPOSITORIES:
                {
                    const {data} = await getGithubRepositories(searchText);
                    setRepositories(data as ISetRepositories);
                }
                break;

            case SEARCH_TYPES.USERS:
                {
                    const {data} = await getGithubUsers(searchText);
                    setRepositories(data as ISetRepositories);
                }
                break;

            default:
                break;
        }
    };

    return (
        <>
            <GithubSearchComponent onSearchTextChange={onDebounce} onSearchTypeChange={onSearchTypeChange} />
            <GithubCardComponent repositories={repositories} searchType={searchType} loading={loading} />
        </>
    );
};
