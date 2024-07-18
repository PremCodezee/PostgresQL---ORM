module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true,
          isLowercase: {
            msg: "Only LowerCase Allowed",
          },
          len: [3, 10],
        },
      },
      lastName: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // hooks: {
      //   beforeValidate: (users, options) => {
      //     users.lastName = "happy";
      //   },
      //   afterValidate: (users, options) => {
      //     users.status = 1;
      //   },
      // },
      // Other model options go here
      tableName: "users",
      // paranoid: true,
      // deletedAt: 'softDelete'
    }
  );

  // User.addHook("beforeValidate", (user, options) => {
  //   user.lastName = "happy";
  // });

  // User.addHook("afterValidate", "someCustomName", (user, options) => {
  //   user.status = 1
  // });

  // direct method
  User.beforeValidate(async (user, options) => {
    user.lastName = 'Lothbrok';
  });

  User.afterValidate("myHookAfter", (user, options) => {
    user.status = 4
  });

  // to remove all hooks
  // User.removeHooks('afterValidate', 'myHookAfter');
  // User.removeHook();

// global and univeral hook

  // User.beforeCreate(async (user, options) => {
  //   user.lastName = 'Lothbrok';
  // });

  // User.afterCreate(async (user, options) => {
  //   user.status = 4
  // });

  // default hook

  // User.beforeSave(async (user, options) => {
  //   user.lastName = 'Lothbrok';
  // });

  // hooks: {
  //   beforeCreate() {
  //     // Do stuff
  //   }

  // permanent hook

  // sequelize.addHook('beforeCreate', () => {
  //   // Do stuff
  // });

  // connection hook

  // sequelize.beforeConnect(callback)
  // sequelize.afterConnect(callback)
  // sequelize.beforeDisconnect(callback)

  // sequelize.beforeConnect(async config => {
  //   config.password = await getAuthToken();
  // });

  // model hook
  // YourModel.beforeBulkCreate(callback)
  // YourModel.beforeBulkUpdate(callback)
  // YourModel.beforeBulkDestroy(callback)



  return User;
};
