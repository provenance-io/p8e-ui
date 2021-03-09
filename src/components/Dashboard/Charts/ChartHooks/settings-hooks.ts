import { PRIMARY_FONT } from 'Constant/colors';
import { useColor } from "hooks/theme-hooks";

export const useChartSettings = () => {
    const animationDuration = 0;
    const { PRIMARY_FONT: textColor } = useColor({ PRIMARY_FONT });

    return {
        animationDuration,
        animationActive: animationDuration > 0,
        textColor,
    };
}