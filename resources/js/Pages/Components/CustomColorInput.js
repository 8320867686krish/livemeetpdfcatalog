const CustomColorInput = ({ settings = {} }) => {
    const { label = '', defaultValue = '#000000', disabled = false, isShowColorCode = true, name = 'textColor', customClass = '', onChange = () => { } } = settings;
    return (
        <>
            {label !== '' && <label className="custom_lbl Polaris-Label__Text">{label}</label>}
            <div className={`color_area${disabled ? ' disabled' : ''} ${customClass !== '' ? customClass : ''}`}>
                {isShowColorCode && <div className="color_code">{defaultValue}</div>}
                <input
                    type="color"
                    onChange={(e) => onChange(e.target.value, name)}
                    value={defaultValue}
                    name={name}
                    disabled={disabled}
                />
            </div>
        </>
    )
}

export default CustomColorInput;