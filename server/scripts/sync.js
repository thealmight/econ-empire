const { syncDatabase } = require('../models');

(async () => {
  try {
    console.log('Running database sync...');
    await syncDatabase();
    console.log('Database sync completed.');
    process.exit(0);
  } catch (err) {
    console.error('Database sync failed:', err);
    process.exit(1);
  }
})();