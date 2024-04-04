import React, { useState } from "react";
import axios from "axios";

const buildFilterString = (filters) => {
  let filterArray = [];

  for (let key in filters) {
    filterArray.push(key + "=" + filters[key]);
  }

  return filterArray.join("&");
};

function GuideFilter(props) {
  const { type, setGuideData } = props;

  const [filters, setFilters] = useState({ name: "" });

  const sendFilters = (e) => {
    e.preventDefault();

    axios.get(`/api/${type}?${buildFilterString(filters)}`).then((res) => {
      const { data } = res;
      setGuideData(data);
    });
  };

  const resetFilters = () => {
    setFilters({ name: "" });

    axios.get(`/api/${type}`).then((res) => {
      const { data } = res;
      setGuideData(data);
    });
  };

  const createForm = () => {
    switch (type) {
      case "monsters":
        return (
          <>
            <div className="form-piece">
              <label className="form-piece-filled">
                <select className="form-input" onChange={evt => setFilters({...filters, size: evt.target.value})}>
                  <option defaultValue={true} value="">
                    Select Size
                  </option>
                  <option>Tiny</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>Huge</option>
                  <option>Gargantuan</option>
                </select>
                <span className="form-label">Size</span>
              </label>
            </div>
            <p>Challenge Rating</p>
            <div className="form-piece form-piece-split">
              <div className="form-input-split">
                <label className="form-piece-filled">
                  <input
                    className={"form-input" + (filters.challenge_rating_min ? '' : ' empty-input')}
                    onChange={evt => setFilters({...filters, challenge_rating_min: evt.target.value})}
                  />
                  <span className="form-label">Min</span>
                </label>
              </div>
              <div className="form-dash"></div>
              <div className="form-input-split">
                <label className="form-piece-filled">
                  <input
                    className={"form-input" + (filters.challenge_rating_max ? '' : ' empty-input')}
                    onChange={evt => setFilters({...filters, challenge_rating_max: evt.target.value})} 
                  />
                  <span className="form-label">Max</span>
                </label>
              </div>
            </div>
          </>
        );

      case "spells":
        return (
          <>
            <div className="form-piece">
              <label className="form-piece-filled">
                <select className="form-input" onChange={evt => setFilters({...filters, casting_time: evt.target.value})} >
                  <option defaultValue={true} value=''>Select Casting Time</option>
                  <option>1 action</option>
                  <option>1 bonus action</option>
                  <option>1 reaction</option>
                  <option>1 minute</option>
                  <option>10 minutes</option>
                  <option>1 hour</option>
                  <option>8 hours</option>
                  <option>12 hours</option>
                  <option>24 hours</option>
                </select>
                <span className="form-label">Casting Time</span>
              </label>
            </div>
            <div className="form-piece">
              <label className="form-piece-filled">
                <select className="form-input" onChange={evt => setFilters({...filters, school: evt.target.value})} >
                  <option defaultValue={true} value=''>Select School</option>
                  <option>Evocation</option>
                  <option>Conjuration</option>
                  <option>Abjuration</option>
                  <option>Transmutation</option>
                  <option>Enchantment</option>
                  <option>Necromancy</option>
                  <option>Divination</option>
                  <option>Illusion</option>
                </select>
                <span className="form-label">School</span>
              </label>
            </div>
            <p>Spell Level</p>
            <div className="form-piece form-piece-split">
              <div className="form-input-split">
                <label className="form-piece-filled">
                  <select className="form-input" onChange={evt => setFilters({...filters, minLevel: evt.target.value})} >
                    <option defaultValue={true} value=''>Select Level</option>
                    <option value='0'>Cantrip</option>
                    <option value='1'>1st</option>
                    <option value='2'>2nd</option>
                    <option value='3'>3rd</option>
                    <option value='4'>4th</option>
                    <option value='5'>5th</option>
                    <option value='6'>6th</option>
                    <option value='7'>7th</option>
                    <option value='8'>8th</option>
                    <option value='9'>9th</option>
                  </select>
                  <span className="form-label">Min</span>
                </label>
              </div>
              <div className="form-dash"></div>
              <div className="form-input-split">
                <label className="form-piece-filled">
                  <select className="form-input" onChange={evt => setFilters({...filters, maxLevel: evt.target.value})} >
                    <option defaultValue={true} value=''>Select Level</option>
                    <option value='0'>Cantrip</option>
                    <option value='1'>1st</option>
                    <option value='2'>2nd</option>
                    <option value='3'>3rd</option>
                    <option value='4'>4th</option>
                    <option value='5'>5th</option>
                    <option value='6'>6th</option>
                    <option value='7'>7th</option>
                    <option value='8'>8th</option>
                    <option value='9'>9th</option>
                  </select>
                  <span className="form-label">Max</span>
                </label>
              </div>
            </div>
            <div className="form-piece">
              <label className="form-piece-filled">
                <select className="form-input" onChange={evt => setFilters({...filters, classSelect: evt.target.value})} >
                  <option defaultValue={true} value=''>Select Class</option>
                  <option>Wizard</option>
                  <option>Sorcerer</option>
                  <option>Cleric</option>
                  <option>Paladin</option>
                  <option>Ranger</option>
                  <option>Bard</option>
                  <option>Druid</option>
                  <option>Warlock</option>
                </select>
                <span className="form-label">Class</span>
              </label>
            </div>
          </>
        );
    }
  };

  return (
    <form
      id="guide-filters"
      className="vertical-form"
      onSubmit={sendFilters}
      onReset={resetFilters}
    >
      <p className="form-header">Filters</p>
      <button id="clear-btn" className="btn btn-color-1" type="submit">
        Filter
      </button>
      <button id="clear-btn" className="btn btn-color-1" type="reset">
        Clear Filters
      </button>
      <div className="form-piece">
        <label className="form-piece-filled">
          <input
            className={"form-input" + (filters.name ? '' : ' empty-input')}
            value={filters.name}
            onChange={evt => setFilters({...filters, name: evt.target.value})}
          />
          <span className="form-label">Name</span>
        </label>
      </div>
      {createForm()}
    </form>
  );
}

export default GuideFilter;
