import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import BattleCardImage from "../BattleCardImage";
import {TabInfoCardStats} from "./TabInfoCardStats";

const TabInfoCardItem = ({
    cardItems
}: any) => {
    const [selectedItem, setSelectItem] = useState<any>(null);

    useEffect(() => {
        setSelectItem(null);
    }, [cardItems]);

    const onItemClick = (item: any = null) => {
        setSelectItem(item);
    }

    return <TabWrapper>
        <div className="card-items">
            {cardItems?.map((item: any, index: number) => {
                return <div className="card-item" onClick={() => onItemClick(item)} key={index}>
                    <BattleCardImage battleCard={item}/>
                    {item.count && <span className="count-value">{item.count}</span>}
                </div>
            })}
        </div>
        {selectedItem && (<>
            <p className="card-description">
                {selectedItem.description || 'An ordinary monster'}
            </p>
            <TabInfoCardStats selectedItem={selectedItem}/>
        </>)}
    </TabWrapper>
};

const TabWrapper = styled.div`
    font-size: 20px;
    color: #8b0000; !important;

    .card-items {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;

        .card-item {
            width: 20%;
            position: relative;
            padding: 0;
            margin: 5px;
            
            &:hover {
                cursor: pointer;
            }
        }
        
        .count-value {
            position: absolute;
            right: 5px;
            bottom: 5px;
            padding: 5px;
            color: #0f3e5b !important;
            text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3;
        }
    }
`;

export {TabInfoCardItem};
