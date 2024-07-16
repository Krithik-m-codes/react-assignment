// eslint-disable-next-line react/prop-types
const Card = ({ label, value, isCurrency = false }) => (
  <div className="flex justify-between">
    <span>{label}:</span>
    <span>{value ? (isCurrency ? `$${value}` : value) : "N/A"}</span>
  </div>
);


export default Card;