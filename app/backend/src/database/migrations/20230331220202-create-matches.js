'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      homeTeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "home_team_id",
        references: {
          model: "teams",
          key: "id",
        }
      },
      homeTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "home_team_goals",
      },
      awayTeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "away_team_id",
        references: {
          model: "teams",
          key: "id",
        }
      },
      awayTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "away_team_goals",
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: "in_progress",
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("matches");
  }
};
