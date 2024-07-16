/* eslint-disable react/prop-types */
// import React from 'react';

const FlightCard = ({ result, route, date }) => {
  const {
    partner_program,
    min_business_miles,
    min_business_tax,
    min_economy_miles,
    min_economy_tax,
    min_first_miles,
    min_first_tax,
  } = result;

  const formatMiles = (miles) => {
    return miles ? miles.toLocaleString() : "N/A";
  };

  const formatTax = (tax) => {
    return tax ? `+ $${tax}` : "";
  };

  return (
    <div className="flex space-x-4 text-center">
      <div className="bg-green-800 text-white rounded-lg p-4 w-64">
        <img
          src="/logo.svg"
          alt="dummy logo"
          className="w-6 h-6 self-center my-2"
        />
        <h1 className="text-2xl text-white font-semibold">{partner_program}</h1>
        <div className="text-sm mb-4">{route}</div>
        <div className="text-sm mb-4">{date}</div>
        <div className="mb-4">
          <div className="text-2xl font-bold">
            {formatMiles(min_business_miles)}
            <span className=" text-base font-light">
              {formatTax(min_business_tax)}
            </span>
          </div>
          <div className="text-sm">Min Business Miles</div>
        </div>
        <div className="mb-4">
          <div className="text-2xl font-bold">
            {formatMiles(min_economy_miles)}
            <span className=" text-base font-light">
              {formatTax(min_economy_tax)}
            </span>
          </div>
          <div className="text-sm">Min Economy Miles</div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            {formatMiles(min_first_miles)}
            <span className=" text-base font-light">
              {formatTax(min_first_tax)}
            </span>
          </div>
          <div className="text-sm">Min First Miles</div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
