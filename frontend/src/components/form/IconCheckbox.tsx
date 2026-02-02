import { FaCheck } from 'react-icons/fa'

type IconCheckbox = {
  id: string,
  name: string,
  checked: boolean,
  onChange: () => void,
  label: string
}

const IconCheckbox = ({ id, name, checked, onChange, label }: IconCheckbox) => {
  return (
    <div className="icon-checkbox-wrapper mb-1" style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        style={{ opacity: 0, position: 'absolute', left: 0, top: 0, width: '1.5rem', height: '1.5rem', cursor: 'pointer', zIndex: 2 }}
      />
      <div
        className="icon-checkbox-box"
        style={{
          width: '1.5rem',
          height: '1.5rem',
          border: '2px solid #4f7bb3',
          borderRadius: '0.25rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          backgroundColor: checked ? '#4f7bb3' : 'transparent',
          color: 'white',
          transition: 'background-color 0.2s ease',
          marginRight: '0.5rem'
        }}
      >
        {checked && <FaCheck size={12} />}
      </div>
      <label htmlFor={id} style={{ cursor: 'pointer', userSelect: 'none' }}>
        {label}
      </label>
    </div>
  );
};

export default IconCheckbox
