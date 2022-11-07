import styles from './index.module.scss';
import {CheckboxDemo} from "../components/CheckboxDemo";
import {ChipsDemo} from "../components/ChipsDemo";
import {DataTableDemo} from "../components/DataTableDemo";
import {Login} from "../components/Login";

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <>
      {/*<CheckboxDemo/>*/}
      {/*<ChipsDemo/>*/}
      <Login/>
      {/*<DataTableDemo />*/}
      {/*<div className={styles.page}>Hello From Prime React</div>*/}
    </>
  );
}

export default Index;
