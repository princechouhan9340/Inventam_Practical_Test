const fs = require('fs');
const path = require('path');
const categoriesFilePath = path.join(__dirname, '../models/categories.json');

const readCategories = () => {
  const data = fs.readFileSync(categoriesFilePath);
  return JSON.parse(data);
};

// Utility function to write categories to the JSON file
const writeCategories = (categories) => {
  fs.writeFileSync(categoriesFilePath, JSON.stringify(categories, null, 2));
};

const createCategory = (req, res) => {
  try {
    const categories = readCategories();
    const newCategory = {
    id: categories.length + 1, // Simple ID generation
    name: req.body.name,
    parent_id: req.body.parent_id || null,
  };

  categories.push(newCategory);
  writeCategories(categories);
  res.status(201).json(newCategory);
  } catch (err) {
    res.send(500).send("Internal server error")
  }
  };
  
  // Update an existing category
const updateCategory = (req, res) => {
  try {
    const categories = readCategories();
  console.log(req)
  const categoryId = parseInt(req.params.id, 10);
  const categoryIndex = categories.findIndex(c => c.id === categoryId);

  if (categoryIndex === -1) {
    return res.status(404).json({ message: "Category not found" });
  }

  const updatedCategory = {
    ...categories[categoryIndex],
    name: req.body.name,
    parent_id: req.body.parent_id || null,
  };

  categories[categoryIndex] = updatedCategory;
  writeCategories(categories);
  res.send(200).send(updatedCategory);
  } catch (err) {
    res.send(500).send("Internal server error")
  }
};
  
  // Delete a category
const deleteCategory = (req, res) => {
  try {
  const categories = readCategories();
  const categoryId = parseInt(req.params.id, 10);
  const categoryIndex = categories.findIndex(c => c.id === categoryId);

  if (categoryIndex === -1) {
    return res.status(404).json({ message: "Category not found" });
  }

  categories.splice(categoryIndex, 1);
  writeCategories(categories);
  res.status(200).send("Document Deleted Successfully");
  } catch (err) {
    res.send(500).send("Internal server error")
  }
};
  
  // Get categories by parent_id with minimum 4 records
const getCategoriesByParentId = (req, res) => {
  try {
    const categories = readCategories();
  const parentId = parseInt(req.params.parent_id, 10);
  const filteredCategories = categories.filter(c => c.parent_id === parentId);

  if (filteredCategories.length < 4) {
    return res.status(404).json({ message: "Less than 4 records found" });
  }

  res.send(200).send(filteredCategories);
  } catch (err) {
    res.send(500).send("Internal server error")
  }
  };

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoriesByParentId
}
  