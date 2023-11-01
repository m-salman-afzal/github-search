import {Input, Select} from "antd";

import {SEARCH_TYPES} from "../Utils/constants";

const {Option} = Select;

interface IGithubSearchComponent {
    onSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchTypeChange: (value: string) => void;
}

const selectAfter = (props: IGithubSearchComponent) => {
    return (
        <Select
            id="search-type"
            defaultActiveFirstOption={true}
            defaultValue={SEARCH_TYPES.USERS}
            onChange={props.onSearchTypeChange}
            aria-label="search-type">
            <Option value={SEARCH_TYPES.USERS}>User</Option>
            <Option value={SEARCH_TYPES.REPOSITORIES}>Repo</Option>
        </Select>
    );
};

export const GithubSearchComponent = (props: IGithubSearchComponent) => {
    return (
        <>
            <Input
                placeholder="Start typing to search..."
                addonAfter={selectAfter(props)}
                onChange={props.onSearchTextChange}
                id="search-input"
            />
        </>
    );
};
