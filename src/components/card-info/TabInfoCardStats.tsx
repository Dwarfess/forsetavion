import React from 'react'
import styled from "styled-components";
import {Stat} from "../types";
import mixins from '../../mixins';

const TabInfoCardStats = ({
    selectedItem
}: any) => {
    return <TabInfoDescriptionWrapper>
        <div className="item-stats">
            {selectedItem.stats?.map((stat: Stat, index: number) => {
                return <p className="item-stat" key={index}>{stat.title}:
                    <span className="item-stat-value"> {stat.value}</span>
                </p>
            })}
        </div>
    </TabInfoDescriptionWrapper>
};

const TabInfoDescriptionWrapper = styled.div`
    font-size: 25px;
    color: #8b0000; !important;

    .card-description {
        width: 100%;
    }

    .item-stats {
        width: 100%;
        font-size: 20px;
        column-count: 2;

        .item-stat {
            margin: 0;

            .item-stat-value {
                ${mixins.thirdColor}
            }
        }
    }
`;

export {TabInfoCardStats};
