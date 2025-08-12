import { useEffect, useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import useCategory from "../../hooks/contens/article/useCategory";

const SelectCategory = ({setCategoryId}) => {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  
  const {
    data: categories,
    isLoading,
  } =  useCategory({'search': search})

  const customStyles = {
      placeholder: (base) => ({
          ...base,
          color: 'white', 
        }),
      control: (base, state) => ({
        ...base,
        color: 'white', 
        backgroundColor: '#1a56db',
        borderColor: state.isFocused ? 'white' : '#ccc'
      }),
      input: (base) => ({
          ...base,
          color: 'white',
        }),
      singleValue: (base) => ({
        ...base,
        color: 'white', 
      }),
    };

  const handleChange = (selectedOption) => {
      setCategoryId(selectedOption ? selectedOption.value : 0);
  };

  const handleInputChange = (inputValue) => {
      setSearch(inputValue);
  };

  useEffect(() => {
      if (categories && Array.isArray(categories)) {
          setOptions(categories.map(item => ({
              value: item.id,
              label: item.name
          })));
      }
  }, [categories]);

  return (
    <>
       <Select
            styles={customStyles}
            isLoading={isLoading}
            isClearable
            placeholder="Cari kategori ..."
            name="color" 
            onChange={handleChange}
            onInputChange={handleInputChange}
            options={options}
        />
    </>
  );
};

SelectCategory.propTypes = {
  setCategoryId: PropTypes.func.isRequired
};

export default SelectCategory;