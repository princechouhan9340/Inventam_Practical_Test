const data = require('../models/data.json');

const getCompletedProjects = (req, res) => {
  try{
    const engineeringDept = data.departments.find(dept => dept.name === 'Engineering');
    if (!engineeringDept) return res.status(404).json({ message: 'Engineering department not found' });
  
    const completedProjects = engineeringDept.teams.flatMap(team =>
      team.projects.filter(project => project.completed)
    );
  
    res.send(200).send({ completedProjects });
  }catch(err){
    res.send(500).send("Internal server error")
  }
};


const getProjectWithSameTeamMembers = (req, res) => {
  try {
    const projects = data.departments.flatMap(dept =>
      dept.teams.flatMap(team => team.projects || []) 
    );
  
    const matchingProjects = [];
    const matchedTeams = new Set();
  
    projects.forEach(project => {
      if (project && project.team_members) { 
        const sameMembersProject = projects.find(
          p => p !== project && p.team_members &&
          JSON.stringify(p.team_members.sort()) === JSON.stringify(project.team_members.sort())
        );
  
        if (sameMembersProject && !matchingProjects.includes(project.name)) {
          matchingProjects.push(project.name);
          matchedTeams.add(JSON.stringify(project.team_members.sort())); // Store the matching team members
        }
      }
    });
  
    // Convert the matchedTeams set to an array of team members
    const matchingTeamMembers = Array.from(matchedTeams).map(team => JSON.parse(team));
  
    res.send(200).send({
      matchingProjects,
      matchingTeamMembers
    });
  } catch (err) {
    res.send(500).send("Internal server error")
  }
};

  
module.exports = {
    getCompletedProjects,
    getProjectWithSameTeamMembers
}
  
  