const homeLeaderboard = `
SELECT 
teams.team_name AS name,
SUM(CASE
    WHEN matches.home_team_goals > matches.away_team_goals THEN 3
    WHEN matches.home_team_goals = matches.away_team_goals THEN 1
    ELSE 0
END) AS totalPoints,
COUNT(*) AS totalGames,
SUM(CASE
    WHEN matches.home_team_goals > matches.away_team_goals THEN 1
    ELSE 0
END) AS totalVictories,
SUM(CASE
    WHEN matches.home_team_goals = matches.away_team_goals THEN 1
    ELSE 0
END) AS totalDraws,
SUM(CASE
    WHEN matches.home_team_goals < matches.away_team_goals THEN 1
    ELSE 0
END) AS totalLosses,
SUM(matches.home_team_goals) AS goalsFavor,
SUM(matches.away_team_goals) AS goalsOwn
FROM
TRYBE_FUTEBOL_CLUBE.teams AS teams
    JOIN
TRYBE_FUTEBOL_CLUBE.matches AS matches ON matches.home_team_id = teams.id
    AND matches.in_progress IS FALSE
GROUP BY name
`;
export default homeLeaderboard;