import React, { useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

const buildFilterString = (filters) => {
  let filterArray = [];

  for (let key in filters) {
    filterArray.push(key + "=" + filters[key]);
  }

  return filterArray.join("&");
};

function GuideFilter({ type, setInfo }) {
  const [filters, setFilters] = useState({ name: "" });

  const sendFilters = (e) => {
    e.preventDefault();

    axios.get(`/api/${type}?${buildFilterString(filters)}`).then((res) => {
      const { data } = res;
      setInfo(data);
    });
  };

  const resetFilters = () => {
    setFilters({ name: "" });

    axios.get(`/api/${type}`).then((res) => {
      const { data } = res;
      setInfo(data);
    });
  };

  const createForm = () => {
    switch (type) {
      case "monsters":
        return (
          <>
            <Row>
              <Col>
                <div className="form-piece">
                  <select id="size-filter" className="form-input" onChange={evt => setFilters({...filters, size: evt.target.value})}>
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
                  <label htmlFor="size-filter" className="form-label">Size</label>
                </div>
              </Col>
              <Col>
                <div className="form-piece-split">
                  <p>Challenge Rating:</p>
                  <div className="form-input-split">
                    <div className="form-piece">
                      <input
                        id="cr-min-filter"
                        className={"form-input" + (filters.challenge_rating_min ? '' : ' empty-input')}
                        onChange={evt => setFilters({...filters, challenge_rating_min: evt.target.value})}
                      />
                      <label htmlFor="cr-min-filter" className="form-label">Min</label>
                    </div>
                  </div>
                  <div className="form-dash"></div>
                  <div className="form-input-split">
                    <div className="form-piece">
                      <input
                        id="cr-max-filter"
                        className={"form-input" + (filters.challenge_rating_max ? '' : ' empty-input')}
                        onChange={evt => setFilters({...filters, challenge_rating_max: evt.target.value})} 
                      />
                      <label htmlFor="cr-max-filter" className="form-label">Max</label>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        );

      case "spells":
        return (
          <>
          <Row>
            <Col>
              <div className="form-piece">
                <select id="casting-time-filter" className="form-input" onChange={evt => setFilters({...filters, casting_time: evt.target.value})} >
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
                <label htmlFor="casting-time-filter" className="form-label">Casting Time</label>
              </div>
            </Col>
            <Col>
              <div className="form-piece">
                <select id="school-filter" className="form-input" onChange={evt => setFilters({...filters, school: evt.target.value})} >
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
                <label htmlFor="school-filter" className="form-label">School</label>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-piece-split">
                <p>Spell Level:</p>
                <div className="form-input-split">
                  <div className="form-piece">
                    <select id="level-min-filter" className="form-input" onChange={evt => setFilters({...filters, minLevel: evt.target.value})} >
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
                    <label htmlFor="level-min-filter" className="form-label">Min</label>
                  </div>
                </div>
                <div className="form-dash"></div>
                <div className="form-input-split">
                  <div className="form-piece">
                    <select id="level-max-filter" className="form-input" onChange={evt => setFilters({...filters, maxLevel: evt.target.value})} >
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
                    <label htmlFor="level-max-filter" className="form-label">Max</label>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="form-piece">
                <select id="class-filter" className="form-input" onChange={evt => setFilters({...filters, classSelect: evt.target.value})} >
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
                <label htmlFor="class-filter" className="form-label">Class</label>
              </div>
            </Col>
          </Row>
          </>
        );
    }
  };

  return (
    <form
      className="guide-filter-form"
      onSubmit={sendFilters}
      onReset={resetFilters}
    >
      <Container fluid>
        <Row>
          <Col>
            <div className="form-piece">
              <input
                id="name-filter"
                className={"form-input" + (filters.name ? '' : ' empty-input')}
                value={filters.name}
                onChange={evt => setFilters({...filters, name: evt.target.value})}
                />
              <label htmlFor="name-filter" className="form-label">Name</label>
            </div>
          </Col>
          <Col>
            <div id="form-filter-btns">
              <button className="btn btn-type-2 btn-color-1" type="submit">
                Search
              </button>
              <button className="btn btn-type-2 btn-color-4" type="reset">
                Clear
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      {createForm()}
    </form>
  );
}

export default GuideFilter;
