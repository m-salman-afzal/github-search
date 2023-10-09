import {Card, Row, Col, Skeleton, Tooltip} from "antd";

import {ISetRepositories} from "../Containers/GithubSearchContainer";
import {SEARCH_TYPES} from "../Utils/constants";
import Image from "next/image";

interface IGithubCardComponent {
    repositories: ISetRepositories;
    searchType: string;
    loading: boolean;
}

const loadingCards = Array(3).fill(0);

export const GithubCardComponent = (props: IGithubCardComponent) => {
    return (
        <>
            {props.loading && (
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} justify={"center"}>
                    {loadingCards.map((_, index) => {
                        return (
                            <Card hoverable loading={props.loading} style={{width: 240, margin: 10}} key={index}>
                                <Skeleton active />
                            </Card>
                        );
                    })}
                </Row>
            )}

            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} justify={"center"}>
                {props.repositories.items.map(
                    (repository: {
                        id: number;
                        owner?: {avatar_url: string};
                        avatar_url?: string;
                        description?: string;
                        html_url: string;
                    }) => {
                        return (
                            <Col className="gutter-row" key={repository.id}>
                                <Card
                                    key={repository.id}
                                    hoverable
                                    style={{width: 240, margin: 10}}
                                    loading={props.loading}
                                    cover={
                                        <Image
                                            alt="example"
                                            src={`${
                                                props.searchType === SEARCH_TYPES.REPOSITORIES
                                                    ? repository?.owner?.avatar_url
                                                    : repository?.avatar_url
                                            }`}
                                            loading="eager"
                                            width={240}
                                            height={240}
                                        />
                                    }>
                                    {props.searchType === SEARCH_TYPES.REPOSITORIES && (
                                        <Tooltip title={repository.description && repository.description}>
                                            <p>
                                                Description:{" "}
                                                {repository.description
                                                    ? `${repository.description.slice(0, 30)}...`
                                                    : " NA"}
                                            </p>
                                            {!repository.description && <br />}
                                        </Tooltip>
                                    )}

                                    <a href={`${repository.html_url}`} target="_blank">
                                        Go to {props.searchType === SEARCH_TYPES.USERS ? "Profile" : "Repository"}
                                    </a>
                                </Card>
                            </Col>
                        );
                    }
                )}
            </Row>
        </>
    );
};
