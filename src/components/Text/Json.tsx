import React from 'react';
import { FunctionComponent } from "react";
import { Pre } from "./Pre";

type JsonProps = {
    object: any;
}

export const Json: FunctionComponent<JsonProps> = ({ object }) => <Pre style={{fontSize: '1.5em'}} margin="0" padding="0">
    {JSON.stringify(object, undefined, 2)}
</Pre>;