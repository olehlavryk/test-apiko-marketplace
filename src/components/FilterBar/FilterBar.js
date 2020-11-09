import React, { useState, useEffect } from 'react';
import s from './FilterBar.module.scss';

export const FilterBar = () => {
  const [state, setState] = useState({
    category: undefined,
    priceFrom: undefined,
    priceTo: undefined,
  });

  function handleOnChange() {
    console.log('1');
  }

  return (
    <div className={s.filter_bar}>
      <form className={s.product_filter_form}>
        <select
          onChange={(e) => {
            setState({ ...state, category: e.target.value });
          }}
        >
          <option>Category 1</option>
          <option>Category 2</option>
          <option>Category 3</option>
        </select>
        <input
          type="number"
          className={s.input_text}
          placeholder="Price from (USD)"
          value={state.priceFrom}
          onChange={(e) => {
            setState({ ...state, priceFrom: e.target.value });
          }}
        />
        <span className={s.input_separator}>&#8213;</span>
        <input
          type="number"
          placeholder="Price to (USD)"
          value={state.priceTo}
          onChange={(e) => {
            setState({ ...state, priceTo: e.target.value });
          }}
        />
      </form>
    </div>
  );
};
