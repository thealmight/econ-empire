const COUNTRIES = ['USA', 'China', 'Germany', 'Japan', 'India'];

async function assignCountryIfMissing(UserModel, userId) {
  const user = await UserModel.findByPk(userId);
  if (!user) return null;
  if (user.role !== 'player' || user.country) return user;

  // Consider only online players for collision avoidance
  const assignedOnline = await UserModel.findAll({
    where: { role: 'player', isOnline: true },
    attributes: ['country']
  });
  const assignedOnlineCountries = new Set(assignedOnline.map(u => u.country).filter(Boolean));

  // Prefer an unassigned country from the pool
  const availableCountry = COUNTRIES.find(c => !assignedOnlineCountries.has(c));

  // If none available (all 5 online are assigned), attempt using any unused among all players
  let chosen = availableCountry;
  if (!chosen) {
    const assignedAll = await UserModel.findAll({ where: { role: 'player' }, attributes: ['country'] });
    const assignedAllCountries = new Set(assignedAll.map(u => u.country).filter(Boolean));
    chosen = COUNTRIES.find(c => !assignedAllCountries.has(c));
  }

  if (chosen) {
    await user.update({ country: chosen });
  }
  return user;
}

module.exports = { assignCountryIfMissing, COUNTRIES };