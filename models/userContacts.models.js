module.exports = (Sequelize, DataTypes, User, Contacts) => {

const userContacts = Sequelize.define('user_contacts', {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: 'id',
    },
  },
  ContactId: {
    type: DataTypes.INTEGER,
    references: {
      model: Contacts, 
      key: 'id',
    },
  },
},{
    timestamps: false
});

return userContacts;

}