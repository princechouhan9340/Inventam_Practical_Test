# Here are the curl commands for each of the specified routes in your Express application. These commands allow you to test the various API endpoints related to campaigns, projects, managers, and category CRUD operations
# 1. Get Average Budget of Active Campaigns from Marketing Department

curl -X GET http://localhost:3000/marketing/active-campaigns-average

# 2. Get Completed Projects from Engineering Department

curl -X GET http://localhost:3000/engineering/completed-projects

# 3. Get Manager with Most Running Projects

curl -X GET http://localhost:3000/manager/most-running-projects

# 4. Get Projects with Same Team Members

curl -X GET http://localhost:3000/projects/same-team-members



# Category-Related Routes

# 5. Create a New Category

curl -X POST http://localhost:3000/categories \
-H "Content-Type: application/json" \
-d '{"name": "New Category", "parent_id": 1}'


# 6. Update an Existing Category

curl -X PUT http://localhost:3000/categories/1 \
-H "Content-Type: application/json" \
-d '{"name": "Updated Category Name", "parent_id": 2}'


# 7. Delete a Category

curl -X DELETE http://localhost:3000/categories/1


# 8. Get Categories by Parent ID

curl -X GET http://localhost:3000/categories/parent/1


Notes:
Replace http://localhost:3000 with your server's actual address and port if it's different.
Ensure your server is running before executing these commands.
