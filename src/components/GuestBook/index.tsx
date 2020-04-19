import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";

import EntryList from "../EntryList";
import AddEntry from "../AddEntry";

import { retrieveEntriesAsync } from "../../features/entry/entrySlice";

const Container = styled.div`
  margin-top: 2rem;
  padding: 0 2rem;
`;

const GuestBook = () => {
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(retrieveEntriesAsync());
        }
    );

    return (
        <Container>
            <AddEntry />
            <hr />
            <EntryList />
        </Container>
    );
};

export default GuestBook;
