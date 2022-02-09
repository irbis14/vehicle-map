import Select from "react-select";
import styles from "./Filter.module.css";

const typeOptions = [
  { value: "TRUCK", label: "Truck" },
  { value: "CAR", label: "Car" },
];
const batteryOptions = [
  { value: [100, 80], label: "Full" },
  { value: [81, 50], label: "> Half" },
  { value: [51, 20], label: "< Half" },
  { value: [21, 0], label: "Low" },
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
        isClearable={true}
      />
      <Select
        key={2}
        className={styles.select}
        options={batteryOptions}
        placeholder={"Battery Level"}
        onChange={setType}
        isClearable={true}
      />
      <Select
        key={3}
        className={styles.select}
        options={promotionOptions}
        placeholder={"Find promotion"}
        onChange={setType}
        isClearable={true}
      />
    </div>
  );
};

export default Filter;
