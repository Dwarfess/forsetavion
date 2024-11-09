import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {Tab} from "semantic-ui-react";
import {ModalX} from "../../shared";
import mixins from "../../../mixins";

import {SignInForm} from "./SignInForm";
import {SignUpForm} from "./SignUpForm";

const RegisterPage = () => {
    const panes = [
        { menuItem: 'Sign in', render: () => <SignInForm /> },
        { menuItem: 'Sign up', render: () => <SignUpForm /> },
    ];

    return <ModalX>
        <RegistrationPageContainer>
            <Tab panes={panes} defaultActiveIndex={0}/>
        </RegistrationPageContainer>
    </ModalX>
}

const RegistrationPageContainer = styled.div`
    margin-top: 30px;

    .menu {
        border: none !important;
        margin-bottom: 50px !important;

        .item {
            ${mixins.firstTextColor};

            width: 50%;
            justify-content: center;
            font-size: 60px;
            background-color: rgba(0, 0, 0, 0.2) !important;

            border: 1px solid rgba(0, 0, 0, 0.2) !important;
            border-radius: 5px;
            margin: 0 !important;
            padding: 20px !important;

            &.active {
                background-color: transparent !important;
            }
        }
    }

    h2 {
        ${mixins.standardH2};

        font-size: 100px;
        text-align: center;
    }

    .create-new-account {
        ${mixins.firstTextColor};

        font-size: 50px;
        text-align: center;
    }

    .field {
        ${mixins.flexCenter};

        margin: 30px 0;
        flex-direction: column;

        label, input {
            ${mixins.secondTextColor};

            margin: 10px 0;
            font-size: 50px;
        }

        input {
            width: 100%;
            font-size: 40px;
            border-radius: 5px;
            background-color: rgba(0, 0, 0, .2);
        }

        p {
            font-size: 25px;
            color: #b0201e;
        }
    }
`;

export { RegisterPage };
