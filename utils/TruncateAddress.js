const TruncateAddress = (address, maxLength = 50) => {
  if (address.length <= maxLength) return address;
  return address.substring(0, maxLength) + "...";
};

export default TruncateAddress;
