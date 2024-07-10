const TruncateAddress = (address, maxLength = 30) => {
  if (address.length <= maxLength) return address;
  return address.substring(0, maxLength) + "...";
};

export default TruncateAddress;
