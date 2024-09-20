import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";

const CountryStateSelect = ({state,country, onCountryChange, onStateChange }) => {
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [selectedState, setSelectedState] = useState(state);
  useEffect(() => {
      onCountryChange(country); 
      onStateChange(state); 
  }, []);

  const countryOptions = useMemo(() => {
    return Country.getAllCountries().map(country => ({
      value: country.isoCode,
      label: country.name,
    }));
  }, []);

  const stateOptions = useMemo(() => {
    if (selectedCountry) {
      return State.getStatesOfCountry(selectedCountry.value).map(state => ({
        value: state.isoCode,
        label: state.name,
      }));
    }
    return [];
  }, [selectedCountry]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    onCountryChange(selectedOption);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    onStateChange(selectedOption); 
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "3px", 
      borderColor: state.isFocused ? "#ff7e34" : "#000", 
      boxShadow: state.isFocused ? "0 0 0 1px #ff7e34" : provided.boxShadow, 
      "&:hover": {
        borderColor: "#ff7e34", 
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#ff7e34" : provided.backgroundColor,
      "&:hover": {
        backgroundColor: "#ffd8b2",
      },
    }),
  };

  return (
    <div className="flex max-md:flex-wrap gap-4 w-full">
      <div className="mb-6 min-w-52 w-full">
        <label className="block text-sm font-semibold text-gray-800 mb-2">Country</label>
        <Select
          options={countryOptions}
          value={selectedCountry}
          onChange={handleCountryChange}
          placeholder="Select a country"
          isSearchable
          styles={customStyles} 
        />
      </div>
      
      <div className="mb-6 min-w-52 w-full">
        <label className="block text-sm font-semibold text-gray-800 mb-2">State</label>
        <Select
          options={stateOptions}
          value={selectedState}
          onChange={handleStateChange}
          placeholder={selectedCountry ? "Select a state" : "Select a country"}
          isSearchable
          isDisabled={!selectedCountry} 
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default CountryStateSelect;
