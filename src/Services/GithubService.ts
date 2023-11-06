import {GITHUB_SEARCH_REPOSITORIES, GITHUB_SEARCH_USERS} from "../Utils/urls";
import {GITHUB_PERSONAL_ACCESS_TOKEN} from "../Utils/constants";

export const getGithubRepositories = async (params: {query: string; perPage?: number; currentPage?: number}) => {
    return (
        await fetch(
            `https://api.github.com/${GITHUB_SEARCH_REPOSITORIES}?q=${params.query}&per_page=${
                params.perPage ?? 10
            }&page=${params.currentPage ?? 1}`,
            {
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`
                }
            }
        )
    ).json();
};

export const getGithubUsers = async (params: {query: string; perPage?: number; currentPage?: number}) => {
    return (
        await fetch(
            `https://api.github.com/${GITHUB_SEARCH_USERS}?q=${params.query}&per_page=${params.perPage ?? 10}&page=${
                params.currentPage ?? 1
            }`,
            {
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`
                }
            }
        )
    ).json();
};
