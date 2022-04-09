import App from "./app"
import sequelizeInstance from "./sequelize"

// Initialize DB and Start App
const main = async () => {
  const app = new App();
  await app.listen()

  await sequelizeInstance.authenticate().then(() => {
    console.log('DB Connected !!!: ');
  }).catch(err => {
    console.log('Uh oh!, Error connecting to DB: ', err);
  });

  // await sequelizeInstance.sync({alter: true}).then(() => {
  //   console.log('Connected to sequelize instance');
  // }).catch(err => {
  //   console.error('Failed to connect to sequelize instance:', err);
  //   process.exit(1);
  // })
}

main();