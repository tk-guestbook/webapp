import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../app/store";
import { addEntryResetForm } from '../../features/entry/entrySlice';

import AddEntryForm from "../AddEntryForm";


const Article = styled.article`
  text-align: center;
`;


const AddEntry = () => {
    const dispatch = useDispatch();

    const formSubmitted = useSelector(
        (state: RootState) => state.entry.formSubmitted
    );

    const handleAddAnother = useCallback(
        () => dispatch(addEntryResetForm()),
        [dispatch]
    );

    if (formSubmitted) {
        return (
            <Article className="message is-success">
                <div className="message-body">
                    <h3 className="is-size-4">
                        Thanks for submitting!
                    </h3>

                    <br />

                    <button className="button is-info is-outlined"
                            type="button"
                            onClick={handleAddAnother}>
                        Add Another Entry
                    </button>
                </div>
            </Article>
        )
    }

    return <AddEntryForm />;
};

export default AddEntry;
