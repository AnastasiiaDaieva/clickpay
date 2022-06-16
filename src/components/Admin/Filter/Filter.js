import { DropdownButton, Dropdown, InputGroup } from "react-bootstrap";
import { nanoid } from "nanoid";
import s from "./Filter.module.scss";

function Filter({ filterOptions, handleFilter, filterOption }) {
  return (
    <div className={s.Filter}>
      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title={filterOption.label}
          id="input-group-dropdown-1"
          as={Dropdown}
        >
          {filterOptions.map((option) => (
            <Dropdown.Item
              href="#"
              onClick={() => handleFilter(option)}
              key={nanoid()}
            >
              {option.label}{" "}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </InputGroup>
    </div>
  );
}

export default Filter;
