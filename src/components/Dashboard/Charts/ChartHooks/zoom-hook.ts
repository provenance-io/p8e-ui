import { useState } from "react";

const defaultXAxis = ['dataMin', 'dataMax'];
const defaultYAxis = [0, 'auto'];

type GetYValue<ElementT> = (element: ElementT) => number;

const getYValueFromKey: <ElementT>(ref: string) => GetYValue<ElementT> = (ref) => (element) => element[ref];

type GetXValue = (event: any, left?: boolean) => number;

const getXValueFromKey: (key: string) => GetXValue = (key) => (event) => event[key];

export const useZoom = <ElementT = Record<string, number>>(data: ElementT[], getYValue: string | GetYValue<ElementT>, getXValue: string | GetXValue) => {
    const getYValueFn = typeof getYValue === 'string' ? getYValueFromKey(getYValue) : getYValue;
    const getXValueFn = typeof getXValue === 'string' ? getXValueFromKey(getXValue) : getXValue;

    const [xAxisDomain, setXAxisDomain] = useState<(string | number)[]>(defaultXAxis);
    const [yAxisDomain, setYAxisDomain] = useState<(string | number)[]>(defaultYAxis);

    const [refAreaLeft, setRefAreaLeft] = useState<'' | number>('');
    const [refAreaRight, setRefAreaRight] = useState<'' | number>('');
    const clearRefArea = () => {
        setRefAreaLeft('');
        setRefAreaRight('');
    }

    const getYAxisDomain = (from, to, offset) => {
        const refData = data.slice(from-1, to);
        let [ bottom, top ] = [ getYValueFn(refData[0]), getYValueFn(refData[0]) ];
        refData.forEach( d => {
            if ( getYValueFn(d) > top ) top = getYValueFn(d);
            if ( getYValueFn(d) < bottom ) bottom = getYValueFn(d);
        });
        
        return [ (bottom|0) - offset, (top|0) + offset ]
    };

    const zoom = () => {
        let [left, right] = [refAreaLeft, refAreaRight];
        if (left === right || !right) {
            clearRefArea();
            return;
        }

        if (left > right) {
            [left, right] = [right, left];
        }

        [left, right] = [Math.floor(+left), Math.ceil(+right)]

        setXAxisDomain([left, right]);
        setYAxisDomain(getYAxisDomain(left, right, 0));
        clearRefArea();
    }
    
    const resetZoom = () => { setXAxisDomain(defaultXAxis); setYAxisDomain(defaultYAxis); }

    const onMouseDown = (e) => e && setRefAreaLeft(getXValueFn(e));
    const onMouseMove = (e) => e && refAreaLeft && setRefAreaRight(getXValueFn(e));
    const onMouseUp = () => zoom();

    return {
        chartProps: {
            onMouseDown,
            onMouseMove,
            onMouseUp,
        },
        xAxisProps: {
            domain: xAxisDomain,
            type: 'number',
            allowDataOverflow: true,
            dataKey: 'index',
        },
        yAxisProps: {
            domain: yAxisDomain,
            type: 'number',
            allowDataOverflow: true,
        },
        refAreaProps: !!refAreaLeft && !!refAreaRight ? {
            x1: refAreaLeft,
            x2: refAreaRight,
            strokeOpacity: 0.3,
        } : {},
        wrapperProps: {
            isZoomed: xAxisDomain !== defaultXAxis,
            resetZoom,
        }
    }
}