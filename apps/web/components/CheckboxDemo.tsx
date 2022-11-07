
import React, { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';

export const CheckboxDemo = () => {
  const categories = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];
  const [checked, setChecked] = useState<boolean>(false);
  const [cities, setCities] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>(categories.slice(1,3));

  const onCategoryChange = (e: { value: any, checked: boolean }) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) {
      _selectedCategories.push(e.value);
    }
    else {
      for (let i = 0; i < _selectedCategories.length; i++) {
        const selectedCategory = _selectedCategories[i];

        if (selectedCategory.key === e.value.key) {
          _selectedCategories.splice(i, 1);
          break;
        }
      }
    }

    setSelectedCategories(_selectedCategories);
  }


  const onCityChange = (e: { value: any, checked: boolean }) => {
    let selectedCities = [...cities];

    if (e.checked)
      selectedCities.push(e.value);
    else
      selectedCities.splice(selectedCities.indexOf(e.value), 1);

    setCities(selectedCities);
  }

  return (
    <div>
      <div className="card">
        <h5>Basic</h5>
        <div className="field-checkbox">
          <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} />
          <label htmlFor="binary">Remember Me</label>
        </div>

        <h5>Multiple</h5>
        <div className="field-checkbox">
          <Checkbox inputId="city1" name="city" value="Chicago" onChange={onCityChange} checked={cities.indexOf('Chicago') !== -1} />
          <label htmlFor="city1">Chicago</label>
        </div>
        <div className="field-checkbox">
          <Checkbox inputId="city2" name="city" value="Los Angeles" onChange={onCityChange} checked={cities.indexOf('Los Angeles') !== -1} />
          <label htmlFor="city2">Los Angeles</label>
        </div>
        <div className="field-checkbox">
          <Checkbox inputId="city3" name="city" value="New York" onChange={onCityChange} checked={cities.indexOf('New York') !== -1} />
          <label htmlFor="city3">New York</label>
        </div>
        <div className="field-checkbox">
          <Checkbox inputId="city4" name="city" value="San Francisco" onChange={onCityChange} checked={cities.indexOf('San Francisco') !== -1} />
          <label htmlFor="city4">San Francisco</label>
        </div>

        <h5>Dynamic Values, Preselection, Value Binding and Disabled Option</h5>
        {
          categories.map((category) => {
            return (
              <div key={category.key} className="field-checkbox">
                <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectedCategories.some((item) => item.key === category.key)} disabled={category.key === 'R'} />
                <label htmlFor={category.key}>{category.name}</label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

