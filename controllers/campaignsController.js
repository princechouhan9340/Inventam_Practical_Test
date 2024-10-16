const data = require('../models/data.json');

let getAverageActiveCampaignsBudget = (req, res) => {
  try{
    const marketingDept = data.departments.find(dept => dept.name === 'Marketing');
  if (!marketingDept) return res.status(404).json({ message: 'Marketing department not found' });

  const activeCampaigns = marketingDept.teams.flatMap(team =>
    team.campaigns.filter(campaign => campaign.active)
  );

  if (activeCampaigns.length === 0) return res.json({ average: 0 });

  const totalBudget = activeCampaigns.reduce((acc, campaign) => acc + campaign.budget, 0);
  const averageBudget = totalBudget / activeCampaigns.length;

  res.send(200).send({ average: averageBudget });
  }catch(err){
    res.send(500).send("Internal server error")
  }
};

module.exports = {
    getAverageActiveCampaignsBudget
}
