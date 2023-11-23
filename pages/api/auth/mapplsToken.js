module.exports = async (req, res) => {
  let token = {
    message: "Yes, Hitting here."
  };
  res.setHeader('Cache-Control', 'public', 's-maxage=10', 'stale-while-revalidate=59')
  res.status(200).json(token); 

}
