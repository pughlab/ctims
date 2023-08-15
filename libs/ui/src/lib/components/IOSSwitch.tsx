import { useEffect, useState } from 'react';
import styles from './IOSSwitch.module.css';

const IOSSwitch = (props: {onChange: (e: any) => void, value?: any, disabled: boolean}) => {
  const { value, onChange, disabled } = props;
  const [isChecked, setIsChecked] = useState(value);

  // for some reason the value is not being set on the first render correctly
  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
   <>
     <label className={styles.switch}>
       <input type="checkbox" disabled={disabled} onChange={handleChange} checked={isChecked}  />
         <span className={styles.slider}></span>
     </label>
   </>
  );
}
export default IOSSwitch;
