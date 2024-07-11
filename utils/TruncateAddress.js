const TruncateAddress = (address, maxLength = 30) => {
  const addressParts = address.split(", ");
  if (addressParts.length > 2) {
    address = addressParts.slice(1).join(", ");
  }

  if (address.length <= maxLength) return address;
  return address.substring(0, maxLength) + "...";
};

export default TruncateAddress;
