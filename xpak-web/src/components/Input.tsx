import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { P } from '../styles';


const Container = styled.div<{ isModal?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    position: relative;
    width: 100%;
    gap: 4px;

    input {
        height: 36px;
        width: 100%;
        border-radius: 4px;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #8091a7;
        padding: 16px;
        background-color: #ffffff;
        border: 1px solid #dbdfea;
        outline: none;
        position: relative;
    }

    .filename {
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 19px;
        color: #8091a7;
        position: absolute;
        top: 52px;
        pointer-events: none;
        cursor: pointer;
        left: 16px;
    }

    label {
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 165%;
        color: #364a63;
        margin-top: 16px;
        font-family: ${({ isModal }) => (isModal ? 'NunitoBold' : 'RobotoBold')};
    }

    .star {
        position: absolute;
        bottom: 16px;
        left: 10px;
        pointer-events: none;
        color: grey;
        transition: 0.5s;
        transform: translateY(-20px);
        font-size: 12px;
    }

    .disabled {
        background: #f5f6fa;
        border: 1px solid #dbdfea;
    }

    .fa-check-circle,
    .fa-spin,
    .fa-times-circle {
        position: absolute;
        margin-left: 98%;
        top: 52px;
        right: 18px;
        color: #6576ff;
        font-size: 18px;
    }

    input::file-selector-button {
        display: none;
    }

    input[type='file'] {
        padding: 8px 16px;
        color: rgba(0, 0, 0, 0);
    }

    .browse-btn {
        position: absolute;
        top: 42.5px;
        right: 0;
        pointer-events: none;
        cursor: pointer;
    }

    .error {
        font-size: 12px;
        font-weight: 400;
        color: #e85347;
    }

    .error-mode {
        border: 1px solid #e85347;
    }
`;

const TogglePassword = styled(P)`
    position: absolute;
    bottom: 10px;
    right: 10px;
    transition: 0.5s;
    cursor: pointer;
`;

export interface InputProps {
    title?: string;
    type: string;
    name: string;
    placeholder?: string;
    max?: number;
    inner?: boolean;
    required?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    errorMode?: boolean;
    className?: string;
    fileFormat?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    value?: string;
    id?: string;
    checked?: boolean;
    isModal?: boolean;
}

const Input = (props: InputProps) => {
    const {
        title,
        type,
        placeholder,
        max,
        inner,
        required,
        disabled,
        className,
        fileFormat,
        errorMode,
        onChange,
        onFocus,
        value,
        defaultValue,
        name,
        id,
        checked,
        isModal,
    } = props;
    const [passType, setPassType] = useState<string>('password');

    const togglePassword = useCallback(() => {
        passType === 'password' ? setPassType('text') : setPassType('password');
    }, [passType]);

    const decideAcceptedFileType = () => {
        if (type === 'file') {
            return fileFormat;
        }
        return fileFormat && 'image/png, image/jpeg, image/jpg';
    };

    return (
        <Container className='form-group' isModal={isModal}>
            <label htmlFor={id || title} style={{ display: title ? 'initial' : 'none' }}>
                {inner ? '' : title}
                <span style={{ marginLeft: '3px', color: '#e85347' }}>{required && '*'}</span>
            </label>
            <input
                className={`form-input ${className} ${disabled ? 'disabled' : ''} ${
                    errorMode ? 'error-mode' : ''
                }`}
                type={type === 'password' ? passType : type}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={onFocus}
                value={type !== 'file' ? value : undefined}
                min={type === 'number' ? 0 : undefined}
                max={max}
                maxLength={max}
                defaultValue={defaultValue}
                disabled={disabled}
                accept={decideAcceptedFileType()}
                checked={checked}
            />
            {type === 'password' && (
                <TogglePassword
                    onClick={togglePassword}
                    style={{ color: passType === 'text' ? '#2A6BB0' : '#000' }}
                >
                    Show
                </TogglePassword>
            )}
            {type === 'file' && (
                <div className='filename'>{value?.split('\\')[2] ?? 'Select file'}</div>
            )}
            {inner && <p className='star'>{title}</p>}
        </Container>
    );
};

export default Input;
