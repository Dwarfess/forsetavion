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
                const artifactValue = stat.artifactValue || 0;
                const passiveSkillEffectValue = stat.passiveSkillEffectValue || 0;
                const buffEffectValue = stat.buffEffectValue || 0;
                const debuffEffectValue = stat.debuffEffectValue || 0;

                const additionalValue = artifactValue + passiveSkillEffectValue + buffEffectValue - debuffEffectValue;
                const additionalValueString = additionalValue > 0 ? `+${additionalValue}` : additionalValue;

                return <p className="item-stat" key={index}>{stat.title}:
                    <span className="item-stat-value"> {stat.value} </span>

                    { additionalValue !== 0 &&
                        <span className="item-stat-value">({additionalValueString})</span>
                    }
                </p>
            })}
        </div>
    </TabInfoDescriptionWrapper>
};

const TabInfoDescriptionWrapper = styled.div`
    font-size: 25px;
    color: #8b0000 !important;

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
            
            .all-values-block {
                //color: rgba(34, 36, 38, 0.4);
                font-family: sans-serif;
                
                //.default-value { color: rgba(34, 36, 38, 0.4) !important }
                //.positive-value { color: green !important }
                //.negative-value { color: red !important }
            }
        }
    }
`;

export {TabInfoCardStats};
