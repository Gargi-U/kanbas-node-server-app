import db from "../Database/index.js";
export default function ModuleRoutes(app) {
    
    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const index = db.modules.findIndex((m) => m._id === mid);
        if (index === -1) {
          res.status(404).send("Module not found");
          return;
        }
        db.modules.splice(index, 1);
        res.status(204).send();
      });
        
    
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
          ...req.body,
          course: cid,
          _id: new Date().getTime().toString(),
        };
        const course = db.modules.find((m) => m._id === cid);
        if (!course) {
          res.status(404).send("Course not found");
          return;
        }
        course.modules.push(newModule);
        res.status(201)
      });

    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules.find((m) => m._id === cid);
        if (!modules) {
          res.status(404).send("Course not found");
          return;
        }
        res.json(modules);
    });
}
