import Select from "react-select";
import styles from "./Filter.module.css";

const typeOptions = [
  { value: "TRUCK", label: "Truck" },
  { value: "CAR", label: "Car" },
];
const statusOptions = [
  { value: "AVAILABLE", label: "Available" },
  { value: "UNAVAILABLE", label: "Unavailable" },
];
const promotionOptions = [
  { value: null, label: "No" },
  { value: !null, label: "Yes" },
];

const Filter = ({ setType }) => {
  return (
    <div className={styles.filterContainer}>
      <Select
        key={1}
        className={styles.select}
        options={typeOptions}
        placeholder={"Vehicle type"}
        onChange={setType}
      />
      <Select
        key={2}
        className={styles.select}
        options={statusOptions}
        placeholder={"Avaliability"}
        onChange={setType}
      />
      <Select
        key={3}
        className={styles.select}
        options={promotionOptions}
        placeholder={"Find promotion"}
        onChange={setType}
      />
    </div>
  );
};

export default Filter;
