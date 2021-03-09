import React from 'react';
import { render, fireEvent } from "@testing-library/react"
import { SimpleUpdateInput } from './SimpleUpdateInput';

describe('Simple Update Input', () => {
    it('displays the passed in value', async () => {
        const placeholder = "enter a value";
        const value = "existing value";
        const rendered = await render(<SimpleUpdateInput placeholder={placeholder} id="test" value={value} onUpdate={() => Promise.resolve()}/>);
    
        const input = await rendered.getByPlaceholderText(placeholder);
        expect(input).toBeTruthy();
        expect(input.getAttribute('value')).toEqual("existing value");
    
    })
    
    it('has a disabled update button when value is unchanged', async () => {
        const value = "existing value";
        const rendered = await render(<SimpleUpdateInput id="test" value={value} onUpdate={() => Promise.resolve()}/>);
        
        expect(rendered.container.querySelector('button')).toBeDisabled();
    })
    
    it('has a non-disabled update button when value is changed', async () => {
        const placeholder = "enter a value";
        const value = "existing value";
        const rendered = await render(<SimpleUpdateInput placeholder={placeholder} id="test" value={value} onUpdate={() => Promise.resolve()}/>);
        
        const input = await rendered.getByPlaceholderText(placeholder);
        fireEvent.change(input, { target: { value: 'new value' }});
        
        expect(rendered.container.querySelector('button')).toBeEnabled();
    })
})