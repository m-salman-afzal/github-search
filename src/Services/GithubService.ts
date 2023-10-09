import {Octokit} from "octokit";

import {GITHUB_SEARCH_REPOSITORIES, GITHUB_SEARCH_USERS} from "../Utils/urls";
import {GITHUB_PERSONAL_ACCESS_TOKEN, HTTP_METHODS} from "../Utils/constants";

const octokit = new Octokit({
    auth: GITHUB_PERSONAL_ACCESS_TOKEN
});

export const getGithubRepositories = async (query: string) => {
    const repositories = await octokit.request(`${HTTP_METHODS.GET} ${GITHUB_SEARCH_REPOSITORIES}`, {
        headers: {
            "X-GitHub-Api-Version": "2022-11-28"
        },
        q: query
    });

    return repositories;
};

export const getGithubUsers = async (query: string) => {
    const users = await octokit.request(`${HTTP_METHODS.GET} ${GITHUB_SEARCH_USERS}`, {
        headers: {
            "X-GitHub-Api-Version": "2022-11-28"
        },
        q: query
    });

    return users;
};
