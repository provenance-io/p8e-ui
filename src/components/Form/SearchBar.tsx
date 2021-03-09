import React, { useState, useCallback, useEffect, FunctionComponent } from 'react';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import { NoLabelInput } from './SlimInput';
import { Sprite } from 'components/Sprite';
import { Color } from 'Constant';

const SearchBarContainer = styled.div`
  display: block;
  position: relative;
  width: 400px;
  max-width: 100%;
`;

type SearchBarProps = {
  searchTerm?: string;
  searchChanged: (searchTerm: string) => any;
  debounceTime?: number;
}

export const SearchBar: FunctionComponent<SearchBarProps> = ({ searchTerm = '', searchChanged, debounceTime = 1000, ...rest }) => {
  const [value, setValue] = useState('');
  const debouncedSearchChanged = useCallback(debounce(searchChanged, debounceTime), []);
  const onChange = e => {
    debouncedSearchChanged(e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  return (
    <SearchBarContainer {...rest}>
      <Sprite
        size="30px"
        icon="SEARCH"
        color={Color.BLACK}
        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
        alt="Search"
      />
      <NoLabelInput
        id="search"
        placeholder="Search"
        value={value}
        onChange={onChange}
        style={{ margin: 0, paddingRight: '50px' }}
      />
    </SearchBarContainer>
  );
};