
const bcrypt = require('bcrypt');
const projectModel = require('../models/projectModel');
const { generateTokenAndSetCookie, getIdFromToken } = require('../utils/generateToken');
// get all project
exports.getAllProject = async (req, res) => {

    try {
        const project = await projectModel.find();
// return "OK------------------------------------####"
        res.status(201).send({
            message: "Fetch all projects",
            success: true,
            project: project
        })
    } catch (error) {

        return res.status(400).send({
            message: 'Failed to get project',
            success: 'false',
            error: error
        })


    }
}

// funcition get projects by Ids start 
exports.getProjectsByIds = async (req,res)=>{
    try {
        const projectIds = req.query.ids;

        if (!projectIds || projectIds.length === 0) {
                return res.status(200).send({
                    message: 'No project IDs provided',
                    success:false
                });
          }

          const projects = await projectModel.find({ _id: { $in: projectIds } });
        
        return res.status(200).send({
            message: 'Got the projects',
            success: true,
            projects:projects,
        });
    } catch (error) {
        return res.status(201).send({
            message: 'Server error',
            success: false,
            error: error
        }); 
    }
}
// funcition get projects by Ids end

// project registration
exports.createProject = async (req, res) => {
    try {
        const { projectname,projectdescreption } = req.body;

        // Validation
        if (!projectname) {
            return res.status(400).send({
                message: 'Please fill all fields',
                success: false
            });
        }

         // Check if the projectname already exists
         const existingProjectName = await projectModel.findOne({ projectname});
         if (existingProjectName) {
             return res.status(400).send({
                 message: 'Project with this projectname already exists',
                 success: false
             });
         }

        // Save new project data
        const newProject = new projectModel({
            projectname,
            projectdescreption
        });

  
        await newProject.save();
      
     
       // Send response with user data
       return res.status(201).send({
           message: "Project created successfully",
           success: true,
       });

    } catch (error) {
        return res.status(400).send({
            message: 'Server error',
            success: false,
            error: error
        });
    }
};


// edit project
exports.editProject = async (req, res) => {
    try {
        const id = req.params.id;
        const oldproject = await projectModel.findById(id);

        if(!oldproject){
            return res.status(200).send({
                message: "No project found with this id",
                success: false
            }) 
        }

        const {projectname,projectdescreption,status } = req.body;

        if(!projectname){
           const projectData = await projectModel.findById(id);
              // Send response with user data
            return res.status(201).send({
                message: "Project found",
                success: true,
                projectData:projectData
            });
        }

          // Check if the projectname already exists
          const existingProjectName = await projectModel.findOne({ projectname, _id: { $ne: id } });
          if (existingProjectName) {
              return res.status(201).send({
                  message: 'Project with this projectname already exists',
                  success: false
              });
          }
  
        // Save new project data
        const newProject = {
            projectname,
            projectdescreption,
            status
        };


         await projectModel.findByIdAndUpdate(id,newProject);
        const project = await projectModel.findById(id);

       // Send response with user data
       return res.status(201).send({
           message: "Project Updated successfully",
           success: true,
           project:project
       });

    } catch (error) {
        return res.status(201).send({
            message: 'Server error',
            success: false,
            error: error
        });
    }
};


// delete project 
exports.deleteProject = async(req,res)=>{
    try {

        const id = req.params.id;
        const project = await projectModel.findById(id);

        if(!project){
            return res.status(200).send({
                message: "No project found with this id",
                success: false
            }) 
        }

        await projectModel.findByIdAndDelete(id);
        return res.status(200).send({
            message: "Project deleted",
            success: true
        })

    } catch (error) {
        return res.status(500).send({
            message: 'Server Error',
            success: false,
            error: error.message || error
        });
    }
}