// This function takes a string 'str' and returns a new string with the first 8 characters,
// followed by '...' in the middle, and then the last 8 characters of the input string.
// for example
// input= 0x5957e52cb604e9f8a0536c1e4254d10d2d8a6869f8a18781dbeaa910b920304e
// output= 0x5957e5...b920304e
const truncateString = (str) => {
  return str?.slice(0, 8) + "..." + str?.slice(-8);
};
// ....................
