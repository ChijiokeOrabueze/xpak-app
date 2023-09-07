import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    position: relative;
    width: 100%;
    gap: 4px;

    select {
        height: 36px;
        width: 100%;
        border-radius: 4px;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 19px;
        color: #8091a7;
        padding: 0 16px;
        background-color: #ffffff;
        border: 1px solid #dbdfea;
        outline: none;
        cursor: pointer;
    }

    label {
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 165%;
        color: #364a63;
        margin-top: 16px;
        font-family: 'RobotoBold';
    }

    .star {
        position: absolute;
        bottom: 16px;
        left: 10px;
        pointer-events: none;
        color: #e85347;
        transition: 0.5s;
        transform: translateY(-20px);
        font-size: 12px;
    }

    .fa-check-circle,
    .fa-spin,
    .fa-times-circle {
        position: absolute;
        top: 52px;
        right: 35px;
        color: #6576ff;
        font-size: 18px;
    }

    .error-mode {
        border: 1px solid #e85347;
    }
`;

interface SelectProps {
    title?: string;
    name: string;
    placeholder?: string;
    options: string[];
    inner?: boolean;
    required?: boolean;
    errorMode?: boolean;
    disabled?: boolean;
    initialValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: string;
    className?: string;
}

const Select = (props: SelectProps) => {
    const {
        title,
        name,
        placeholder,
        options,
        initialValue,
        inner,
        required,
        errorMode,
        onChange,
        disabled,
        value,
        className,
    } = props;
    return (
        <Container className={`form-group${className ? ` ${className}` : ''}`}>
            <label htmlFor={name} style={{ display: title ? 'initial' : 'none' }}>
                {inner ? '' : title}
                <span style={{ marginLeft: '3px', color: '#e85347' }}>{required && '*'}</span>
            </label>
            <select
                id={name}
                onChange={onChange}
                className={`form-select ${errorMode ? 'error-mode' : ''}`}
                defaultValue={initialValue}
                value={value}
                disabled={disabled}
            >
                {placeholder && (
                    <option value='' disabled selected hidden>
                        {placeholder}
                    </option>
                )}
                {options?.map((value) => (
                    <option key={value} value={value} label={value}>
                        {value}
                    </option>
                ))}
            </select>
            {inner && <p className='star'>{title}</p>}
        </Container>
    );
};

export default Select;
