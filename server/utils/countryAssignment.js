const COUNTRIES = ['USA', 'China', 'Germany', 'Japan', 'India'];

async function assignCountryIfMissing(UserModel, userId) {
  const user = await UserModel.findByPk(userId);
  if (!user) return null;
  if (user.role !== 'player' || user.country) return user;

  const assigned = await UserModel.findAll({
    where: { role: 'player' },
    attributes: ['country']
  });
  const assignedCountries = new Set(assigned.map(u => u.country).filter(Boolean));
  const availableCountry = COUNTRIES.find(c => !assignedCountries.has(c));

  if (availableCountry) {
    await user.update({ country: availableCountry });
  }
  return user;
}

module.exports = { assignCountryIfMissing, COUNTRIES };