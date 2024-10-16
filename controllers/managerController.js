const data = require('../models/data.json');

let getManagerWithMostRunningProjects = (req, res) => {
  try {
    let topManager = null;
  let maxRunningProjects = 0;

  data.departments.forEach(dept => {
    dept.teams.forEach(team => {
      const manager = team.lead;

      const runningProjects = team.projects
        ? team.projects.filter(project => !project.completed).length
        : 0;

      const runningCampaigns = team.campaigns
        ? team.campaigns.filter(campaign => campaign.active).length
        : 0;

      const totalRunning = runningProjects + runningCampaigns;

      if (totalRunning > maxRunningProjects) {
        maxRunningProjects = totalRunning;
        topManager = manager;
      }
    });
  });
  res.send(200).send({ manager: topManager });
  } catch (err) {
    res.send(500).send("Internal server error")
  }
};

module.exports = {
    getManagerWithMostRunningProjects
}