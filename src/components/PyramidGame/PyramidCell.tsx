import React, { useState } from 'react';
import '../../styles/Game.css'


interface PyramidCellProps {
    value: number | null;
    row: number;
    col: number;
    onChange: (row: number, col: number, value: number) => void;
    disabled: boolean;
    readOnly: boolean;
}

const PyramidCell: React.FC<PyramidCellProps> = ({ value, row, col, onChange, disabled, readOnly }) => {
    const [tempValue, setTempValue] = useState<string>(value !== null ? value.toString() : '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempValue(e.target.value);
    };

    const handleBlur = () => {
        const newValue = parseInt(tempValue);
        if (!isNaN(newValue)) {
            onChange(row, col, newValue);
        }
    };

    return (
        <input
            type="number"
            value={tempValue}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled || readOnly}
            readOnly={readOnly}
        />
    );
};

export default PyramidCell;
