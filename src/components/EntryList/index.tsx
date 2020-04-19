import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import TimeAgo from 'react-timeago';

import { Entry } from "../../features/entry/entrySlice";
import { RootState } from "../../app/store";

const Container = styled.div`
  margin: 2rem 0;
  padding: 0 2rem;
  
  time {
    margin-left: 0.5rem;
    font-size: smaller;
  }
`;

type EntryItemProps = {
    entry: Entry;
};

const EntryItem = ({entry: {name, created_at, message}}: EntryItemProps) => (
    <article className="media box">
        <figure className="media-left">
            <p className="image is-64x64">
                <img src={`https://avatars.dicebear.com/v2/jdenticon/${name}.svg?width=128&height=128`} />
            </p>
        </figure>
        <div className="media-content">
            <div className="content">
                <p>
                    <strong>{name}</strong>
                    <TimeAgo date={created_at} />
                    <br/>
                    {message}
                </p>
            </div>
        </div>
    </article>
);

const EntryList = () => {
    const entries = useSelector(
        (state: RootState) => state.entry.entries
    );

    return (
        <Container>
            {entries.map(entry => <EntryItem key={entry.created_at} entry={entry}/>)}
        </Container>
    );
};

export default EntryList;
